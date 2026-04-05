import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, MapPin, Mail, Phone, Clock, ShieldCheck, Leaf } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <div className="flex flex-col justify-end font-sans">
      {/* Footer Design Recreation 
        Style Source: Image 1 (Dark Grey background)
        Layout/Align Source: Image 2 (Logo Left, Links Right)
      */}
      <footer className="bg-[#2D4739] text-white pt-16 font-poppins">
        
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Main Grid: Changed to match Image 2's alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 text-sm">
            
            {/* Column 1 (Left Side): Logo & Description (Spans 2 columns for width) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
               {/* Logo Component */}
               <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full">
                   <img 
                  src="/images/turftec-logo.png" 
                  alt="TurfTec" 
                  className="h-12 w-auto object-contain"
                />
                  
                </div>
                <span className="text-2xl font-bold tracking-tight">TurfTec</span>
              </div>

              {/* Description from Image 2 */}
              <p className="text-gray-300 leading-relaxed max-w-sm text-base">
                Premium lawn & turf products designed to strengthen roots, improve soil, and deliver deep, lasting color.
              </p>
            </div>

            {/* Right Side Sections */}
            
            {/* Services */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg text-white">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Lawn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Turf</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">Custom Lawn Plan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#4CAF50] transition-colors">TurfTalk Blog</a></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg text-white">Get In Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    3329 N I35 Frontage Rd<br />
                    Gainesville, TX 76240
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <a href="mailto:hello@turftec.shop" className="text-gray-300 hover:text-[#4CAF50] transition-colors">hello@turftec.shop</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <a href="tel:833-247-4832" className="text-gray-300 hover:text-[#4CAF50] transition-colors">833-247-4832</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">Mon-Fri 9:00AM - 5:00PM</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-gray-600">
           
           <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-center gap-6 text-xs text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
              <span className="hidden md:inline text-gray-600">|</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of use</Link>
           </div>

           <div className="bg-[#1A1A1A] py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 text-xs text-gray-400">
              <p>&copy; {new Date().getFullYear()} TurfTec. All rights reserved.</p>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}