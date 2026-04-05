import React, { useState, useEffect } from 'react';
import { Scale, FileCheck, Users, CreditCard, AlertTriangle, ShieldCheck, ChevronRight, Gavel, Mail, LandPlot, Flag, Cable } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link } from '@inertiajs/react';

// --- Sections Data ---
const sections = [
  { id: 'agreement', title: 'Agreement to Terms' },
  { id: 'accounts', title: 'User Accounts' },
  { id: 'use', title: 'Acceptable Use' },
  { id: 'intellectual', title: 'Intellectual Property' },
  { id: 'payment', title: 'Purchases & Payment' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'termination', title: 'Termination' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Us' },
];

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState('agreement');

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <AppHeaderLayout>
      <Head title="Terms of Use" />
      <div className="bg-[#1A1A1A] text-white pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#2E7D32] rounded-full blur-[150px] opacity-90 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4CAF50] rounded-full blur-[100px] opacity-90 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Scale size={14} className="text-[#4CAF50]" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/90">Legal & Privacy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif mb-6 leading-tight">
            Terms of Use
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By accessing or using TurfTec, you agree to be bound by these terms and all applicable laws.
          </p>
          <p className="mt-8 text-sm font-bold text-gray-500 uppercase tracking-wide">
            Last Updated: February 6, 2026
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">Contents</h3>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    activeSection === section.id
                      ? 'bg-[#E8F5E9] text-[#1B5E20]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {section.title}
                  {activeSection === section.id && (
                    <ChevronRight size={16} className="text-[#2E7D32]" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-8 prose-green">
              
              <section id="agreement" className="mb-16 scroll-mt-32">
                <p className="lead text-xl text-gray-500 font-medium">
                  These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TurfTec ("we," "us" or "our"), concerning your access to and use of the TurfTec website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                </p>
              </section>

              <section id="accounts" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <Users size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">User Accounts</h2>
                </div>
                <p className="text-gray-600">To access certain features of the Site, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-6 not-prose">
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-700">
                      <ShieldCheck size={18} className="text-[#2E7D32] flex-shrink-0" />
                      <span>You are responsible for safeguarding your password.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-700">
                      <ShieldCheck size={18} className="text-[#2E7D32] flex-shrink-0" />
                      <span>You agree not to disclose your password to any third party.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-700">
                      <ShieldCheck size={18} className="text-[#2E7D32] flex-shrink-0" />
                      <span>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="use" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <FileCheck size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Acceptable Use</h2>
                </div>
                <p className="text-gray-600">You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                <p>As a user of the Site, you agree not to:</p>
                <ul className='text-gray-600'>
                  <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                  <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                  <li>Use the Site to advertise or offer to sell goods and services.</li>
                </ul>
              </section>

              <section id="intellectual" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <LandPlot size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Intellectual Property Rights</h2>
                </div>
                <p className="text-gray-600">Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
              </section>

              <section id="payment" className="mb-16 scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                    <CreditCard size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Purchases & Payment</h2>
                </div>
                <p className="text-gray-600">We accept the following forms of payment: Visa, Mastercard, American Express, Discover, and PayPal.</p>
                <p className="text-gray-600">You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
                <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] p-6 rounded-r-xl my-6 not-prose">
                  <p className="text-[#1B5E20] font-medium m-0 text-sm">
                    <strong>Subscription Renewal:</strong> If your order is subject to recurring charges, you consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until you cancel the applicable order.
                  </p>
                </div>
              </section>

              <section id="liability" className="mb-16 scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-50 rounded-xl text-red-500">
                    <Flag size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Limitation of Liability</h2>
                </div>
                <p className="text-gray-600">In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>
              </section>

              <section id="termination" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-50 rounded-xl text-red-500">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Termination</h2>
                </div>
                <p className="text-gray-600">These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.</p>
              </section>

              <section id="changes" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-50 rounded-xl text-red-500">
                    <Cable size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Changes to Terms</h2>
                </div>
                <p className="text-gray-600">We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of these Terms of Use, and you waive any right to receive specific notice of each such change.</p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <div className="bg-[#1A1A1A] rounded-3xl p-10 text-center relative overflow-hidden not-prose">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D32] rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                   
                   <Gavel className="mx-auto text-[#4CAF50] mb-4" size={32} />
                   <h2 className="text-3xl font-black text-white font-serif mb-4">Questions about our terms?</h2>
                   <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                     If you have any questions or require clarification regarding these Terms of Use, please contact our legal team.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="mailto:legal@turftec.shop" className="inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95">
                       <Mail size={18} />
                       Email Legal Team
                     </a>
                   </div>
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>
    </AppHeaderLayout>
  );
}