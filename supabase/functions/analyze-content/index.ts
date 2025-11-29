import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisRequest {
  content: string;
  url?: string;
  meta?: {
    title: string;
    description: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, url, meta }: AnalysisRequest = await req.json();
    console.log("Analyzing content, length:", content.length);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Calculate all scores
    const seoScore = calculateSEOScore(content, meta);
    const serpScore = await calculateSERPScore(content, LOVABLE_API_KEY, meta);
    const aeoScore = calculateAEOScore(content);
    const humanizationScore = calculateHumanizationScore(content);
    const differentiationScore = await calculateDifferentiationScore(content, LOVABLE_API_KEY);
    const engagementScore = await calculateEngagementScore(content, LOVABLE_API_KEY);

    const result = {
      seoScore,
      serpScore,
      aeoScore,
      humanizationScore,
      differentiationScore,
      engagementScore,
      timestamp: new Date().toISOString(),
    };

    console.log("Analysis complete:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function calculateSEOScore(content: string, meta?: { title: string; description: string }) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Extract potential keyword
  const words = content.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq: Record<string, number> = {};
  words.forEach((word) => {
    if (word.length > 4) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const sortedWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
  const primaryKeyword = sortedWords[0]?.[0] || "content";
  const keywordCount = sortedWords[0]?.[1] || 0;
  const keywordDensity = (keywordCount / words.length) * 100;

  // Check keyword density
  if (keywordDensity < 1 || keywordDensity > 2.5) {
    score -= 15;
    issues.push(`Keyword density: ${keywordDensity.toFixed(2)}% (Optimal: 1-2%)`);
    recommendations.push("Adjust keyword density to 1-2% for better SEO");
  }

  // Check readability
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgWordsPerSentence = words.length / sentences.length;
  const readabilityScore = 206.835 - 1.015 * avgWordsPerSentence;

  if (readabilityScore < 60) {
    score -= 10;
    issues.push(`Readability score: ${readabilityScore.toFixed(0)} (Low)`);
    recommendations.push("Simplify sentences for better readability");
  }

  // Check header structure
  const h1Count = (content.match(/^#\s/gm) || []).length;
  const h2Count = (content.match(/^##\s/gm) || []).length;

  if (h1Count === 0) {
    score -= 15;
    issues.push("Missing H1 header");
    recommendations.push("Add a clear H1 header with your primary keyword");
  }

  if (h2Count < 2) {
    score -= 10;
    issues.push("Insufficient H2 headers");
    recommendations.push("Add more H2 headers to structure your content");
  }

  // Check content length
  if (words.length < 300) {
    score -= 20;
    issues.push(`Content too short: ${words.length} words (Min: 300)`);
    recommendations.push("Expand content to at least 300 words");
  }

  // Check links
  const linkCount = (content.match(/\[.*?\]\(.*?\)/g) || []).length;
  // Simple heuristic for internal links in markdown: look for relative paths or same domain (if we had it)
  // For this text analysis, we'll count relative links starting with / or ./
  const internalLinkCount = (content.match(/\]\(\s*[\/\.]/g) || []).length;

  if (linkCount < 2) {
    score -= 10;
    issues.push("Few or no links detected");
    recommendations.push("Add relevant internal and external links");
  }

  if (internalLinkCount === 0 && linkCount > 0) {
    // Don't penalize too hard if we can't be sure, but suggest it
    recommendations.push("Ensure you have internal links to other relevant pages");
  }

  // Check Metadata if available
  if (meta) {
    // Title checks
    if (!meta.title) {
      score -= 10;
      issues.push("Missing page title");
      recommendations.push("Add a descriptive page title (50-60 characters)");
    } else {
      if (meta.title.length < 30 || meta.title.length > 60) {
        score -= 5;
        issues.push(`Title length: ${meta.title.length} chars (Optimal: 50-60)`);
        recommendations.push("Optimize title length to 50-60 characters");
      }
      if (!meta.title.toLowerCase().includes(primaryKeyword)) {
        score -= 5;
        issues.push("Primary keyword missing from title");
        recommendations.push(`Include "${primaryKeyword}" in your page title`);
      }
    }

    // Description checks
    if (!meta.description) {
      score -= 10;
      issues.push("Missing meta description");
      recommendations.push("Add a meta description (150-160 characters)");
    } else {
      if (meta.description.length < 120 || meta.description.length > 160) {
        score -= 5;
        issues.push(`Meta description length: ${meta.description.length} chars (Optimal: 150-160)`);
        recommendations.push("Optimize meta description to 150-160 characters");
      }
      if (!meta.description.toLowerCase().includes(primaryKeyword)) {
        score -= 5;
        issues.push("Primary keyword missing from meta description");
        recommendations.push(`Include "${primaryKeyword}" in your meta description`);
      }
    }
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations: recommendations.slice(0, 5),
    metrics: {
      keywordDensity: keywordDensity.toFixed(2) + "%",
      readabilityScore: readabilityScore.toFixed(0),
      wordCount: words.length,
      primaryKeyword,
      internalLinks: internalLinkCount,
    },
  };
}

async function calculateSERPScore(content: string, apiKey: string, meta?: { title: string; description: string }) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  try {
    // Use AI to analyze SERP competitiveness
    const prompt = `Analyze this content for SERP performance against top-ranking competitors.
    
Target Keyword Context: Based on the content, identify the likely target keyword.
Competitor Comparison: Compare this content against what is typically found in top 10 results for that keyword.

Evaluate:
1. Content Depth: Is it comprehensive enough compared to top rankers? (Top rankers often have 2000+ words for competitive terms)
2. Missing Subtopics: What specific subtopics are missing that competitors likely cover?
3. Data & Authority: Does it lack data points, statistics, or expert quotes common in top results?
4. Content Structure: Is it missing key structural elements (tables, lists, comparison charts)?

Content Metadata:
Title: ${meta?.title || "N/A"}
Description: ${meta?.description || "N/A"}

Content Preview:
${content.substring(0, 3000)}

Return analysis in JSON format with: 
- averageTopRankWordCount (estimated)
- topicCoverageGaps (list of specific missing topics)
- missingElements (e.g., "Comparison Table", "Expert Quotes")
- predictedRank (e.g., "Page 1 (Pos 1-3)", "Page 2")
- improvements (list of actionable advice)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an SEO expert analyzing content for SERP performance. Provide detailed, actionable insights.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Parse AI response
    const words = content.split(/\s+/).length;
    if (words < 1000) {
      score -= 20;
      issues.push(`Word count: ${words} (Top rankings avg: 1500+)`);
      recommendations.push("Expand content to 1500+ words to compete with top SERP results");
    }

    // Check for stats/data
    const hasNumbers = /\d+%|\d+\s*(percent|times|years?|months?)/.test(content);
    if (!hasNumbers) {
      score -= 15;
      issues.push("No statistics or data points found");
      recommendations.push("Add concrete statistics and data to support claims");
    }

    // Check for expert quotes or citations
    const hasCitations = /according to|research shows|study found|expert/i.test(content);
    if (!hasCitations) {
      score -= 10;
      issues.push("No expert quotes or research citations");
      recommendations.push("Include expert opinions and research citations");
    }

    issues.push("AI analysis: " + analysis.substring(0, 100));
    recommendations.push("Review AI-generated insights for detailed SERP optimization");

    return {
      score: Math.max(0, score),
      issues,
      recommendations: recommendations.slice(0, 5),
      predictedRank: words > 1500 ? "Page 1 potential" : "Page 2-3",
    };
  } catch (error) {
    console.error("SERP analysis error:", error);
    return {
      score: 50,
      issues: ["Unable to perform full SERP analysis"],
      recommendations: ["Ensure content is comprehensive and well-researched"],
      predictedRank: "Unknown",
    };
  }
}

function calculateAEOScore(content: string) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Check for FAQ sections
  const hasFAQ = /\bfaq\b|frequently asked|questions?:/i.test(content);
  if (!hasFAQ) {
    score -= 15;
    issues.push("No FAQ section detected");
    recommendations.push("Add FAQ section for better AI engine visibility");
  }

  // Check for structured lists
  const listCount = (content.match(/^[\-\*\d+\.]\s/gm) || []).length;
  if (listCount < 3) {
    score -= 10;
    issues.push("Few structured lists");
    recommendations.push("Use bullet points and numbered lists for clarity");
  }

  // Check paragraph structure (Mobile Readability)
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const avgParagraphLength = content.length / paragraphs.length;
  const mobileReadability = avgParagraphLength < 300 ? "Good" : avgParagraphLength < 500 ? "Fair" : "Poor";

  if (avgParagraphLength > 500) {
    score -= 15;
    issues.push("Paragraphs too long for mobile");
    recommendations.push("Break content into shorter paragraphs for mobile readability");
  }

  // Check for how-to patterns
  const hasHowTo = /how to|step \d|first,|second,|finally/i.test(content);
  if (!hasHowTo) {
    score -= 10;
    issues.push("No step-by-step instructions");
    recommendations.push("Add clear step-by-step instructions where applicable");
  }

  // Check for definitions
  const hasDefinitions = /is defined as|refers to|means that/i.test(content);
  if (!hasDefinitions) {
    score -= 10;
    issues.push("Lacks clear definitions");
    recommendations.push("Include clear definitions of key terms");
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations: recommendations.slice(0, 5),
  };
}

function calculateHumanizationScore(content: string) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  // Check sentence variety
  const sentenceLengths = sentences.map((s) => s.split(/\s+/).length);
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const variance =
    sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) /
    sentenceLengths.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev < 5) {
    score -= 20;
    issues.push("Low sentence variety (robotic pattern)");
    recommendations.push("Vary sentence lengths for more natural flow");
  }

  // Check for repetitive sentence starters
  const starters = sentences.map((s) => s.trim().split(/\s+/)[0]?.toLowerCase()).filter(Boolean);
  const starterFreq: Record<string, number> = {};
  starters.forEach((starter) => {
    starterFreq[starter] = (starterFreq[starter] || 0) + 1;
  });

  const maxRepetition = Math.max(...Object.values(starterFreq));
  if (maxRepetition > sentences.length * 0.2) {
    score -= 15;
    issues.push("Repetitive sentence starters");
    recommendations.push("Diversify how you begin sentences");
  }

  // Check passive voice
  const passiveCount = (content.match(/\b(was|were|been|being)\s+\w+ed\b/gi) || []).length;
  const passivePercentage = (passiveCount / sentences.length) * 100;

  if (passivePercentage > 20) {
    score -= 15;
    issues.push(`High passive voice: ${passivePercentage.toFixed(0)}%`);
    recommendations.push("Use more active voice for engaging writing");
  }

  // Check for AI patterns
  const aiPatterns = [
    /\bin conclusion\b/i,
    /\bit's important to note\b/i,
    /\bfurthermore\b/i,
    /\bmoreover\b/i,
  ];
  const aiPatternCount = aiPatterns.filter((pattern) => pattern.test(content)).length;

  if (aiPatternCount > 2) {
    score -= 10;
    issues.push("Common AI writing patterns detected");
    recommendations.push("Use more conversational, human language");
  }

  // Check for personal pronouns
  const personalPronouns = content.match(/\b(I|we|you|us|our|your)\b/gi) || [];
  if (personalPronouns.length < 5) {
    score -= 10;
    issues.push("Lacks personal connection");
    recommendations.push("Use personal pronouns to connect with readers");
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations: recommendations.slice(0, 5),
    metrics: {
      sentenceVariety: stdDev.toFixed(1),
      passiveVoice: passivePercentage.toFixed(0) + "%",
    },
  };
}

async function calculateDifferentiationScore(content: string, apiKey: string) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  try {
    // Use AI to check for unique perspectives
    const prompt = `Analyze this content for differentiation and unique value proposition.
    
Compare against generic AI-generated content or standard articles on this topic.

Evaluate:
1. Unique Angle: Does it take a contrarian view, a personal narrative, or a specific niche angle?
2. Original Data/Research: Does it contain original research, surveys, or experiments?
3. Personal Experience: Does the author demonstrate first-hand experience (e.g., "I tested", "In my experience")?
4. Visuals/Rich Media: (Infer from text) Does it describe diagrams, screenshots, or videos?
5. Content Freshness: Does it reference recent events (2024-2025) or modern trends?

Content:
${content.substring(0, 2500)}

Provide scores and specific missing elements. Return JSON with:
- uniquenessScore (0-100)
- commonTropesFound (list of generic things this content does)
- uniqueElementsFound (list of good differentiators)
- recommendations (how to stand out more)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a content uniqueness expert. Identify what makes content stand out.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI differentiation analysis failed");
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Check for examples
    const hasExamples = /for example|for instance|case study|real.world/i.test(content);
    if (!hasExamples) {
      score -= 20;
      issues.push("No concrete examples or case studies");
      recommendations.push("Add real-world examples and case studies");
    }

    // Check for personal stories
    const hasStories = /\b(I|we)\s+(realized|discovered|found|learned)\b/i.test(content);
    if (!hasStories) {
      score -= 15;
      issues.push("Lacks personal stories or experiences");
      recommendations.push("Include personal anecdotes or experiences");
    }

    // Check for unique POV
    const hasOpinion = /\b(believe|think|opinion|perspective|view)\b/i.test(content);
    if (!hasOpinion) {
      score -= 15;
      issues.push("No clear point of view");
      recommendations.push("Express unique perspectives or opinions");
    }

    // Check content freshness
    const currentYear = new Date().getFullYear();
    const hasRecentDate = new RegExp(`\\b${currentYear}\\b|\\b${currentYear - 1}\\b`).test(content);
    if (!hasRecentDate) {
      score -= 10;
      issues.push("Content may lack current information");
      recommendations.push(`Update with recent data and trends (${currentYear})`);
    }

    issues.push("AI uniqueness check: " + analysis.substring(0, 100));
    recommendations.push("Review AI analysis for specific differentiation opportunities");

    return {
      score: Math.max(0, score),
      issues,
      recommendations: recommendations.slice(0, 5),
      metrics: {
        freshness: hasRecentDate ? "Current" : "Potentially Outdated",
        uniqueAngle: hasOpinion ? "Present" : "Missing",
      }
    };
  } catch (error) {
    console.error("Differentiation analysis error:", error);
    return {
      score: 60,
      issues: ["Unable to perform full uniqueness analysis"],
      recommendations: ["Add unique examples, stories, and perspectives"],
    };
  }
}

async function calculateEngagementScore(content: string, apiKey: string) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  try {
    const prompt = `Analyze this content for reader engagement potential.
    
Evaluate:
1. Hook: Does the opening grab attention?
2. Scannability: Is it easy to read on mobile (short paragraphs)?
3. Interactive Elements: Does it ask questions or encourage action?
4. Emotional Connection: Does it use emotional triggers or storytelling?

Content:
${content.substring(0, 2000)}

Return JSON with:
- engagementScore (0-100)
- issues (list of engagement killers)
- recommendations (how to boost engagement)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an audience engagement expert.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI engagement analysis failed");
    }

    const data = await response.json();
    // In a real app, we'd parse the JSON from AI. For now, we'll use heuristics + AI text.

    // Heuristic: Check for questions
    const questionCount = (content.match(/\?/g) || []).length;
    if (questionCount < 3) {
      score -= 10;
      issues.push("Few questions to engage the reader");
      recommendations.push("Ask rhetorical questions to keep readers thinking");
    }

    // Heuristic: Check for 'you' (reader focus)
    const youCount = (content.match(/\byou\b/gi) || []).length;
    if (youCount < 5) {
      score -= 10;
      issues.push("Low usage of 'You' (Reader Focus)");
      recommendations.push("Address the reader directly using 'You'");
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations: recommendations.slice(0, 5),
      metrics: {
        questionsAsked: questionCount,
        readerFocus: youCount > 5 ? "High" : "Low",
      }
    };
  } catch (error) {
    console.error("Engagement analysis error:", error);
    return {
      score: 70,
      issues: ["Could not analyze engagement fully"],
      recommendations: ["Ensure content is interactive and reader-focused"],
    };
  }
}
