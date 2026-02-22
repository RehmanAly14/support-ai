"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Clock,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Bot,
  CheckCircle2
} from "lucide-react";

const HomeClient = ({ email }: { email: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  const handleLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/login";
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout")
      window.location.href = "/";
    } catch (error) {
      console.log(error)
    }
  };

  const firstLetter = email ? email[0].toUpperCase() : "";
  const profileDropdown = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdown.current &&
        !profileDropdown.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Plug & Play",
      desc: "Add the chatbot to your site with a single script tag. No complex setup required.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Admin Controlled",
      desc: "You control exactly what the AI knows and answers. Full transparency and control.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Always Online",
      desc: "Your customers get instant support 24/7, without waiting for human availability.",
      color: "from-emerald-500 to-teal-500"
    }
  ];


  return (
    <div className="min-h-screen bg-linear-to-br from-white via-zinc-50 to-white text-zinc-900 overflow-x-hidden">
      {/* Modern Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-black to-zinc-800 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-xl border-2 border-dashed border-zinc-300 opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                SupportAI
              </span>
              <span className="text-xs text-zinc-400 -mt-1">by ModernStack</span>
            </div>
          </motion.div>

          {/* Auth Section */}
          {email ? (
            <div ref={profileDropdown} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-linear-to-r from-zinc-900 to-black text-white 
                hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >  
                  {firstLetter}
         
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl 
                    border border-zinc-200 overflow-hidden py-2 backdrop-blur-xl "
                  >
                    {/* Profile Info */}
                    <div className="px-4 py-4 border-b border-zinc-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-semibold text-white text-lg">
                          {firstLetter}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {email}
                          </div>
                          <div className="text-xs text-zinc-400 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <motion.button 
                        whileHover={{ x: 4 }}
                        onClick={() => { router.push('/dashboard'); setOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-zinc-100/80 transition-all group"
                      >
                        <span className="font-medium text-zinc-800">Dashboard</span>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                      </motion.button>

                      <motion.button 
                        whileHover={{ x: 4 }}
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm 
                        text-red-600 hover:bg-red-50/80 transition-all group"
                      >
                        <span className="font-medium">Logout</span>
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          className="w-4 h-4"
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-black to-zinc-800 text-white text-sm font-medium 
              hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
             {loading ? "Redirecting..." : "Get Started "}
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-linear-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Support</span>
            </div>
            
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Intelligent{" "}
              <span className="bg-linear-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                Customer Support
              </span>{" "}
              for Modern Businesses
            </h1>
            
            <p className="mt-6 text-sm sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
              Transform customer experience with AI that understands your business. 
              Provide instant, accurate answers 24/7 using your own knowledge base.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {email ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 rounded-xl bg-linear-to-r from-black to-zinc-800 text-white font-medium 
                  hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Go to Dashboard</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="px-8 py-4 rounded-xl bg-linear-to-r from-black to-zinc-800 text-white font-medium 
                  hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Free Trial</span>
                </motion.button>
              )}

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#features"
                className="px-8 py-4 rounded-xl border-2 border-zinc-300 text-zinc-700 font-medium 
                hover:bg-zinc-50 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>See Features</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </motion.a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </motion.div>

          {/* Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl bg-linear-to-br from-white to-zinc-50 shadow-2xl border border-zinc-200/50 p-6 lg:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-black to-zinc-800 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Support AI Assistant</div>
                    <div className="text-xs text-zinc-500">Typically replies instantly</div>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-linear-to-r from-black to-zinc-800 text-white rounded-2xl px-5 py-3 text-sm ml-auto w-fit max-w-[80%]"
                >
                  Do you offer cash on delivery?
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-linear-to-r from-zinc-100 to-white rounded-2xl px-5 py-3 text-sm w-fit max-w-[80%] border border-zinc-200"
                >
                  <div className="font-medium text-zinc-900 mb-1">Yes! 🎉</div>
                  <div className="text-zinc-700 text-sm">
                    Cash On Delivery is available for orders above ₹500. 
                    Additional ₹30 COD charges apply.
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">
                    Updated just now • From your FAQ
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-200/50">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>AI is typing...</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -right-6 w-14 h-14 rounded-2xl bg-linear-to-br from-black to-zinc-800 
              text-white flex items-center justify-center shadow-2xl border-2 border-white"
            >
              <MessageSquare className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -left-6 w-14 h-14 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 
              flex items-center justify-center shadow-xl border-2 border-white"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-zinc-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 mb-4">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything You Need for
              Modern Support
            </h2>
            <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
              Built with cutting-edge AI to deliver exceptional customer experiences
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white to-white rounded-3xl shadow-lg 
                border border-zinc-200/50 group-hover:shadow-2xl transition-all duration-300" />
                <div className="relative p-8 rounded-3xl">
                  <div className={`w-12 h-12 rounded-2xl bg-black 
                  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
                  <div className="mt-6 pt-6 border-t border-zinc-200/50">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <div className="w-2 h-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500" />
                      <span>Included in all plans</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/50 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-black to-zinc-800 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-linear-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                  SupportAI
                </div>
                <div className="text-xs text-zinc-400">Intelligent customer support</div>
              </div>
            </div>
            
            <div className="text-sm text-zinc-500 text-center lg:text-right">
              <div>&copy; {new Date().getFullYear()} SupportAI. All rights reserved.</div>
              <div className="mt-1">rehmanaly250@gmail.com</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeClient;