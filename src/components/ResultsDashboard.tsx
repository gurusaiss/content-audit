import { AnalysisResults } from "@/types/analysis";
import { ScoreCard } from "@/components/ScoreCard";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SerpAnalysisView } from "@/components/SerpAnalysisView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditor } from "@/components/ContentEditor";
import { GapAnalysisView } from "@/components/GapAnalysisView";
import { TopicClustersView } from "@/components/TopicClustersView";
import { TechnicalAuditView } from "@/components/TechnicalAuditView";
import { ReportingView } from "@/components/ReportingView";
import { AiChatWidget } from "@/components/AiChatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsDashboardProps {
  results: AnalysisResults;
}

export const ResultsDashboard = ({ results }: ResultsDashboardProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    const reportContent = `
CONTENT QUALITY AUDIT REPORT
Generated: ${new Date(results.timestamp).toLocaleString()}
${results.targetKeyword ? `Target Keyword: ${results.targetKeyword}\n` : ''}
================================
SEO SCORE: ${results.seoScore.score}/100
================================
Issues:
${results.seoScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.seoScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${results.seoScore.metrics ? `Metrics:\n${Object.entries(results.seoScore.metrics).map(([key, val]) => `- ${key}: ${val}`).join('\n')}` : ''}

================================
SERP PERFORMANCE SCORE: ${results.serpScore.score}/100
================================
Issues:
${results.serpScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.serpScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${results.serpScore.predictedRank ? `Predicted Rank: ${results.serpScore.predictedRank}` : ''}

================================
AEO SCORE: ${results.aeoScore.score}/100
================================
Issues:
${results.aeoScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.aeoScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

================================
HUMANIZATION SCORE: ${results.humanizationScore.score}/100
================================
Issues:
${results.humanizationScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.humanizationScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${results.humanizationScore.metrics ? `Metrics:\n${Object.entries(results.humanizationScore.metrics).map(([key, val]) => `- ${key}: ${val}`).join('\n')}` : ''}

================================
DIFFERENTIATION SCORE: ${results.differentiationScore.score}/100
================================
Issues:
${results.differentiationScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.differentiationScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${results.engagementScore ? `================================
ENGAGEMENT SCORE: ${results.engagementScore.score}/100
================================
Issues:
${results.engagementScore.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Recommendations:
${results.engagementScore.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${results.engagementScore.metrics ? `Metrics:\n${Object.entries(results.engagementScore.metrics).map(([key, val]) => `- ${key}: ${val}`).join('\n')}` : ''}` : ''}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-audit-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Your audit report has been downloaded.",
    });
  };

  const handleImageExport = async (format: "png" | "jpg") => {
    const element = document.getElementById("results-dashboard");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        backgroundColor: "#ffffff",
      });

      const url = canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : "png"}`);
      const a = document.createElement("a");
      a.href = url;
      a.download = `content-audit-${new Date().toISOString().split("T")[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Image Exported",
        description: `Your audit report has been downloaded as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the image.",
        variant: "destructive",
      });
    }
  };

  const avgScore = Math.round(
    (results.seoScore.score +
      results.serpScore.score +
      results.aeoScore.score +
      results.humanizationScore.score +
      results.differentiationScore.score +
      (results.engagementScore?.score || 0)) /
    (results.engagementScore ? 6 : 5)
  );

  const chartData = [
    { subject: "SEO", A: results.seoScore.score, fullMark: 100 },
    { subject: "SERP", A: results.serpScore.score, fullMark: 100 },
    { subject: "AEO", A: results.aeoScore.score, fullMark: 100 },
    { subject: "Human", A: results.humanizationScore.score, fullMark: 100 },
    { subject: "Diff", A: results.differentiationScore.score, fullMark: 100 },
    ...(results.engagementScore
      ? [{ subject: "Engage", A: results.engagementScore.score, fullMark: 100 }]
      : []),
  ];

  return (
    <div id="results-dashboard" className="space-y-8 p-4 bg-background">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground mt-1">
            Overall Score: <span className="font-semibold text-foreground">{avgScore}/100</span>
            {results.targetKeyword && (
              <span className="ml-4">
                Target Keyword: <span className="font-semibold text-primary">{results.targetKeyword}</span>
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Text Report
          </Button>
          <Button onClick={() => handleImageExport("png")} variant="outline" className="gap-2">
            <FileImage className="h-4 w-4" />
            PNG
          </Button>
          <Button onClick={() => handleImageExport("jpg")} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            JPG
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8 h-auto p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-detection">AI Detection</TabsTrigger>
          <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
          <TabsTrigger value="aeo">AEO Optimizer</TabsTrigger>
          <TabsTrigger value="topic-clusters">Topic Clusters</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="readability">Readability</TabsTrigger>
          <TabsTrigger value="differentiation">Differentiation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Overview Section: Graph and Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <div className="h-[300px] w-full border rounded-lg p-4 flex items-center justify-center bg-card">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((item) => (
                    <TableRow key={item.subject}>
                      <TableCell className="font-medium">{item.subject}</TableCell>
                      <TableCell className="text-right">{item.A}/100</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${item.A >= 80
                            ? "bg-green-100 text-green-800"
                            : item.A >= 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {item.A >= 80 ? "Excellent" : item.A >= 60 ? "Good" : "Needs Work"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {results.serpAnalysis && (
            <SerpAnalysisView
              competitors={results.serpAnalysis.competitors}
              comparison={results.serpAnalysis.comparison}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScoreCard
              title="SEO Score"
              score={results.seoScore.score}
              issues={results.seoScore.issues}
              recommendations={results.seoScore.recommendations}
              metrics={results.seoScore.metrics}
              color="primary"
            />

            <ScoreCard
              title="SERP Performance"
              score={results.serpScore.score}
              issues={results.serpScore.issues}
              recommendations={results.serpScore.recommendations}
              predictedRank={results.serpScore.predictedRank}
              color="accent"
            />

            <ScoreCard
              title="AEO Score"
              score={results.aeoScore.score}
              issues={results.aeoScore.issues}
              recommendations={results.aeoScore.recommendations}
              color="success"
            />

            <ScoreCard
              title="Humanization"
              score={results.humanizationScore.score}
              issues={results.humanizationScore.issues}
              recommendations={results.humanizationScore.recommendations}
              metrics={results.humanizationScore.metrics}
              color="warning"
            />

            <ScoreCard
              title="Differentiation"
              score={results.differentiationScore.score}
              issues={results.differentiationScore.issues}
              recommendations={results.differentiationScore.recommendations}
              color="primary"
            />

            {results.engagementScore && (
              <ScoreCard
                title="Engagement Score"
                score={results.engagementScore.score}
                issues={results.engagementScore.issues}
                recommendations={results.engagementScore.recommendations}
                metrics={results.engagementScore.metrics}
                color="success"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="ai-detection">
          {results.aiDetection ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-red-700">High AI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-800">{results.aiDetection.breakdown?.highAi || 0}%</div>
                    <p className="text-sm text-red-600 mt-1">Probability of AI generated content</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-yellow-700">Mixed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-800">{results.aiDetection.breakdown?.mixed || 0}%</div>
                    <p className="text-sm text-yellow-600 mt-1">Contains both AI and human patterns</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-green-700">Human</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-800">{results.aiDetection.breakdown?.human || 0}%</div>
                    <p className="text-sm text-green-600 mt-1">Likely written by a human</p>
                  </CardContent>
                </Card>
              </div>

              <ContentEditor
                segments={results.aiDetection.segments}
                overallScore={results.aiDetection.overallAiScore}
              />
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              AI Detection data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="gap-analysis">
          {results.gapAnalysis ? (
            <GapAnalysisView
              missingTopics={results.gapAnalysis.missingTopics}
              contentGaps={results.gapAnalysis.contentGaps}
            />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Gap Analysis data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="aeo">
          {results.snippetOptimization ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full border-muted">
                  <CardHeader>
                    <CardTitle className="text-lg text-muted-foreground">Current Snippet Potential</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-6 bg-muted/50 rounded-xl font-mono text-sm leading-relaxed border border-muted">
                      {results.snippetOptimization.currentSnippet || "No clear snippet found."}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>This is what search engines might currently pull from your content.</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="h-full border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-primary">
                      <Sparkles className="h-5 w-5" />
                      Optimized Snippet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-6 bg-background rounded-xl font-medium text-lg leading-relaxed border border-primary/10 shadow-sm">
                      {results.snippetOptimization.potentialSnippet}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary/80">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Use this concise definition to increase your chances of winning a Featured Snippet.</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              AEO data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="topic-clusters">
          {results.topicClusters ? (
            <TopicClustersView clusters={results.topicClusters} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Topic Cluster data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="technical">
          {results.technicalAudit ? (
            <TechnicalAuditView audit={results.technicalAudit} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Technical Audit data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="reporting">
          {results.reporting ? (
            <ReportingView reporting={results.reporting} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Reporting data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="accessibility">
          {results.accessibilityScore ? (
            <div className="grid grid-cols-1 gap-6">
              <ScoreCard
                title="Accessibility Score"
                score={results.accessibilityScore.score}
                issues={results.accessibilityScore.issues}
                recommendations={results.accessibilityScore.recommendations}
                color="success"
              />
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Accessibility data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="readability">
          {results.readabilityScore ? (
            <div className="grid grid-cols-1 gap-6">
              <ScoreCard
                title="Readability Score"
                score={results.readabilityScore.score}
                issues={results.readabilityScore.issues}
                recommendations={results.readabilityScore.recommendations}
                color="warning"
                metrics={results.readabilityScore.metrics}
              />
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Readability data not available.
            </div>
          )}
        </TabsContent>

        <TabsContent value="differentiation">
          {results.differentiationScore ? (
            <div className="grid grid-cols-1 gap-6">
              <ScoreCard
                title="Differentiation Score"
                score={results.differentiationScore.score}
                issues={results.differentiationScore.issues}
                recommendations={results.differentiationScore.recommendations}
                color="accent"
              />
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Differentiation data not available.
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AiChatWidget />
    </div>
  );
};
