import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminGallery } from "../api/apis/gallery";
import Image from "../components/ui/common/Image";
import SEO from "../components/SEO";


const IMAGES_PER_PAGE = 8;

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: getAdminGallery,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const images =
    data?.data?.images?.filter((img) => img.isVisible === true) || [];

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const paginatedImages = images.slice(startIndex, endIndex);

  const openLightbox = (indexInPage) => {
    const globalIndex = startIndex + indexInPage;
    setCurrentIndex(globalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading gallery...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load gallery
      </div>
    );
  }

  return (
    <>
      <SEO pageKey="Gallery" />
      <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <header className="bg-white">
          <div className="py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
              Laboratory Photo Gallery
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mt-2">
              Explore our advanced laboratory facilities and working environment
            </p>
          </div>
        </header>

        <main className="py-12">
          {paginatedImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedImages.map((img, index) => (
                  <div
                    key={img._id || index}
                    onClick={() => openLightbox(index)}
                    className="aspect-square overflow-hidden rounded-lg bg-white cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={`${import.meta.env.VITE_BACK_URL}${img.url}`}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-6 py-2 rounded-full border text-sm font-medium transition
        ${currentPage === 1
                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer  border-red-500 text-red-500"
                      }`}
                  >
                    Prev
                  </button>

                  <span className="text-sm font-medium text-gray-700">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-6 py-2 rounded-full border text-sm font-medium transition
        ${currentPage === totalPages
                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer border-red-500 text-red-500 hover:bg-red-50"
                      }`}
                  >
                    Next
                  </button>
                </div>
              )}

            </>
          ) : (
            <div className="text-center text-gray-500 py-20">
              No images available
            </div>
          )}
        </main>

        {lightboxOpen && images.length > 0 && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="cursor-pointer absolute top-5 right-6 text-white text-4xl"
            >
              &times;
            </button>

            <button
              onClick={showPrev}
              className="cursor-pointer absolute left-4 sm:left-10 text-white text-5xl"
            >
              ‹
            </button>

            <Image
              src={`${import.meta.env.VITE_BACK_URL}${images[currentIndex]?.url}`}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={showNext}
              className="cursor-pointer absolute right-4 sm:right-10 text-white text-5xl"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </>
  );
}
