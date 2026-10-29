import { useEffect } from 'react';
import SEO from '../components/SEO';


const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const effectiveDate = "02-08-2025";
  const email = "endoallergy@gmail.com";
  const phone = "9099045241";
  const website = "www.ealabs.co.in";
  const owner = "Endocrine and Allergy Laboratory Pvt. Ltd.";

  return (
    <>
      <SEO pageKey="TermsConditions" />
      <div className="min-h-screen bg-white text-gray-900 font-sans leading-relaxed py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4 text-center">
              Terms & Conditions
            </h1>
            <div className="text-sm text-gray-500 space-y-1 text-center">
              <p><strong>Effective Date:</strong> {effectiveDate}</p>
              <p><strong>Website:</strong> {website}</p>
            </div>
          </header>

          {/* Terms Content */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By using this website or booking our services, you agree to our terms and our privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">2. Services Offered</h2>
              <p className="text-gray-700">
                We provide diagnostic laboratory services. All services are rendered either digitally or at our physical location. No goods are shipped.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">3. Payments</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>All transactions are processed via Razorpay.</li>
                <li>Prices include taxes.</li>
                <li>Payment must be completed before service is confirmed.</li>
                <li>Confirmation is sent via email or SMS.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">4. Intellectual Property</h2>
              <p className="text-gray-700">
                All content on this site is protected and owned by {owner}. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                We are not liable for any indirect or incidental damages arising from use of our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">6. Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India. Disputes shall be subject to courts in Ahmedabad, Gujarat.
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

export default TermsAndConditions;