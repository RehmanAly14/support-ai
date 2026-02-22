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
                    <button 
                        onClick={() => router.push('/dashboard')} 
                        className="px-4 py-2 rounded-lg border border-indigo-200 text-sm hover:bg-indigo-50 transition flex items-center gap-2"
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8 sm:py-12'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='grid lg:grid-cols-2 gap-8'
                >
                    {/* Left Column - Embed Instructions */}
                    <div className='space-y-6'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Install Chatbot</h1>
                            <p className='text-gray-600'>
                                Add AI-powered support to your website in minutes
                            </p>
                        </div>

                        {/* Embed Code Card */}
                        <div className='bg-white rounded-2xl shadow-lg border border-indigo-50 overflow-hidden'>
                            <div className='bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4'>
                                <div className='flex items-center gap-2 text-white'>
                                    <Code className='w-5 h-5' />
                                    <h2 className='font-semibold'>Embed Code</h2>
                                </div>
                            </div>
                            
                            <div className='p-6'>
                                <p className='text-sm text-gray-600 mb-3'>
                                    Copy this code and paste it just before the <code className='bg-gray-100 px-1.5 py-0.5 rounded'>&lt;/body&gt;</code> tag
                                </p>
                                
                                <div className='relative bg-gray-900 rounded-xl overflow-hidden'>
                                    <pre className='p-4 text-sm text-gray-100 font-mono overflow-x-auto'>
                                        {embedCode}
                                    </pre>
                                    <button 
                                        onClick={copyCode} 
                                        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition flex items-center gap-2 text-sm text-white border border-gray-700"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className='w-4 h-4 text-green-400' />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className='w-4 h-4' />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Installation Steps */}
                        <div className='bg-white rounded-2xl shadow-lg border border-indigo-50 p-6'>
                            <h2 className='font-semibold text-gray-900 mb-4'>Quick Installation Guide</h2>
                            <div className='space-y-4'>
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
                                    <div key={item.step} className='flex gap-3'>
                                        <div className='w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold shrink-0'>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className='font-medium text-gray-900'>{item.title}</h3>
                                            <p className='text-sm text-gray-600'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Need Help? */}
                        <div className='bg-indigo-50 rounded-2xl p-6'>
                            <h3 className='font-semibold text-indigo-900 mb-2'>Need assistance?</h3>
                            <p className='text-sm text-indigo-700 mb-3'>
                                Our team is here to help you with the integration process.
                            </p>
                            <button className='text-sm font-medium text-indigo-600 hover:text-indigo-700'>
                                Contact Support →
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Live Preview */}
                    <div className='space-y-6'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Eye className='w-5 h-5 text-gray-700' />
                                <h2 className='text-xl font-semibold text-gray-900'>Live Preview</h2>
                            </div>
                            
                            {/* Device Toggle */}
                            <div className='flex items-center gap-2 bg-white rounded-lg p-1 border border-indigo-100'>
                                <button
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition ${
                                        previewDevice === 'desktop' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    <Monitor className='w-4 h-4' />
                                    Desktop
                                </button>
                                <button
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition ${
                                        previewDevice === 'mobile' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'text-gray-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    <Smartphone className='w-4 h-4' />
                                    Mobile
                                </button>
                            </div>
                        </div>

                        {/* Preview Window */}
                        <motion.div 
                            animate={{ 
                                maxWidth: previewDevice === 'mobile' ? '320px' : '100%'
                            }}
                            className='bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden mx-auto transition-all'
                        >
                            {/* Browser Chrome */}
                            <div className='bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2'>
                                <div className='flex gap-1.5'>
                                    <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                    <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                </div>
                                <div className='flex-1 bg-white rounded-full px-4 py-1.5 text-xs text-gray-500 flex items-center gap-2'>
                                    <span className='w-4 h-4 bg-gray-200 rounded-full'></span>
                                    your-website.com
                                </div>
                            </div>

                            {/* Website Content Preview */}
                            <div className='relative bg-linear-to-br from-gray-50 to-white p-6 min-h-100'>
                                {/* Sample Website Content */}
                                <div className='space-y-4'>
                                    <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                                    <div className='space-y-2'>
                                        <div className='h-4 bg-gray-200 rounded w-full'></div>
                                        <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                                        <div className='h-4 bg-gray-200 rounded w-4/6'></div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 mt-6'>
                                        <div className='h-24 bg-gray-200 rounded'></div>
                                        <div className='h-24 bg-gray-200 rounded'></div>
                                    </div>
                                </div>

                                {/* Floating Chatbot Preview */}
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='absolute bottom-6 right-6'
                                >
                                    {/* Chat Window */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className='absolute bottom-20 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden mb-2'
                                    >
                                        <div className='bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex justify-between items-center'>
                                            <span className='font-medium text-sm'>SupportAI Assistant</span>
                                            <span className='text-xs opacity-70'>● Online</span>
                                        </div>
                                        <div className='p-4 space-y-3 bg-gray-50'>
                                            <div className='bg-white text-gray-800 text-xs px-3 py-2 rounded-lg shadow-sm max-w-[80%]'>
                                                👋 Hello! How can I help you today?
                                            </div>
                                            <div className='bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg ml-auto max-w-[80%]'>
                                                I need help with my account settings.
                                            </div>
                                            <div className='bg-white text-gray-400 text-xs px-3 py-2 rounded-lg max-w-[80%]'>
                                ⏳ Let me check that for you...
                                            </div>
                                        </div>
                                        <div className='p-3 border-t border-gray-200 bg-white'>
                                            <div className='flex gap-2'>
                                                <div className='flex-1 h-8 bg-gray-100 rounded-full'></div>
                                                <div className='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center'>
                                                    <MessageCircle className='w-4 h-4 text-white' />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Chat Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='w-14 h-14 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow'
                                    >
                                        <MessageCircle className='w-6 h-6' />
                                    </motion.button>
                                </motion.div>

                                {/* Preview Label */}
                                <div className='absolute top-4 left-4 bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full'>
                                    Live Preview
                                </div>
                            </div>
                        </motion.div>

                        {/* Preview Hint */}
                        <p className='text-sm text-gray-500 text-center'>
                            This is how your chatbot will appear on your website
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default EmbedClient