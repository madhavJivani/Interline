import React from "react";
import { Mail, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-background text-foreground py-8 border-t-2 border-muted">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch">
                    {/* Left Section: Quick Links */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 list-none pl-0">
                            <li>
                                <Link to="/" className="hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-primary">
                                    Explore more
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:text-primary">
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link to="/code-editor" className="hover:text-primary">
                                    Get Hands on keyboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Separator */}
                    <Separator orientation="vertical" className="hidden md:block mx-4 h-auto" />

                    {/* Center Section: About Interline (Now with Accordion) */}
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-4 text-center"><u>About Interline</u></h3>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="overview">
                                <AccordionTrigger className="font-medium">Overview</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Interline is a powerful online code editor built with React,
                                    providing an IDE-like experience. It supports multiple
                                    languages, offers features like code execution, syntax
                                    highlighting, auto-indentation, bracket highlighting,
                                    keybindings, find/replace, and code wrapping. Users can
                                    create, edit, and manage files and interact with an AI
                                    chatbot.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="tech-stack">
                                <AccordionTrigger className="font-medium">Tech Stack</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    <ul>
                                        <li><b>Frontend:</b> React, Vite, Tailwind CSS, ShadCN, Monaco Editor</li>
                                        <li><b>Backend:</b> Appwrite</li>
                                        <li><b>AI Chatbot:</b> OpenAI API</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="features">
                                <AccordionTrigger className="font-medium">Features</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Multilanguage Support & Code Execution</li>
                                        <li>Advanced Code Editor Features</li>
                                        <li>Terminal with Text and File Input/Output</li>
                                        <li>Authentication (Google & Custom)</li>
                                        <li>Code Management (Create, Edit, Delete, Rename, Download)</li>
                                        <li>AI Chatbot Integration</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <p className="mt-4 text-muted-foreground">
                            Learn more on{' '}
                            <a
                                href="https://github.com/madhavJivani/Interline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                GitHub
                            </a>.
                        </p>
                    </div>

                    {/* Separator */}
                    <Separator orientation="vertical" className="hidden md:block mx-4 h-auto" />

                    {/* Right Section: Contact Info */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0 md:text-right">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 list-none pl-0">
                            <li className="flex items-center md:justify-end">
                                <a href="mailto:202201285@daiict.ac.in" className="hover:text-primary">
                                    202201285@daiict.ac.in
                                </a>
                                <Mail className="w-5 h-5 md:ml-2" />
                            </li>
                            <li className="flex items-center md:justify-end">
                                <a
                                    href="https://www.linkedin.com/in/madhav-jivani-095aba24b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary"
                                >
                                    Madhav Jivani
                                </a>
                                <Linkedin className="w-5 h-5 md:ml-2" />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Horizontal Separator */}
                <Separator className="my-6" />

                {/* Footer Bottom */}
                <div className="text-center text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Interline. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;