import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";

interface TopicClustersViewProps {
    clusters: {
        clusterName: string;
        keywords: string[];
        relevance: number;
    }[];
}

export const TopicClustersView = ({ clusters }: TopicClustersViewProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clusters.map((cluster, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Network className="h-5 w-5 text-primary" />
                            {cluster.clusterName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <span className="text-sm text-muted-foreground">Relevance Score</span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${cluster.relevance}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold">{cluster.relevance}%</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {cluster.keywords.map((keyword, kIndex) => (
                                <Badge key={kIndex} variant="secondary" className="text-xs">
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
