import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border py-8">
            <div className="mx-auto max-w-screen-lg px-6">
                {/* Top Section: About Me */}
                <div className="space-y-4 text-sm font-source text-muted-foreground">
                    <h2 className="text-2xl font-bold text-primary font-playfair">About Me</h2>
                    <p>
                        Hi, I'm <strong>Madhav Jivani</strong>, a 3rd-year BTech student in Information and Communication Technology from Ahmedabad.
                        I'm passionate about crafting sleek and modern web designs, developing intuitive user interfaces, and bringing creative ideas to life.
                    </p>
                    <p>
                        When I'm not coding, you'll find me playing cricket, gaming, or spending quality time with my family.
                    </p>
                </div>

                {/* Separator */}
                <Separator className="my-6" />

                {/* Middle Section: Accordions */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-primary font-playfair">Explore</h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="about">
                            <AccordionTrigger>About This Website</AccordionTrigger>
                            <AccordionContent>
                                This website is a showcase of modern web development practices using React, Tailwind CSS, and Shadcn components.
                                It includes interactive features like a code editor, dynamic UI components, and much more.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="features">
                            <AccordionTrigger>Features</AccordionTrigger>
                            <AccordionContent>
                                - A user-friendly code editor.<br />
                                - Light and dark themes for better accessibility.<br />
                                - Sleek navigation and responsiveness.<br />
                                - Built with the latest web technologies like Vite and Shadcn.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="future">
                            <AccordionTrigger>Future Plans</AccordionTrigger>
                            <AccordionContent>
                                Expanding this website to include tutorials, project showcases, and a community space for developers.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Separator */}
                <Separator className="my-6" />

                {/* Bottom Section: Social Links and Footer Note */}
                <div className="space-y-4">
                    {/* Social Links */}
                    <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-2xl font-bold text-primary font-playfair">Connect with Me</h2>
                        <div className="flex space-x-6">
                            <a href="https://github.com/madhavJivani" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/madhav-jivani-095aba24b/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/jivani_madhav" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=202201285@daiict.ac.in" className="flex items-center space-x-2 hover:text-primary" target="_blank" rel="noopener noreferrer">
                                <Mail className="w-5 h-5" />
                            </a>

                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-xs text-muted-foreground font-source text-center">
                        © 2025 Madhav Jivani. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
