import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";

interface SerpAnalysisViewProps {
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
}

export const SerpAnalysisView = ({ competitors, comparison }: SerpAnalysisViewProps) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Content Length Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Your Content</span>
                                <span className="font-medium">{comparison.userWordCount} words</span>
                            </div>
                            <Progress value={Math.min((comparison.userWordCount / comparison.avgCompetitorWordCount) * 100, 100)} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Avg. Top 10 Competitors</span>
                                <span className="font-medium">{comparison.avgCompetitorWordCount} words</span>
                            </div>
                            <Progress value={100} className="bg-muted" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Keyword Density Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Your Content</span>
                                <span className="font-medium">{comparison.userKeywordDensity}%</span>
                            </div>
                            <Progress value={Math.min((comparison.userKeywordDensity / comparison.avgCompetitorKeywordDensity) * 100, 100)} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Avg. Top 10 Competitors</span>
                                <span className="font-medium">{comparison.avgCompetitorKeywordDensity}%</span>
                            </div>
                            <Progress value={100} className="bg-muted" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Top SERP Competitors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Rank</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {competitors.map((competitor) => (
                                <TableRow key={competitor.rank}>
                                    <TableCell className="font-medium">#{competitor.rank}</TableCell>
                                    <TableCell>
                                        <a
                                            href={competitor.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 hover:underline text-primary font-medium truncate max-w-[300px]"
                                            title={competitor.title}
                                        >
                                            {competitor.title}
                                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs ${competitor.score >= 90 ? "bg-green-100 text-green-800" :
                                            competitor.score >= 80 ? "bg-blue-100 text-blue-800" :
                                                "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {competitor.score}/100
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
