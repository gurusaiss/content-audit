import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export const AiChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
        { role: "ai", content: "Hi! I'm your AI Audit Assistant. Ask me anything about your content score or SEO strategy." }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user" as const, content: input }];
        setMessages(newMessages);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            setMessages([
                ...newMessages,
                { role: "ai", content: "That's a great question! Based on your audit, I recommend focusing on improving your keyword density and adding more structured data to boost your AEO score." }
            ]);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-2xl z-50 flex flex-col h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Assistant
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
            </CardContent>
            <div className="p-4 border-t">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
};
