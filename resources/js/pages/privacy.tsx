import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, FileText, Mail, ChevronRight, Menu, Signpost, SprayCan } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link } from '@inertiajs/react';
import { Sign } from 'crypto';

// --- Sections Data ---
const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'collection', title: 'Information We Collect' },
  { id: 'usage', title: 'How We Use Your Data' },
  { id: 'sharing', title: 'Sharing & Disclosure' },
//   { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'security', title: 'Data Security' },
  { id: 'rights', title: 'Your Rights & Choices' },
  { id: 'contact', title: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('intro');

  // Simple scroll spy to highlight active section
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
      <Head title="Privacy Policy" />
      <div className="bg-[#1A1A1A] text-white pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#2E7D32] rounded-full blur-[150px] opacity-90 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4CAF50] rounded-full blur-[100px] opacity-90 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Shield size={14} className="text-[#4CAF50]" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/90">Legal & Privacy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We believe in transparency. Here’s a clear breakdown of how we protect your data while helping you grow a greener lawn.
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
              
              <section id="intro" className="mb-16 scroll-mt-32">
                <p className="lead text-xl text-gray-500 font-medium">
                  Welcome to TurfTec. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section id="collection" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Information We Collect</h2>
                </div>
                <p className="text-gray-600">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul className="space-y-2 list-none pl-0 mt-6">
                  {[
                    { title: "Identity Data", desc: "includes first name, last name, username or similar identifier." },
                    { title: "Contact Data", desc: "includes billing address, delivery address, email address and telephone numbers." },
                    { title: "Technical Data", desc: "includes internet protocol (IP) address, your login data, browser type and version." },
                    { title: "Lawn Data", desc: "includes soil test results, lawn size, grass type, and climate zone information provided by you." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[#2E7D32]"></div>
                      <div>
                        <strong className="text-gray-900 block mb-1">{item.title}</strong>
                        <span className="text-sm text-gray-500">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="usage" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <Eye size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">How We Use Your Data</h2>
                </div>
                <p className='text-gray-600'>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">Order Fulfillment</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">To process and deliver your orders including managing payments, fees and charges.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">Custom Plans</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">To generate your custom lawn care plan based on your location and soil data.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">Customer Support</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">To manage our relationship with you, which includes notifying you about changes to our terms.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">Improvement</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">To use data analytics to improve our website, products/services, marketing, customer relationships.</p>
                  </div>
                </div>
              </section>

              <section id="sharing" className="mb-16 scroll-mt-32 text-gray-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <SprayCan size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Sharing & Disclosure</h2>
                </div>
                <p>We do not sell your personal data. We may share your personal data with the parties set out below for the purposes set out in the table above:</p>
                <ul>
                  <li>Service providers acting as processors who provide IT and system administration services.</li>
                  <li>Professional advisers acting as processors or joint controllers including lawyers, bankers, auditors and insurers.</li>
                  <li>Regulators and other authorities acting as processors or joint controllers who require reporting of processing activities in certain circumstances.</li>
                </ul>
              </section>

              <section id="security" className="mb-16 scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-3xl m-0 text-gray-900">Data Security</h2>
                </div>
                <p className="text-gray-600">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
                <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] p-6 rounded-r-xl my-6 not-prose">
                  <p className="text-[#1B5E20] font-medium m-0 text-sm">
                    <strong>Note on Payments:</strong> We do not store credit card details. All payment processing is handled by secure, PCI-compliant third-party payment gateways (like Stripe).
                  </p>
                </div>
              </section>

              <section id="rights" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-xl text-[#2E7D32]">
                    <Signpost size={24} />
                  </div>
                  <h2 className='text-3xl m-0 text-gray-900'>Your Rights</h2>
                </div>
                
                <p className='text-gray-600'>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <div className="bg-[#1A1A1A] rounded-3xl p-10 text-center relative overflow-hidden not-prose">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D32] rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                   
                   <Mail className="mx-auto text-[#4CAF50] mb-4" size={32} />
                   <h2 className="text-3xl font-black text-white font-serif mb-4">Still have questions?</h2>
                   <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                     If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager.
                   </p>
                   <a href="mailto:privacy@turftec.shop" className="inline-block bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95">
                     Contact Privacy Team
                   </a>
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>
    </AppHeaderLayout>
  );
}