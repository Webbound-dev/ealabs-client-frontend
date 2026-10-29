import { useEffect } from 'react';
import SEO from '../components/SEO';


const RefundPolicy = () => {
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
     <SEO pageKey="RefundCancellation" />
      <div className="min-h-screen bg-white text-gray-900 font-sans leading-relaxed py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4 text-center">
              Refund & Cancellation Policy
            </h1>
            <div className="text-sm text-gray-500 space-y-1 text-center">
              <p><strong>Effective Date:</strong> {effectiveDate}</p>
              <p><strong>Website:</strong> {website}</p>
            </div>
          </header>

          {/* Content Sections */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">1. Cancellation Policy</h2>
              <p className="text-gray-700">
                You may cancel a scheduled service up to 24 hours before the appointment.
                Cancellations after this window may not be eligible for refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">2. Refunds</h2>
              <p className="text-gray-700 mb-2">Refunds will be processed if:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>You cancel within the eligible time</li>
                <li>A service is unavailable or rescheduled by us</li>
                <li>Payment was made in error or duplicate</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Refunds are initiated within <strong>5–7 business days</strong> via the original payment method.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-black mb-3">3. Contact for Refunds/Cancellations</h2>
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

export default RefundPolicy;