"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Trophy, MapPin } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Hackathon: Code for Change",
    image: "/e1.jpg",
    description: "Join us for a 24-hour coding marathon where innovation meets social impact. Build solutions that address real-world challenges in healthcare, education, or environmental sustainability.",
    date: "March 6, 2025",
    time: "9:00 AM - March 7, 9:00 AM",
    location: "PSG Tech Main Auditorium",
    teamSize: "2-4 members",
    prizes: ["₹50,000 First Prize", "₹30,000 Second Prize", "₹20,000 Third Prize"],
    prerequisites: ["Laptop with required software", "Student ID", "Basic coding knowledge"],
    registrationDeadline: "March 1, 2025",
    status: "Upcoming"
  },
  {
    id: "2",
    title: "AI Story Quest",
    image: "/e2.jpg",
    description: "AI Story Quest is a technical and non-technical event that combines AI tools with storytelling. Participants use AI to generate text and images while adapting to unexpected challenges.\nObjective:\nDevelop skills in prompt engineering and AI-assisted content creation. Improve critical thinking and adaptability by responding to dynamic challenges.Enhance presentation abilities in a competitive setting.",
    date: "March 8, 2025",
    time: "1.30 PM - 3.30 PM",
    location: "3AI Lab",
    teamSize: "2-3 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: ["Basic Python knowledge", "Laptop", "Mathematics background"],
    registrationDeadline: "March 3, 2025",
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
    teamSize: "4-6 members",
    prizes: ["Winner : ₹2000","Runner : ₹1000"],
    prerequisites: ["Basic networking knowledge"],
    registrationDeadline: "March 8, 2025",
    status: "Upcoming"
  },
  {
    id: "4",
    title: "The Pandemic That Never Happened",
    image: "/e4.jpg",
    description: "'The Pandemic That Never Happened' is an immersive cybersecurity and digital forensics event where participants must navigate through a fabricated global crisis, analyze digital evidence, and uncover the truth behind the misinformation campaign. The event will simulate a high-stakes investigative scenario in which teams will utilize forensic techniques, threat analysis, and cybersecurity skills to solve the mystery.",
    date: "March 7, 2025",
    time: "9:30 AM - 12:00 PM",
    location: "AIR Lab",
    teamSize: "2-4 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: ["JavaScript knowledge", "Laptop", "MetaMask wallet"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming"
  },
 
];

export default function EventPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

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
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-black text-white px-4 pt-20 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
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
        <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-8">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#fc1464] text-white text-sm mb-3">
              {event.status}
            </div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-300 text-lg">{event.description}</p>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Event Information */}
          <div className="space-y-6">
            <div className="bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400">Date</p>
                    <p>{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400">Time</p>
                    <p>{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400">Team Size</p>
                    <p>{event.teamSize}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {event.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Prizes and Registration */}
          <div className="space-y-6">
            <div className="bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#fc1464]" />
                <h2 className="text-xl font-semibold">Prizes</h2>
              </div>
              <ul className="space-y-3">
                {event.prizes.map((prize, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#fc1464]">•</span>
                    <span className="text-gray-300">{prize}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Registration</h2>
              <p className="text-gray-300 mb-4">
                Registration Deadline: {event.registrationDeadline}
              </p>
              <Button
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full bg-[#fc1464] hover:bg-[#d1004f] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isRegistering ? "Processing..." : "Register Now"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}