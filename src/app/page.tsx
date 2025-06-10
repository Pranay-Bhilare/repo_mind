"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Bot, LayoutDashboard, FileText } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-slate-400" />, // Subtle slate
    title: "AI Q&A",
    desc: "Ask questions about your codebase and get instant, AI-powered answers with code references.",
    bg: "from-slate-800/80 via-slate-900/80 to-slate-800/80 border-slate-700/60",
    border: "border-slate-700/60",
    shadow: "shadow-slate-900/30",
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-accent" />, // Accent blue
    title: "Project Management",
    desc: "Create, view, and switch between multiple projects with a futuristic, intuitive interface.",
    bg: "from-slate-800/80 via-slate-900/80 to-slate-800/80 border-slate-700/60",
    border: "border-slate-700/60",
    shadow: "shadow-slate-900/30",
  },
  {
    icon: <FileText className="w-10 h-10 text-slate-400" />, // Subtle slate
    title: "Code Reference Tracking",
    desc: "Every answer includes referenced files and summaries, making knowledge sharing effortless.",
    bg: "from-slate-800/80 via-slate-900/80 to-slate-800/80 border-slate-700/60",
    border: "border-slate-700/60",
    shadow: "shadow-slate-900/30",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Animated geometric background shapes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute -top-32 -left-32 w-[36rem] h-[36rem] bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-accent/10 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-accent/20 via-slate-800/40 to-slate-900/30 rounded-full blur-2xl animate-pulse"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {/* Subtle circuit motif */}
        <motion.svg
          width="600"
          height="300"
          viewBox="0 0 600 300"
          fill="none"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <motion.path
            d="M50 150 Q150 50 300 150 T550 150"
            stroke="url(#circuit)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <defs>
            <linearGradient id="circuit" x1="50" y1="150" x2="550" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#64748b" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center pt-32 pb-16 w-full max-w-7xl gap-12 px-4">
        {/* Left: Animated Logo & Title */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            >
              <motion.path
                d="M40 8L8 24L40 40L72 24L40 8Z"
                fill="url(#paint0_linear)"
                stroke="#38bdf8"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              <motion.path
                d="M8 56L40 72L72 56"
                fill="url(#paint1_linear)"
                stroke="#64748b"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M8 40L40 56L72 40"
                fill="url(#paint2_linear)"
                stroke="#818cf8"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient id="paint0_linear" x1="8" y1="8" x2="72" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="8" y1="56" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#64748b" />
                  <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="8" y1="40" x2="72" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-200 via-accent to-slate-400 bg-clip-text text-transparent text-center md:text-left drop-shadow-lg mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Repo<span className="text-accent">Mind</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-slate-300 max-w-xl text-center md:text-left mb-8 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-slate-200 via-accent to-slate-400 bg-clip-text text-transparent font-bold">AI-powered</span> codebase assistant. <span className="text-accent font-semibold">Welcome</span> to the <span className="text-slate-400 font-semibold">future</span> of code understanding.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-4"
          >
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-slate-800 via-accent to-slate-700 text-accent-foreground font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-accent/40 border-2 border-slate-700/60 animate-pulse-glow"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-accent font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-accent/40 border-2 border-slate-700/60"
            >
              Learn More
            </a>
          </motion.div>
        </div>
        {/* Right: Animated AI Chat Bubble Showcase */}
        <motion.div
          className="hidden md:flex flex-1 items-center justify-center relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800/60 via-accent/10 to-slate-900/60 blur-2xl" />
            <motion.div
              className="relative z-10 glass-card border-2 border-slate-700/60 shadow-xl p-0 flex flex-col gap-0 items-stretch overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {/* User message */}
              <div className="px-6 pt-6 pb-2 bg-gradient-to-r from-slate-900/80 to-slate-800/80 text-slate-200 font-semibold text-sm rounded-t-2xl border-b border-slate-700/40">
                <span className="text-accent font-bold mr-2">User:</span>How do I add authentication to my Next.js app?
              </div>
              {/* AI message */}
              <div className="px-6 pt-4 pb-2 bg-gradient-to-r from-slate-800/80 to-slate-900/80 text-accent-foreground text-sm border-b border-accent/30">
                <span className="text-accent font-bold mr-2">AI:</span>You can use Clerk for seamless authentication in Next.js. Here's a simple example:
              </div>
              {/* Code snippet */}
              <pre className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-b-2xl p-4 text-xs text-accent font-mono border-t-2 border-accent/30 overflow-x-auto">
{`// 1. Install Clerk
npm install @clerk/nextjs

// 2. Wrap your app in <ClerkProvider> in _app.js or layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

// 3. Use <SignIn /> and <SignUp /> components in your pages
`}
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-24">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className={`glass-card p-8 flex flex-col items-center text-center border-2 ${f.border} ${f.shadow} bg-gradient-to-br ${f.bg} hover:scale-[1.04] transition-transform duration-300 group relative overflow-hidden`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 + i * 0.2 }}
            whileHover={{ boxShadow: `0 0 32px 4px var(--tw-shadow-color)` }}
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-white/5 via-accent/10 to-slate-800/10 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            {f.icon}
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-slate-200 via-accent to-slate-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              {f.title}
            </h3>
            <p className="text-slate-300 font-medium text-base">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 border-t border-slate-700/40 flex flex-col items-center bg-gradient-to-t from-slate-900/80 to-transparent">
        <div className="flex items-center gap-2 text-accent text-xs">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span>RepoMind &copy; {new Date().getFullYear()} &mdash; Built for the future</span>
        </div>
      </footer>
    </div>
  );
}
