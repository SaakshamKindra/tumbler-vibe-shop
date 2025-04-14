import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-black">
            🛡️ Privacy Policy
          </h1>
          
          <p className="text-black mb-6">
            Effective Date: 14th April, 2025
          </p>
          
          <p className="text-black mb-8">
            At <span className="text-brand-terracotta font-bold font-display">ASA</span> <span className="text-brand-brown font-bold font-display">artisans</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website and purchase our customized tumblers.
          </p>
          
          <div className="space-y-8 text-black">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p>We may collect the following information when you interact with our website:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personal Information: Name, email address, phone number, shipping address, and payment details when you place an order.</li>
                <li>Customization Data: Any images, text, or designs you upload for tumbler customization.</li>
                <li>Usage Data: IP address, browser type, device info, and browsing behavior (via cookies or analytics tools).</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your purchase</li>
                <li>Personalize your shopping experience</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send marketing emails (only if you opt in)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
              <p>We do not sell or rent your personal data. We may share your information with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Service providers (e.g., payment processors, shipping companies) to fulfill orders</li>
                <li>Legal authorities if required by law or to protect our rights</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze site traffic and performance</li>
                <li>Offer a smoother browsing experience</li>
              </ul>
              <p>You can adjust your cookie settings through your browser.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p>We implement industry-standard security measures (SSL encryption, secure payment gateways) to protect your personal data. However, no online transmission is 100% secure.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request corrections or deletions</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p>To exercise your rights, contact us at [your email address].</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Children’s Privacy</h2>
              <p>Our website is not intended for children under 13. We do not knowingly collect data from minors.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We’ll notify you of significant changes via email or website notice.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, contact us at:</p>
              <p className="mt-2">
                📧 Email: <a href="mailto:saakshamkindra@gmail.com" className="text-brand-terracotta hover:underline">saakshamkindra@gmail.com</a>
              </p>
              <p className="mt-2">
                📍 Address: Aligarh
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
