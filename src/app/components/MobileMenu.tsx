"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, User, LogOut, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import styles from "./Navbar.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string }>;
  isAuthenticated: boolean;
  onProfileClick: () => void;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  isAuthenticated,
  onProfileClick,
  onLogout,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <Link href="/" className="flex items-center" onClick={onClose}>
              <ChevronLeft className="h-6 w-6 text-white mr-2" />
              <span className="text-white">Back to Home</span>
            </Link>
            <Button
              size="icon"
              className="text-white hover:bg-zinc-800"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink
                  href={item.href}
                  onClick={onClose}
                  className={`block text-lg py-2 ${
                    item.label === "Flagship" ? styles.animateTextWave : ""
                  }`}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            {isAuthenticated ? (
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <Button
                  onClick={onProfileClick}
                  className="w-full bg-[#fc1464] hover:bg-[#d1004f]"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <LogOut className="w-full bg-primary hover:bg-primary/90"/>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <Button
                  asChild
                  className="w-full bg-[#fc1464] hover:bg-[#d1004f]"
                >
                  <Link href="/register">Register</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
