"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.15,
                ease: "easeOut",
            }}
            className={cn(
                "group rounded-lg border-[0.5px] border-gray-600/50",
                "transition-all duration-200 ease-in-out",
                isOpen ? "bg-gray-800" : "hover:bg-gray-700"
            )}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4"
            >
                <h3 className="text-base font-medium text-gray-300 text-left">
                    {question}
                </h3>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-gray-400 dark:text-gray-300"
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.4, ease: "easeOut" },
                            opacity: { duration: 0.25 },
                        }}
                    >
                        <div className="px-6 pb-4 pt-2">
                            <motion.p className="text-sm text-gray-400 leading-relaxed">
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function FaqInfinitum2025() {
    const faqs: Omit<FAQItemProps, "index">[] = [
        {
            question: "What is INFINITUM 2025?",
            answer: "INFINITUM 2025 is the annual tech fest organized by CSEA at PSG College of Technology. It features a hackathon, technical workshops, cybersecurity challenges, and fun non-tech events.",
        },
        {
            question: "Who can participate in the hackathon?",
            answer: "The hackathon is open to all students passionate about coding, AI, and problem-solving. Teams will compete to build innovative solutions within a given timeframe.",
        },
        {
            question: "What workshops are available?",
            answer: "We have two key workshops: 'Building a RESTful API with Flask, MongoDB, and LLM Integration' and 'Machine Learning Workshop'. These provide hands-on experience in modern tech development.",
        },
        {
            question: "Are there non-technical events?",
            answer: "Yes! Events like 'Family Feud', 'AI StoryQuest', and 'Manipulation Challenge & Musical Chairs' offer engaging experiences beyond coding.",
        },
        {
            question: "How can I register?",
            answer: "Registration details will be shared on the official INFINITUM 2025 website and CSEA announcements. Stay tuned for updates!",
        },
    ];

    return (
        <section className="py-16 w-full bg-black">
            <div className="container px-4 mx-auto">
                <motion.div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-3 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-400">
                        Get all the answers about our tech fest!
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} index={index} />
                    ))}
                </div>

                <motion.div className="max-w-md mx-auto mt-12 p-6 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4 text-gray-300">
                        <Mail className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">
                        Still have questions?
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                        Reach out to the CSEA team for assistance.
                    </p>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                        Contact Us
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default FaqInfinitum2025;
