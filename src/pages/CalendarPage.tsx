import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

export const CalendarPage = () => {
    return (
        <div className="container py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
                <p className="text-muted-foreground mt-2">Plan and schedule your upcoming content.</p>
            </div>

            <Card className="min-h-[600px] flex items-center justify-center border-dashed">
                <div className="text-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full inline-block">
                        <CalendarIcon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Calendar View Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        We are building a powerful drag-and-drop calendar to help you organize your content strategy. Stay tuned!
                    </p>
                </div>
            </Card>
        </div>
    );
};
