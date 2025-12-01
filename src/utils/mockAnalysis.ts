import { AnalysisResults } from "@/types/analysis";

export const mockAnalysis = async (content: string, targetKeyword?: string): Promise<AnalysisResults> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const wordCount = content.split(/\s+/).length;
    const keywordDensity = targetKeyword
        ? (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100
        : 0;

    const keyword = targetKeyword || "Content Strategy";
    const safeKeyword = encodeURIComponent(keyword);

    return {
        timestamp: new Date().toISOString(),
        targetKeyword,
        seoScore: {
            score: 85,
            issues: [
                "Meta description is missing",
                "H1 tag could be more descriptive",
                "Image alt tags are missing"
            ],
            recommendations: [
                "Add a compelling meta description",
                "Include the target keyword in H1",
                "Add descriptive alt text to all images"
            ],
            metrics: {
                "Word Count": wordCount,
                "Keyword Density": `${keywordDensity.toFixed(2)}%`,
                "Readability Score": "Good"
            }
        },
        serpScore: {
            score: 78,
            issues: [
                "Competitors have higher domain authority",
                "Content length is below average for top 10"
            ],
            recommendations: [
                "Increase content depth",
                "Build more high-quality backlinks",
                "Target long-tail variations of the keyword"
            ],
            predictedRank: "Top 20"
        },
        aeoScore: {
            score: 92,
            issues: [
                "Could use more structured data",
                "FAQ section is missing"
            ],
            recommendations: [
                "Implement Schema.org markup",
                "Add a dedicated FAQ section",
                "Answer questions directly and concisely"
            ]
        },
        humanizationScore: {
            score: 88,
            issues: [
                "Tone is slightly formal",
                "Could use more personal anecdotes"
            ],
            recommendations: [
                "Use a more conversational tone",
                "Share personal experiences or case studies",
                "Use 'you' and 'I' more frequently"
            ],
            metrics: {
                "Sentiment": "Positive",
                "Tone": "Professional",
                "Engagement Potential": "High"
            }
        },

        engagementScore: {
            score: 82,
            issues: [
                "Paragraphs are too long",
                "Lack of interactive elements"
            ],
            recommendations: [
                "Break up text with more subheadings",
                "Add polls, quizzes, or calculators",
                "Use more bullet points and lists"
            ],
            metrics: {
                "Estimated Reading Time": `${Math.ceil(wordCount / 200)} min`,
                "Skimmability": "Medium"
            }
        },
        serpAnalysis: {
            competitors: [
                { title: `The Ultimate Guide to ${keyword}`, url: `https://example.com/guide/${safeKeyword}`, rank: 1, score: 95 },
                { title: `How to Master ${keyword} in 2024`, url: `https://example.com/master/${safeKeyword}`, rank: 2, score: 92 },
                { title: `10 Proven Tips for ${keyword}`, url: `https://example.com/tips/${safeKeyword}`, rank: 3, score: 89 },
                { title: `Why ${keyword} Matters for Your Business`, url: `https://example.com/why/${safeKeyword}`, rank: 4, score: 87 },
                { title: `${keyword} Best Practices Checklist`, url: `https://example.com/checklist/${safeKeyword}`, rank: 5, score: 85 },
            ],
            comparison: {
                userWordCount: wordCount,
                avgCompetitorWordCount: wordCount + 500, // Simulate competitors having more content
                userKeywordDensity: parseFloat(keywordDensity.toFixed(2)),
                avgCompetitorKeywordDensity: 1.5,
            }
        },
        aiDetection: {
            overallAiScore: 65,
            segments: content.match(/[^.!?]+[.!?]+/g)?.map((sentence, index) => ({
                text: sentence,
                type: index % 3 === 0 ? "ai" : index % 3 === 1 ? "mixed" : "human",
                score: index % 3 === 0 ? 95 : index % 3 === 1 ? 50 : 10
            })) || [],
            breakdown: {
                highAi: 35,
                mixed: 45,
                human: 20
            }
        },
        gapAnalysis: {
            missingTopics: [
                `History and Evolution of ${keyword}`,
                `Key Benefits of Implementing ${keyword}`,
                `Common Mistakes to Avoid in ${keyword}`,
                `Future Trends in ${keyword}`
            ],
            contentGaps: [
                `Your content lacks a dedicated section on 'Tools and Technologies for ${keyword}'.`,
                `Competitors go into more depth on 'Step-by-Step Process for ${keyword}'.`,
                `You are missing a 'Conclusion' with actionable takeaways for ${keyword}.`
            ]
        },
        snippetOptimization: {
            currentSnippet: content.slice(0, 150) + "...",
            potentialSnippet: `${keyword} is a strategic approach to creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.`
        },
        topicClusters: [
            {
                clusterName: `${keyword} Strategy`,
                keywords: [`${keyword} plan`, `${keyword} framework`, `${keyword} roadmap`, "content calendar"],
                relevance: 95
            },
            {
                clusterName: "Content Creation",
                keywords: ["blogging", "video content", "infographics", "copywriting"],
                relevance: 88
            },
            {
                clusterName: "SEO & Distribution",
                keywords: ["keyword research", "link building", "social media marketing", "email newsletters"],
                relevance: 82
            }
        ],
        technicalAudit: {
            score: 72,
            issues: [
                { severity: "critical", message: "Mobile viewport tag not optimized" },
                { severity: "warning", message: "Slow server response time (>1s)" },
                { severity: "info", message: "Schema markup partially detected" }
            ],
            metrics: {
                mobileFriendly: false,
                loadSpeed: "1.2s",
                https: true,
                schemaDetected: true
            }
        },
        reporting: {
            lastAuditDate: new Date().toISOString(),
            nextScheduledAudit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            generatedReports: [
                { name: "Weekly Content Audit", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), format: "PDF" },
                { name: "Competitor Analysis", date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), format: "CSV" }
            ]
        },
        accessibilityScore: {
            score: 88,
            issues: [
                "Some images missing alt text",
                "Heading hierarchy skipped a level"
            ],
            recommendations: [
                "Add descriptive alt text to images",
                "Ensure H1-H6 tags are nested correctly"
            ]
        },
        readabilityScore: {
            score: 75,
            issues: [
                "Sentences are too complex",
                "Passive voice usage is high"
            ],
            recommendations: [
                "Shorten sentences to under 20 words",
                "Use active voice for more impact"
            ],
            metrics: {
                "Flesch-Kincaid Grade": "10.5",
                "Avg. Sentence Length": "18 words"
            }
        },
        plagiarismScore: {
            score: 98,
            originality: 98,
            matches: []
        },
        differentiationScore: {
            score: 82,
            issues: [
                "Unique value proposition could be stronger",
                "Similar examples used by competitors"
            ],
            recommendations: [
                "Highlight proprietary data or case studies",
                "Emphasize your unique methodology"
            ]
        }
    };
};
