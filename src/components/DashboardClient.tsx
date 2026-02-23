"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Bot, 
  Save, 
  CheckCircle, 
  Building2, 
  Mail, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Settings,
  HelpCircle,
  ArrowRight,
  Database,
  Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [bussinessName, setBussinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/settings", {
        ownerId,
        bussinessName,
        supportEmail,
        knowledge,
      });
      console.log(res.data);
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const res = await axios.post("/api/settings/get", { ownerId });
          const data = res.data.settings;

          setBussinessName(data?.bussinessName ?? "");
          setSupportEmail(data?.supportEmail ?? "");
          setKnowledge(data?.knowledge ?? "");
        } catch (error) {
          console.log(error);
        }
      };
      handleGetDetails();
    }
  }, [ownerId]);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-white">
      {/* Modern Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-indigo-100 shadow-lg shadow-indigo-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-r from-black to-zinc-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-xl border-2 border-dashed border-zinc-300 opacity-50"
              />
            </div>
            <div onClick={() => router.push("/")} className="flex flex-col">
              <span className="text-xl font-bold bg-black bg-clip-text text-transparent">
                SupportAI
              </span>
              <span className="text-xs text-zinc-400 -mt-1">
                Intelligent Support
              </span>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('embed')}
            className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2"
          >
            Get Embed Code
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chatbot Settings</h1>
              <p className="text-gray-600 mt-1">
                Configure your AI assistant's knowledge and business details
              </p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">1</div>
              <span className="text-sm font-medium text-gray-900">Business Details</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">2</div>
              <span className="text-sm font-medium text-gray-500">Knowledge Base</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">3</div>
              <span className="text-sm font-medium text-gray-500">Integration</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 overflow-hidden">
              {/* Business Details Section */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        onChange={(e) => setBussinessName(e.target.value)}
                        value={bussinessName}
                        type="text"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50 hover:bg-white"
                        placeholder="e.g., Acme Corporation"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        onChange={(e) => setSupportEmail(e.target.value)}
                        value={supportEmail}
                        type="email"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50 hover:bg-white"
                        placeholder="support@yourbusiness.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Knowledge Base Section */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Knowledge Base</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Train your AI with FAQs, policies, and important information
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-indigo-900 mb-1">Pro Tip</h3>
                        <p className="text-xs text-indigo-700">
                          Add common questions, your return policy, shipping info, and any other information your customers frequently ask about.
                        </p>
                      </div>
                    </div>
                  </div>

                  <textarea
                    onChange={(e) => setKnowledge(e.target.value)}
                    value={knowledge}
                    className="w-full h-64 rounded-xl border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50 hover:bg-white resize-none"
                    placeholder={`Example FAQs:
• What are your shipping options?
• How do I return an item?
• What payment methods do you accept?
• Do you offer international shipping?
• How can I track my order?
• What's your refund policy?
• Business hours: Mon-Fri 9am-6pm EST`}
                  />

                  {/* Character Count */}
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400">
                      {knowledge.length} characters
                    </span>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4 mt-8">
                  <motion.button
                    disabled={loading}
                    onClick={handleSettings}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Configuration
                      </>
                    )}
                  </motion.button>
                  
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings saved successfully!</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Help & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                Knowledge Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium text-gray-900">
                      {knowledge.length > 0 ? '80%' : '20%'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: knowledge.length > 0 ? '80%' : '20%' }}
                      className="h-full bg-linear-to-r from-indigo-600 to-purple-600 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-indigo-50 rounded-xl">
                    <div className="text-2xl font-bold text-indigo-600">
                      {knowledge.split('\n').filter(line => line.trim()).length}
                    </div>
                    <div className="text-xs text-gray-600">Entries</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {bussinessName && supportEmail ? '2/2' : '1/2'}
                    </div>
                    <div className="text-xs text-gray-600">Fields</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-indigo-100">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Add your most common customer questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Include return and refund policies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  List your business hours clearly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  Add shipping and delivery information
                </li>
              </ul>
              
              <button 
                onClick={() => router.push('embed')}
                className="mt-6 w-full px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Next: Get Embed Code
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is ready to assist you with any questions.
              </p>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;