
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 mt-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
            <span className="mr-2">🛡️</span>
            <span>Privacy Policy</span>
          </h1>
          
          <p className="text-center mb-8 text-gray-600">
            Effective Date: 14th April, 2025
          </p>
          
          <p className="mb-6 text-black">
            At <span className="font-semibold text-brand-terracotta">ASA artisans</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website and purchase our customized tumblers.
          </p>
          
          <div className="space-y-6 text-black">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p>We may collect the following information when you interact with our website:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><span className="font-medium">Personal Information:</span> Name, email address, phone number, shipping address, and payment details when you place an order.</li>
                <li><span className="font-medium">Customization Data:</span> Any images, text, or designs you upload for tumbler customization.</li>
                <li><span className="font-medium">Usage Data:</span> IP address, browser type, device info, and browsing behavior (via cookies or analytics tools).</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your purchase</li>
                <li>Personalize your shopping experience</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send marketing emails (only if you opt in)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Sharing Your Information</h2>
              <p>We do not sell or rent your personal data. We may share your information with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Service providers (e.g., payment processors, shipping companies) to fulfill orders</li>
                <li>Legal authorities if required by law or to protect our rights</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Remember your preferences</li>
                <li>Analyze site traffic and performance</li>
                <li>Offer a smoother browsing experience</li>
              </ul>
              <p className="mt-2">You can adjust your cookie settings through your browser.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p>We implement industry-standard security measures (SSL encryption, secure payment gateways) to protect your personal data. However, no online transmission is 100% secure.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request corrections or deletions</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="mt-2">To exercise your rights, contact us at <a href="mailto:saakshamkindra@gmail.com" className="text-brand-teal hover:underline">saakshamkindra@gmail.com</a>.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
              <p>Our website is not intended for children under 13. We do not knowingly collect data from minors.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We'll notify you of significant changes via email or website notice.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, contact us at:</p>
              <div className="mt-2 pl-6">
                <p>📧 Email: <a href="mailto:saakshamkindra@gmail.com" className="text-brand-teal hover:underline">saakshamkindra@gmail.com</a></p>
                <p>📍 Address: Aligarh</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
