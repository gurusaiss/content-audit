import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Lightbulb, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GapAnalysisViewProps {
    missingTopics: string[];
    contentGaps: string[];
}

export const GapAnalysisView = ({ missingTopics, contentGaps }: GapAnalysisViewProps) => {
    const { toast } = useToast();

    const handleGenerate = (topic: string) => {
        toast({
            title: "Generating Content",
            description: `Drafting a new section for "${topic}"...`,
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full border-yellow-200 bg-yellow-50/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-700">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        Missing Topics
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Competitors are covering these topics, but you aren't. Adding them could improve your relevance.
                    </p>
                    <div className="space-y-3">
                        {missingTopics.map((topic, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white border border-yellow-100 rounded-lg group hover:border-yellow-300 transition-colors shadow-sm">
                                <span className="font-medium text-sm text-slate-700">{topic}</span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
                                    onClick={() => handleGenerate(topic)}
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Draft
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="h-full border-red-200 bg-red-50/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        Content Gaps
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Specific sections or depth that your content is lacking compared to top rankers.
                    </p>
                    <ul className="space-y-4">
                        {contentGaps.map((gap, index) => (
                            <li key={index} className="flex gap-3 items-start p-3 bg-white border border-red-100 rounded-lg shadow-sm">
                                <div className="mt-0.5 min-w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700 flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">{gap}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
