"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const events = [
  {
    id: "1",
    title: "Workshop: Ikigai in AI",
    image: "/e1.jpg",
    description: "In a rapidly evolving world driven by artificial intelligence, understanding the intersection between personal purpose (Ikigai) and AI-driven innovation is crucial. This workshop explores how individuals can align their skills, passions, societal needs, and career opportunities within the AI landscape. Through interactive discussions and real-world case studies, participants will: Discover the principles of Ikigai and how they apply to career growth in AI. Engage in hands-on exercises to map their own Ikigai within AI-related roles.",
    date: "March 7, 2025",
    time: "1:30 PM - 3.30 PM ",
    location: "AIR Lab / Hardware Lab",
    teamSize: "Individual",
    prizes: ["None"],
    prerequisites: ["None"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },
  {
    id: "2",
    title: "AI Story Quest",
    image: "/e2.jpg",
    description: "AI Story Quest is a technical and non-technical event that combines AI tools with storytelling. Participants use AI to generate text and images while adapting to unexpected challenges.\nObjective:\nDevelop skills in prompt engineering and AI-assisted content creation. Improve critical thinking and adaptability by responding to dynamic challenges.Enhance presentation abilities in a competitive setting.",
    date: "March 8, 2025",
    time: "1.30 PM - 3.30 PM",
    location: "AIR Lab",
    teamSize: "2-4 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: ["None"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },
  {
    id: "3",
    title: "Family Feud",
    image: "/e3.jpg",
    description: "This event brings friends together for an engaging and interactive experience, fostering teamwork and strategic thinking. Participants will compete in teams, answering survey-based questions to identify the most popular responses. The game encourages collaboration, quick decision-making, and a spirit of friendly competition. The event aims to create a dynamic and enjoyable environment where participants can test their knowledge, interact meaningfully, and strengthen social bonds through structured gameplay.",
    date: "March 8, 2025",
    time: "9.30 AM - 12.00 PM",
    location: "AIR Lab",
    teamSize: "2-4 members",
    prizes: ["Winner : ₹2000","Runner : ₹1000"],
    prerequisites: ["None"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },
  {
    id: "4",
    title: "The Pandemic That Never Happened",
    image: "/e4.jpg",
    description: "'The Pandemic That Never Happened' is an immersive cybersecurity and digital forensics event where participants must navigate through a fabricated global crisis, analyze digital evidence, and uncover the truth behind the misinformation campaign. The event will simulate a high-stakes investigative scenario in which teams will utilize forensic techniques, threat analysis, and cybersecurity skills to solve the mystery.",
    date: "March 7, 2025",
    time: "9:30 AM - 12:00 PM",
    location: "AIR Lab / Programming 1 Lab",
    teamSize: "2-3 members",
    prizes: ["Winner : ₹2500", "Runner : ₹1500"],
    prerequisites: ["None"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },
  {
    id: "5",
    title: "Nexus - Hackathon",
    image: "/e5.jpg",
    description: " The flagship event invites participants to explore the intersection of technology and art. Teams are given a mix of tech tools and artistic prompts, challenging them to craft innovative projects that blend creativity with technical expertise. Focused on interdisciplinary collaboration, this hackathon aims to inspire unique breakthroughs and redefine the boundaries of innovation.",
    date: "March 7, 2025 and March 8, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "SCPS Lab / GRD Lab",
    teamSize: "3-4 members",
    prizes: ["Winner : ₹5000", "Runner : ₹3000","Second Runner : ₹2000"],
    prerequisites: ["None"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },

];

export default function EventPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const event = events.find((e) => e.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Event Details...</div>
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistering(true);
    // Add registration logic here
    setTimeout(() => setIsRegistering(false), 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b  text-white px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 7 + 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Event Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Event Header */}
        <div className="relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#fc1464] text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              {event.status}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-shadow">
              {event.title}
            </h1>
            <p className="text-gray-200 text-sm sm:text-base hidden sm:block">
              {event.description}
            </p>
          </div>
        </div>

        {/* Mobile Event Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sm:hidden bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#fc1464]">
            Event Description
          </h2>
          <div className="relative">
            <p
              className={`text-gray-200 text-sm ${
                showFullDescription ? "" : "line-clamp-3"
              }`}
            >
              {event.description}
            </p>
            {!showFullDescription && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent" />
            )}
          </div>
          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto text-gray-300 hover:text-white"
          >
            {showFullDescription ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Read More
              </>
            )}
          </Button>
        </motion.div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Left Column - Event Information */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Event Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Team Size</p>
                    <p className="font-medium">{event.teamSize}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm sm:text-base">
                {event.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Prizes and Registration */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#fc1464]" />
                <h2 className="text-xl sm:text-2xl font-semibold text-[#fc1464]">
                  Prizes
                </h2>
              </div>
              <ul className="space-y-3">
                {event.prizes.map((prize, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#fc1464] text-lg">•</span>
                    <span className="text-gray-200">{prize}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Registration
              </h2>
              <p className="text-gray-200 text-sm sm:text-base mb-4">
                Registration Deadline:{" "}
                <span className="font-semibold">
                  {event.registrationDeadline}
                </span>
              </p>
              <Button
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full bg-[#fc1464] hover:bg-[#d1004f] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg"
              >
                {isRegistering ? "Processing..." : "Register Now"}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
