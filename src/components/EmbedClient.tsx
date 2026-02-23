"use client"
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Check, Copy, ArrowLeft, MessageCircle, Code, Eye, Smartphone, Monitor, Bot } from 'lucide-react'

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
    const router = useRouter();
    const embedCode = `<script 
    src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
     data-owner-id="${ownerId}">
</script>`

    const [copied, setCopied] = useState(false);
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className='min-h-screen bg-zinc-50'>
            {/* Header */}
            <div className='sticky top-0 bg-white/80 backdrop-blur-md border-b border-indigo-100 z-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-black to-zinc-800 flex items-center justify-center">
                                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-1 rounded-xl border-2 border-dashed border-zinc-300 opacity-50"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                                SupportAI
                            </span>
                            <span className="text-[10px] sm:text-xs text-zinc-400 -mt-1 hidden xs:block">by ModernStack</span>
                        </div>
                    </motion.div>
                    <button 
                        onClick={() => router.push('/dashboard')} 
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-indigo-200 text-xs sm:text-sm hover:bg-indigo-50 transition flex items-center gap-1 sm:gap-2 shrink-0"
                    >
                        <ArrowLeft className='w-3 h-3 sm:w-4 sm:h-4' />
                        <span className="hidden xs:inline">Back to Dashboard</span>
                        <span className="xs:hidden">Back</span>
                    </button>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='grid lg:grid-cols-2 gap-6 sm:gap-8'
                >
                    {/* Left Column - Embed Instructions */}
                    <div className='space-y-4 sm:space-y-6'>
                        <div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>Install Chatbot</h1>
                            <p className='text-sm sm:text-base text-gray-600'>
                                Add AI-powered support to your website in minutes
                            </p>
                        </div>

                        {/* Embed Code Card */}
                        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg border border-indigo-50 overflow-hidden'>
                            <div className='bg-linear-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4'>
                                <div className='flex items-center gap-2 text-white'>
                                    <Code className='w-4 h-4 sm:w-5 sm:h-5' />
                                    <h2 className='text-sm sm:text-base font-semibold'>Embed Code</h2>
                                </div>
                            </div>
                            
                            <div className='p-4 sm:p-6'>
                                <p className='text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3'>
                                    Copy this code and paste it just before the <code className='bg-gray-100 px-1.5 py-0.5 rounded text-xs'>&lt;/body&gt;</code> tag
                                </p>
                                
                                <div className='relative bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden'>
                                    <pre className='p-3 sm:p-4 text-xs sm:text-sm text-gray-100 font-mono overflow-x-auto whitespace-pre-wrap break-all'>
                                        {embedCode}
                                    </pre>
                                    <button 
                                        onClick={copyCode} 
                                        className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white border border-gray-700"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className='w-3 h-3 sm:w-4 sm:h-4 text-green-400' />
                                                <span className="hidden xs:inline">Copied!</span>
                                                <span className="xs:hidden">✓</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className='w-3 h-3 sm:w-4 sm:h-4' />
                                                <span className="hidden xs:inline">Copy</span>
                                                <span className="xs:hidden">📋</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Installation Steps */}
                        <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg border border-indigo-50 p-4 sm:p-6'>
                            <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Quick Installation Guide</h2>
                            <div className='space-y-3 sm:space-y-4'>
                                {[
                                    {
                                        step: 1,
                                        title: 'Copy the code',
                                        description: 'Click the copy button above to save the embed code to your clipboard'
                                    },
                                    {
                                        step: 2,
                                        title: 'Paste in your website',
                                        description: 'Open your website\'s HTML file and paste the code right before the closing &lt;/body&gt; tag'
                                    },
                                    {
                                        step: 3,
                                        title: 'Save and publish',
                                        description: 'Save your changes, deploy your website, and the chatbot will appear automatically'
                                    }
                                ].map((item) => (
                                    <div key={item.step} className='flex gap-2 sm:gap-3'>
                                        <div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 mt-0.5'>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className='text-sm sm:text-base font-medium text-gray-900'>{item.title}</h3>
                                            <p className='text-xs sm:text-sm text-gray-600'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                    </div>

                    {/* Right Column - Live Preview */}
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4'>
                            <div className='flex items-center gap-2'>
                                <Eye className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700' />
                                <h2 className='text-lg sm:text-xl font-semibold text-gray-900'>Live Preview</h2>
                            </div>
                            
                            {/* Device Toggle */}
                            <div className='flex items-center gap-2 bg-white rounded-lg p-1 border border-indigo-100 w-fit'>
                                <button
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition ${
                                        previewDevice === 'desktop' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    <Monitor className='w-3 h-3 sm:w-4 sm:h-4' />
                                    <span className="hidden xs:inline">Desktop</span>
                                    <span className="xs:hidden">💻</span>
                                </button>
                                <button
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition ${
                                        previewDevice === 'mobile' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    <Smartphone className='w-3 h-3 sm:w-4 sm:h-4' />
                                    <span className="hidden xs:inline">Mobile</span>
                                    <span className="xs:hidden">📱</span>
                                </button>
                            </div>
                        </div>

                        {/* Preview Window */}
                        <motion.div 
                            animate={{ 
                                maxWidth: previewDevice === 'mobile' ? '280px' : '100%'
                            }}
                            className='bg-white rounded-xl sm:rounded-2xl shadow-xl border border-indigo-100 overflow-hidden mx-auto transition-all'
                        >
                            {/* Browser Chrome */}
                            <div className='bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 border-b        border-gray-200 flex items-center gap-2'>
                                <div className='flex gap-1 sm:gap-1.5'>
                                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full'></div>
                                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full'></div>
                                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full'></div>
                                </div>
                                <div className='flex-1 bg-white rounded-full px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 sm:gap-2 truncate'>
                                    <span className='w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full shrink-0'></span>
                                    <span className="truncate">your-website.com</span>
                                </div>
                            </div>

                            {/* Website Content Preview */}
                            <div className='relative bg-linear-to-br from-gray-50 to-white p-3 sm:p-4 md:p-6 min-h-87.5 sm:min-h-100 md:min-h-112.5'>
                                {/* Sample Website Content */}
                                <div className='space-y-3 sm:space-y-4'>
                                    <div className='h-4 sm:h-6 bg-gray-200 rounded w-2/3 sm:w-3/4'></div>
                                    <div className='space-y-1 sm:space-y-2'>
                                        <div className='h-3 sm:h-4 bg-gray-200 rounded w-full'></div>
                                        <div className='h-3 sm:h-4 bg-gray-200 rounded w-4/5 sm:w-5/6'></div>
                                        <div className='h-3 sm:h-4 bg-gray-200 rounded w-3/5 sm:w-4/6'></div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6'>
                                        <div className='h-16 sm:h-20 md:h-24 bg-gray-200 rounded'></div>
                                        <div className='h-16 sm:h-20 md:h-24 bg-gray-200 rounded'></div>
                                    </div>
                                </div>

                                {/* Floating Chatbot Preview */}
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6'
                                >
                                    {/* Chat Window */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className='absolute bottom-16 sm:bottom-20 right-0 w-60 sm:w-64 md:w-72 bg-white rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 overflow-hidden mb-2'
                                    >
                                        <div className='bg-linear-to-r from-indigo-600 to-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center'>
                                            <span className='font-medium text-xs sm:text-sm truncate'>SupportAI Assistant</span>
                                            <span className='text-[10px] sm:text-xs opacity-70 shrink-0'>● Online</span>
                                        </div>
                                        <div className='p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 bg-gray-50'>
                                            <div className='bg-white text-gray-800 text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-sm max-w-[80%]'>
                                                👋 Hello! How can I help?
                                            </div>
                                            <div className='bg-indigo-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ml-auto max-w-[80%]'>
                                                I need help with account
                                            </div>
                                            <div className='bg-white text-gray-400 text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg max-w-[80%]'>
                                                ⏳ Let me check...
                                            </div>
                                        </div>
                                        <div className='p-2 sm:p-3 border-t border-gray-200 bg-white'>
                                            <div className='flex gap-1 sm:gap-2'>
                                                <div className='flex-1 h-6 sm:h-8 bg-gray-100 rounded-full'></div>
                                                <div className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-indigo-600 rounded-full flex items-center justify-center shrink-0'>
                                                    <MessageCircle className='w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white' />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Chat Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow'
                                    >
                                        <MessageCircle className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
                                    </motion.button>
                                </motion.div>

                                {/* Preview Label */}
                                <div className='absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                                    Live Preview
                                </div>
                            </div>
                        </motion.div>

                        {/* Preview Hint */}
                        <p className='text-xs sm:text-sm text-gray-500 text-center px-2'>
                            This is how your chatbot will appear on your website
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default EmbedClient