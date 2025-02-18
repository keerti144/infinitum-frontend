"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  id: string;
}

const events: Event[] = [
  {
    id: "1",
    date: "2024-09-14",
    name: "Git and GitHub",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "2",
    date: "2024-09-20",
    name: "EtherX: DevSecOps",
    startTime: "16:00",
    endTime: "19:00",
  },
  {
    id: "3",
    date: "2024-09-21",
    name: "EtherX: Capture the Flag",
    startTime: "17:00",
    endTime: "18:00",
  },
  {
    id: "4",
    date: "2024-09-21",
    name: "EtherX: OSINT",
    startTime: "13:00",
    endTime: "19:00",
  },
  {
    id: "5",
    date: "2024-09-22",
    name: "EtherX: Hackathon Essentials",
    startTime: "15:00",
    endTime: "18:00",
  },
];

const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 11}:00`);

export default function ScheduleDisplay() {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  const toggleEvent = (eventId: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const filteredEvents =
    selectedEvents.size > 0
      ? events.filter((event) => selectedEvents.has(event.id))
      : events;

  return (
    <div className="w-full p-4 py-8 min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Table View */}
        <div className="rounded-lg overflow-hidden border border-pink-600">
          <Table>
            <TableHeader className="bg-pink-600/10">
              <TableRow>
                <TableHead className="text-pink-500 font-bold">
                  Date & Event
                </TableHead>
                <TableHead className="text-pink-500 font-bold">
                  Start Time
                </TableHead>
                <TableHead className="text-pink-500 font-bold">
                  End Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event.id}
                  className={`cursor-pointer transition-colors ${
                    selectedEvents.has(event.id)
                      ? "bg-pink-600/25 hover:bg-pink-600/30"
                      : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => toggleEvent(event.id)}
                >
                  <TableCell className="font-medium">
                    {event.date.split("-").slice(1).join("-")}: {event.name}
                  </TableCell>
                  <TableCell>{event.startTime}</TableCell>
                  <TableCell>{event.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Timeline View */}
        <div className="border border-pink-600 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-[200px_repeat(11,1fr)] bg-pink-600/10 border-b border-pink-600">
                <div className="p-4 text-pink-500 font-bold">Event</div>
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="p-4 text-pink-500 font-bold text-center"
                  >
                    {time}
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    key={`${event.date}-${event.name}`}
                    className="grid grid-cols-[200px_repeat(11,1fr)] border-b border-gray-800 relative"
                  >
                    <div className="p-4">{event.name}</div>
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="p-4 border-l border-gray-800"
                      ></div>
                    ))}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute left-[200px] h-full ${
                        selectedEvents.has(event.id)
                          ? "bg-pink-600/25"
                          : "bg-gray-700/25"
                      }`}
                      style={{
                        left: `calc(200px + ${
                          (Number.parseInt(event.startTime) - 11) * (100 / 11)
                        }%)`,
                        width: `${
                          ((Number.parseInt(event.endTime) -
                            Number.parseInt(event.startTime)) *
                            100) /
                          11
                        }%`,
                        transformOrigin: "left",
                      }}
                    >
                      <div className="p-2 truncate">{event.name}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-gray-400"
                >
                  Click on events in the table above to view their timelines
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
