import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { getImages } from "../../../api/apis/sliderimageapi";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef(null);

  // 👉 swipe refs
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const { data: images = [], isLoading, isError } = useQuery({
    queryKey: ["slides"],
    queryFn: getImages,
  });

  const backendURL = import.meta.env.VITE_BACK_URL;

  const desktopSlides = images.flatMap(
    (img) =>
      img.desktopScreenMedia
        ?.filter((m) => m.isVisible)
        .map((m) => backendURL + m.url) || []
  );

  const mobileSlides = images.flatMap(
    (img) =>
      img.mobileScreenMedia
        ?.filter((m) => m.isVisible)
        .map((m) => backendURL + m.url) || []
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentSlides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % currentSlides.length);
    }, 3000);
  };

  useEffect(() => {
    if (currentSlides.length === 0) return;
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [currentSlides.length]);

  const nextSlide = () => {
    if (currentSlides.length === 0) return;
    setCurrent((prev) => (prev + 1) % currentSlides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    if (currentSlides.length === 0) return;
    setCurrent((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
    startAutoSlide();
  };

  // 👉 swipe handlers
  const handleStart = (x) => {
    startXRef.current = x;
    isDraggingRef.current = true;
  };

  const handleEnd = (x) => {
    if (!isDraggingRef.current) return;

    const diff = startXRef.current - x;

    if (diff > 50) nextSlide();     // swipe left
    if (diff < -50) prevSlide();    // swipe right

    isDraggingRef.current = false;
  };

  if (isLoading)
    return (
      <div className="h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="h-[500px] flex items-center justify-center text-red-500">
        Error loading slides
      </div>
    );

  return (
    <section
      className="relative w-full overflow-hidden h-[400px] md:h-auto md:aspect-32/12 lg:aspect-3940/1400"
    >
      <div
        className="relative w-full mx-auto h-full overflow-hidden"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      >
        {currentSlides.length > 0 &&
          currentSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out select-none"
              draggable={false}
              style={{
                transform: `translateX(${(index - current) * 100}%)`,
              }}
            />
          ))}

        {currentSlides.length > 1 && (
          <Button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full z-10"
          >
            <Icon path="M15 19l-7-7 7-7" className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}

        {currentSlides.length > 1 && (
          <Button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full z-10"
          >
            <Icon path="M9 5l7 7-7 7" className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}

        {currentSlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {currentSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index);
                  startAutoSlide();
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
