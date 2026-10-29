import { useEffect } from 'react';
import SEO from '../components/SEO';


const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const lastUpdated = "02-08-2025";
  const email = "endoallergy@gmail.com";
  const phone = "9099045241";
  const website = "www.ealabs.co.in";
  const owner = "Endocrine and Allergy Laboratory Pvt. Ltd.";

  return (
    <>
      <SEO pageKey="PrivacyPolicy" />

      <div className="min-h-screen bg-white text-gray-900 font-sans leading-relaxed py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4 text-center">
              Privacy Policy
            </h1>
            <div className="text-sm text-gray-500 space-y-1 text-center">
              <p><strong>Effective Date:</strong> {lastUpdated}</p>
              <p><strong>Website:</strong> {website}</p>
              <p><strong>Owner:</strong> {owner}</p>
            </div>
          </header>

          {/* Policy Content */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">1. Introduction</h2>
              <p className="text-gray-700">
                We value your privacy. This policy explains how {website} collects, uses, stores, and protects your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">2. Information We Collect</h2>
              <p className="text-gray-700 mb-2">We may collect:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Personal details: name, email, phone number, etc.</li>
                <li>Payment-related data (processed via secure third-party gateways like Razorpay)</li>
                <li>Browsing behaviour via cookies and analytics tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">3. Use of Information</h2>
              <p className="text-gray-700 mb-2">Your data is used to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Process payments and deliver services</li>
                <li>Improve user experience</li>
                <li>Send confirmations, updates, or customer support messages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">4. Data Sharing</h2>
              <p className="text-gray-700 mb-2">We do not sell your data. Limited data may be shared with:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Payment processors (e.g., Razorpay)</li>
                <li>Service providers like email or hosting vendors</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">5. Security</h2>
              <p className="text-gray-700">
                We use SSL encryption and secure infrastructure to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">6. User Rights</h2>
              <p className="text-gray-700">
                You may request to access, correct, or delete your personal data by contacting us.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-black mb-3">7. Contact Us</h2>
              <div className="text-gray-700 space-y-1">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
              </div>
            </section>

          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {owner}. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;