import { AnalysisResults } from "@/types/analysis";

export const mockAnalysis = async (content: string, targetKeyword?: string): Promise<AnalysisResults> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const wordCount = content.split(/\s+/).length;
    const keywordDensity = targetKeyword
        ? (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100
        : 0;

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
        differentiationScore: {
            score: 75,
            issues: [
                "Similar points covered by competitors",
                "Unique value proposition is not clear"
            ],
            recommendations: [
                "Highlight unique data or insights",
                "Offer a contrarian viewpoint",
                "Develop a proprietary framework or model"
            ]
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
                { title: "Ultimate Guide to " + (targetKeyword || "Content Audit"), url: "https://competitor1.com/guide", rank: 1, score: 95 },
                { title: "How to Master " + (targetKeyword || "Content Audit"), url: "https://competitor2.com/master", rank: 2, score: 92 },
                { title: "10 Tips for " + (targetKeyword || "Content Audit"), url: "https://competitor3.com/tips", rank: 3, score: 89 },
                { title: "Why " + (targetKeyword || "Content Audit") + " Matters", url: "https://competitor4.com/why", rank: 4, score: 87 },
                { title: "Best Practices for " + (targetKeyword || "Content Audit"), url: "https://competitor5.com/best-practices", rank: 5, score: 85 },
            ],
            comparison: {
                userWordCount: wordCount,
                avgCompetitorWordCount: wordCount + 500, // Simulate competitors having more content
                userKeywordDensity: parseFloat(keywordDensity.toFixed(2)),
                avgCompetitorKeywordDensity: 1.5,
            }
        }
    };
};
