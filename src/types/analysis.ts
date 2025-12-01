export interface ScoreResult {
  score: number;
  issues: string[];
  recommendations: string[];
  metrics?: Record<string, string | number>;
  predictedRank?: string;
}

export interface AnalysisResults {
  seoScore: ScoreResult;
  serpScore: ScoreResult;
  aeoScore: ScoreResult;
  humanizationScore: ScoreResult;
  differentiationScore: ScoreResult;
  engagementScore?: ScoreResult;
  targetKeyword?: string;
  serpAnalysis?: {
    competitors: {
      title: string;
      url: string;
      rank: number;
      score: number;
    }[];
    comparison: {
      userWordCount: number;
      avgCompetitorWordCount: number;
      userKeywordDensity: number;
      avgCompetitorKeywordDensity: number;
    };
  };
  timestamp: string;
}
