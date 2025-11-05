/**
 * WARUM: Footer mit Brand, Links, Social-Icons
 * WIE: 3-Column-Grid (Mobile: stacked, Desktop: 3 Spalten)
 * WAS: Contact-Links, Social-Media, Copyright
 * 
 * BEISPIEL-USE:
 * import Footer from '@/components/Footer';
 * <Footer /> // Rendert Footer am Ende der Page
 */

import {
  Github,
  Mail,
  Twitter,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-text text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* 3-Column-Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">M-Recon</h3>
            <p className="text-white/70">
              M-Pesa bookkeeping made simple for Kenyan SMEs.
            </p>
          </div>
          
          {/* Column 2: Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#waitlist" className="hover:text-primary transition-colors">
                  Join Waitlist
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:hello@m-recon.com" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Social-Icons */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Email */}
              <a
                href="mailto:hello@m-recon.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              
              {/* GitHub */}
              <a
                href="https://github.com/M-Sieger/mpesa-recon"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              
              {/* Twitter */}
              <a
                href="https://twitter.com/m_recon"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright-Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>© 2025 M-Recon – Made for Kenyan SMEs</p>
        </div>
      </div>
    </footer>
  );
}
