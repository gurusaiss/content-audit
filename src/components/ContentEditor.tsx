import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentEditorProps {
    segments: {
        text: string;
        type: "ai" | "human" | "mixed";
        score: number;
    }[];
    overallScore: number;
}

export const ContentEditor = ({ segments, overallScore }: ContentEditorProps) => {
    const { toast } = useToast();
    const [activeSegments, setActiveSegments] = useState(segments);

    const handleHumanize = (index: number) => {
        const newSegments = [...activeSegments];
        newSegments[index] = {
            ...newSegments[index],
            type: "human",
            score: 10, // Low AI score
            text: newSegments[index].text + " (Humanized)" // Visual indicator
        };
        setActiveSegments(newSegments);

        toast({
            title: "Content Humanized",
            description: "The selected segment has been rewritten to sound more natural.",
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>AI Content Detection</CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            Overall AI Probability:
                        </div>
                        <Badge variant={overallScore > 70 ? "destructive" : overallScore > 40 ? "secondary" : "default"} className="text-lg">
                            {overallScore}%
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none leading-relaxed">
                        {activeSegments.map((segment, index) => (
                            <span
                                key={index}
                                className={`relative group inline cursor-default transition-colors duration-200 rounded px-1 py-0.5 ${segment.type === "ai"
                                        ? "bg-red-100 hover:bg-red-200 border-b-2 border-red-300"
                                        : segment.type === "mixed"
                                            ? "bg-yellow-100 hover:bg-yellow-200 border-b-2 border-yellow-300"
                                            : ""
                                    }`}
                            >
                                {segment.text}{" "}
                                {segment.type !== "human" && (
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg items-center gap-2 z-10 whitespace-nowrap">
                                        {segment.score}% AI
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-6 px-2 hover:bg-accent"
                                            onClick={() => handleHumanize(index)}
                                        >
                                            <Wand2 className="h-3 w-3 mr-1" />
                                            Humanize
                                        </Button>
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-4 text-sm text-muted-foreground justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 border-red-300 border rounded"></div>
                    <span>High AI Probability</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-100 border-yellow-300 border rounded"></div>
                    <span>Mixed / Uncertain</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-transparent border border-dashed rounded"></div>
                    <span>Human Written</span>
                </div>
            </div>
        </div>
    );
};
