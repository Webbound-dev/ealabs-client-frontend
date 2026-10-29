import { useEffect } from 'react';
import SEO from '../components/SEO';

const ShippingPolicy = () => {
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
      <SEO pageKey="ShippingPolicy" />
      <div className="min-h-screen bg-white text-gray-900 font-sans leading-relaxed py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4 text-center">
              Shipping Policy
            </h1>
            <div className="text-sm text-gray-500 space-y-1 text-center">
              <p><strong>Effective Date:</strong> {effectiveDate}</p>
              <p><strong>Website:</strong> {website}</p>
            </div>
          </header>

          {/* Content Section */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">No Shipping Required</h2>
              <p className="text-gray-700">
                Our services are non-tangible and location-based or digital. We do not ship any physical goods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-3">Service Fulfilment</h2>
              <p className="text-gray-700">
                Upon payment, service confirmation will be shared via SMS/email. Services are delivered as per appointment or on-site.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-black mb-3">Questions?</h2>
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

export default ShippingPolicy;