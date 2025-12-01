import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Zap, BarChart3, FileText } from "lucide-react";

export const OnboardingModal = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Check if user has seen onboarding
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        if (!hasSeenOnboarding) {
            setOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("hasSeenOnboarding", "true");
    };

    const steps = [
        {
            title: "Welcome to ContentIQ",
            description: "Your all-in-one platform for mastering content strategy. Let's get you started in 4 simple steps.",
            icon: <Zap className="h-12 w-12 text-primary" />,
        },
        {
            title: "Step 1: Input Content",
            description: "Paste your text or enter a URL. Add a target keyword to get specific SEO recommendations.",
            icon: <FileText className="h-12 w-12 text-blue-500" />,
        },
        {
            title: "Step 2: Analyze & Audit",
            description: "Our AI scans your content against top competitors, checking for SEO, AEO, and readability issues.",
            icon: <Search className="h-12 w-12 text-purple-500" />,
        },
        {
            title: "Step 3: Optimize & Rank",
            description: "Review your scores, fix issues with AI assistance, and export professional reports.",
            icon: <BarChart3 className="h-12 w-12 text-green-500" />,
        },
    ];

    const currentStep = steps[step - 1];

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-muted rounded-full">
                            {currentStep.icon}
                        </div>
                    </div>
                    <DialogTitle className="text-center text-xl">{currentStep.title}</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        {currentStep.description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex justify-center gap-1 py-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`h-2 w-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <Button onClick={handleNext} className="w-full sm:w-auto">
                        {step === 4 ? "Get Started" : "Next"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
