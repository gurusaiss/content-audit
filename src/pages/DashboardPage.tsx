import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowUpRight } from "lucide-react";

export const DashboardPage = () => {
    // Mock data for past audits
    const pastAudits = [
        { id: 1, title: "SEO Best Practices 2024", date: "2024-03-15", score: 85, status: "Published" },
        { id: 2, title: "Content Marketing Guide", date: "2024-03-10", score: 72, status: "Draft" },
        { id: 3, title: "How to Use AI Tools", date: "2024-03-05", score: 92, status: "Published" },
        { id: 4, title: "Email Marketing Tips", date: "2024-02-28", score: 65, status: "Needs Review" },
    ];

    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Manage your content audits and track performance.</p>
                </div>
                <Button>New Audit</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Content Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">78.5</div>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +2.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Audits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            12 published, 4 drafts
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Performing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">92</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            "How to Use AI Tools"
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Audits</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Content Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pastAudits.map((audit) => (
                                <TableRow key={audit.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {audit.title}
                                    </TableCell>
                                    <TableCell>{audit.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={audit.score >= 80 ? "default" : audit.score >= 60 ? "secondary" : "destructive"}>
                                            {audit.score}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-xs px-2 py-1 rounded-full ${audit.status === "Published" ? "bg-green-100 text-green-800" :
                                                audit.status === "Draft" ? "bg-gray-100 text-gray-800" :
                                                    "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {audit.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
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
