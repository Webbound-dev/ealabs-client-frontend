import { useRef, useState, useEffect } from "react";
import CTA from "../components/ui/home/CAT";
import Certifications from "../components/ui/home/Certifications";
import CheckupSection from "../components/ui/home/checkup/CheckupSection";
import Features from "../components/ui/home/Features";
import HealthPackages from "../components/ui/home/HealthPackages";
import Hero from "../components/ui/home/Hero";
import OurNetworks from "../components/ui/home/OurNetworks";
import QualityControlBanner from "../components/ui/home/QualityControlBanner";
import Stats from "../components/ui/home/Stats";
import WhyUs from "../components/ui/home/WhyUs";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import FloatingMenu from "../components/FloatingMenu";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";


const Home = () => {
    const [hasHealthMatch, setHasHealthMatch] = useState(false);
    const [hasCheckupMatch, setHasCheckupMatch] = useState(false);

    const location = useRouterLocation();
    const navigate = useNavigate();

    const healthPackagesRef = useRef(null);
    const checkupRef = useRef(null);

    const [showFloating, setShowFloating] = useState(true);

    const scrollToRef = (ref, offset = 100) => {
        if (!ref.current) return;

        const y =
            ref.current.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector("footer");
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const isFooterVisible = footerRect.top < window.innerHeight;
                setShowFloating(!isFooterVisible);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        if (location.state?.scrollToHealthPackages) {
            setTimeout(() => {
                scrollToRef(healthPackagesRef, 120);
            }, 350);

            window.history.replaceState({}, document.title);
        }

        if (location.state?.scrollToCheckupSection) {
            setTimeout(() => {
                scrollToRef(checkupRef, 120);
            }, 350);

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (hasHealthMatch) {
            scrollToRef(healthPackagesRef, 120);
            setHasHealthMatch(false);
        }
    }, [hasHealthMatch]);

    useEffect(() => {
        if (hasCheckupMatch) {
            scrollToRef(checkupRef, 120);
            setHasCheckupMatch(false);
        }
    }, [hasCheckupMatch]);

    const createSlug = (text = "") =>
        text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s()-]/g, "")
            .replace(/\s+/g, "-");


    const handletestdetail = (name) => {
        navigate(`/test-detail/${createSlug(name)}`);
    };

    return (
        <>
        <SEO pageKey="Home" />
            <div className="bg-white">
                {showFloating && (
                    <>
                        <FloatingMenu />
                        <WhatsAppButton />
                    </>
                )}

                <Hero />
                <Certifications />
                <Features />

                <div ref={healthPackagesRef}>
                    <HealthPackages
                        handletestdetail={handletestdetail}
                        matchdata={setHasHealthMatch}
                    />
                </div>

                <QualityControlBanner />

                <div ref={checkupRef}>
                    <CheckupSection
                        title="Routine health checkups Packages"
                        matchdata={setHasCheckupMatch}
                    />
                </div>

                <Stats />
                <OurNetworks />
                <WhyUs />
                <CTA />
            </div>
        </>
    );
};

export default Home;
