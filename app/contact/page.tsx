'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Headphones, 
  Send, 
  HelpCircle,
  Share2,
  Globe,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16">
      
      {/* 1. Hero Banner (Green Gradient) - تم زيادة الـ pb إلى 20 لترك مساحة كافية للكروت */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 text-white pt-8 pb-20 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          
          {/* Breadcrumb */}
          <div className="text-xs text-emerald-100 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-90">Home</Link>
            <span>/</span>
            <span className="font-semibold text-white">Contact Us</span>
          </div>

          {/* Title Banner */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Headphones className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                Contact Us
              </h1>
              <p className="text-emerald-50 text-xs sm:text-sm font-medium opacity-90">
                We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Contact Cards */}
          <div className="space-y-4">
            
            {/* Phone Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Phone</h3>
                <p className="text-xs text-gray-400 mb-1">Mon-Fri from 8am to 6pm</p>
                <a href="tel:+18001234567" className="text-sm font-semibold text-emerald-600 hover:underline">
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Email</h3>
                <p className="text-xs text-gray-400 mb-1">We&apos;ll respond within 24 hours</p>
                <a href="mailto:support@freshcart.com" className="text-sm font-semibold text-emerald-600 hover:underline">
                  support@freshcart.com
                </a>
              </div>
            </div>

            {/* Office Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Office</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  123 Commerce Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Business Hours</h3>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p>Monday - Friday: 8am - 6pm</p>
                  <p>Saturday: 9am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 mb-3">Follow Us</h3>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 flex items-center justify-center transition border border-gray-100">
                  <Globe className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 flex items-center justify-center transition border border-gray-100">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 flex items-center justify-center transition border border-gray-100">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Send Us a Message Form & FAQ Card */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Form Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Send us a Message</h2>
                  <p className="text-xs text-gray-400">Fill out the form and we&apos;ll get back to you</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* Select Subject */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="orders">Orders & Shipping</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                {/* Message Box */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

              </form>
            </div>

            {/* Quick Answers Card */}
            <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Looking for quick answers?</h3>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                >
                  Visit Help Center &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}