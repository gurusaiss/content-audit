import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Search, Sparkles } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Sparkles className="h-6 w-6" />
                            <span>ContentIQ</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link
                                to="/audit"
                                className={`transition-colors hover:text-primary ${isActive('/audit') ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                Audit
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/calendar"
                                className={`transition-colors hover:text-primary ${isActive('/calendar') ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                Calendar
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/audit">
                            <Button size="sm" className="hidden md:flex">
                                Run Audit
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built for modern content teams.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link to="#" className="hover:underline">Terms</Link>
                        <Link to="#" className="hover:underline">Privacy</Link>
                        <Link to="#" className="hover:underline">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
