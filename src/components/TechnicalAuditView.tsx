import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Smartphone, Zap, Lock, Code } from "lucide-react";

interface TechnicalAuditViewProps {
    audit: {
        score: number;
        issues: {
            severity: "critical" | "warning" | "info";
            message: string;
        }[];
        metrics: {
            mobileFriendly: boolean;
            loadSpeed: string;
            https: boolean;
            schemaDetected: boolean;
        };
    };
}

export const TechnicalAuditView = ({ audit }: TechnicalAuditViewProps) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Smartphone className={`h-8 w-8 mb-2 ${audit.metrics.mobileFriendly ? "text-green-500" : "text-red-500"}`} />
                        <div className="font-semibold">Mobile Friendly</div>
                        <div className="text-sm text-muted-foreground">{audit.metrics.mobileFriendly ? "Passed" : "Failed"}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Zap className="h-8 w-8 mb-2 text-yellow-500" />
                        <div className="font-semibold">Load Speed</div>
                        <div className="text-sm text-muted-foreground">{audit.metrics.loadSpeed}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Lock className={`h-8 w-8 mb-2 ${audit.metrics.https ? "text-green-500" : "text-red-500"}`} />
                        <div className="font-semibold">HTTPS</div>
                        <div className="text-sm text-muted-foreground">{audit.metrics.https ? "Secure" : "Insecure"}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Code className={`h-8 w-8 mb-2 ${audit.metrics.schemaDetected ? "text-blue-500" : "text-gray-400"}`} />
                        <div className="font-semibold">Schema Markup</div>
                        <div className="text-sm text-muted-foreground">{audit.metrics.schemaDetected ? "Detected" : "Missing"}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Technical Issues</span>
                        <Badge variant={audit.score >= 80 ? "default" : "destructive"}>
                            Score: {audit.score}/100
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {audit.issues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                {issue.severity === "critical" && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                                {issue.severity === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                                {issue.severity === "info" && <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                                <div>
                                    <p className="font-medium text-sm">{issue.message}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{issue.severity} Priority</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
