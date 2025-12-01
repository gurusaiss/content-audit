import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download, History } from "lucide-react";

interface ReportingViewProps {
    reporting: {
        lastAuditDate: string;
        nextScheduledAudit: string;
        generatedReports: {
            name: string;
            date: string;
            format: "PDF" | "CSV";
        }[];
    };
}

export const ReportingView = ({ reporting }: ReportingViewProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Schedule & Automation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <div className="text-sm text-muted-foreground mb-1">Last Audit</div>
                            <div className="font-medium">{new Date(reporting.lastAuditDate).toLocaleDateString()}</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <div className="text-sm text-muted-foreground mb-1">Next Scheduled</div>
                            <div className="font-medium">{new Date(reporting.nextScheduledAudit).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <Button className="w-full">Configure Schedule</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5 text-primary" />
                        Report History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {reporting.generatedReports.map((report, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-muted-foreground bg-muted p-1.5 rounded" />
                                    <div>
                                        <div className="font-medium text-sm">{report.name}</div>
                                        <div className="text-xs text-muted-foreground">{new Date(report.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    {report.format}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
