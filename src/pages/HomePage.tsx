import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Search } from "lucide-react";
import { OnboardingModal } from "@/components/OnboardingModal";

export const HomePage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <OnboardingModal />
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center py-24 text-center space-y-8 bg-gradient-to-b from-background to-muted/20">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-3xl space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            Master Your Content Strategy with AI Intelligence
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Audit, Optimize, and Rank. The all-in-one platform for modern content teams to dominate search results and engage readers.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/audit">
                                <Button size="lg" className="h-12 px-8 text-lg gap-2">
                                    Run Free Audit <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                                View Demo
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground pt-4">
                            Trusted by 10,000+ Marketers • No credit card required
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Deep SEO Audits</h3>
                            <p className="text-muted-foreground">
                                Analyze your content against top SERP competitors and get actionable recommendations.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Zap className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold">AI Optimization</h3>
                            <p className="text-muted-foreground">
                                Instantly improve readability, tone, and structure with our advanced AI engine.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
                            <div className="p-3 bg-green-100 rounded-full">
                                <BarChart3 className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold">Performance Tracking</h3>
                            <p className="text-muted-foreground">
                                Monitor your content's health over time and stay ahead of algorithm updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
