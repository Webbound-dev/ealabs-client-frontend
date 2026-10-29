import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllAboutUs } from "../api/apis/aboutUs";
import aboutusimageurl from "../assets/img/aboutus.jpg";
import Image from "../components/ui/common/Image";
import AshwinCPatel from "../assets/img/AshwinCPatel.jpg";
import KaushalPatel from "../assets/img/KaushalPatel.jpg";
import NiharikaKPatel from "../assets/img/NiharikaKPatel.jpg";
import SEO from "../components/SEO";


const AboutUs = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["aboutus"],
        queryFn: getAllAboutUs,
    });

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (Array.isArray(data)) {
            const sortedData = [...data].sort(
                (a, b) => Number(a.title) - Number(b.title)
            );

            setSteps(sortedData);
        }
    }, [data]);

    useEffect(() => {
        if (isVideoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVideoOpen]);

    const teamMembers = [
        {
            id: 1,
            name: "Mr. Ashwin C. Patel",
            role: "MSc. Biochemistry (USA) | Director",
            image: AshwinCPatel,
            title: "The mind behind EA Laboratories",
            description: `Mr. Ashwin C. Patel founded Endocrine and Allergy Laboratory Pvt. Ltd. in 1991 after returning to India from the United States, where he completed his Master’s in Biochemistry and spent over 17 years working with established laboratories such as Quest and GlaxoSmithKline. From the outset, his goal was to bring global diagnostic standards to India and build a laboratory where accuracy, consistency, and ethics were never compromised.
Over the years, he introduced practices that strengthened diagnostic reliability in the country, including inter-laboratory reference testing and advanced hormonal testing through Radioimmunoassay. He was also among the first to introduce in-vitro allergy testing in India, enabling comprehensive allergy detection through blood samples alone. Today, EA Laboratories operates through a nationwide network of centres, with its NABL-accredited central laboratory in Ahmedabad. His vision continues to guide the organisation—making advanced, dependable diagnostic testing accessible while keeping patient trust at the centre of every report.`},
        {
            id: 2,
            name: "Dr. Kaushal Patel",
            role: "MD Pathology | Managing Director",
            image: KaushalPatel,
            title: "Leading the next phase of diagnostic precision",
            description: `Dr. Kaushal Patel leads the pathology division at EA Laboratories with a strong focus on clinical accuracy, technology, and relevance. He completed his MBBS from Smt. NHL Municipal Medical College, Ahmedabad, followed by an MD in Pathology from Bharati Vidyapeeth Medical College, Pune. As Managing Director, he plays an active role in advancing the laboratory’s diagnostic capabilities while remaining closely involved in reporting and clinical decision support. 
            His work centres on cytopathology and immunofluorescence assay reporting, along with the expansion of molecular testing and microbiology services. Under his leadership, EA Laboratories has introduced advanced technologies such as the Siemens Aptio automation track, ICP-MS for metal detection, FTIR for kidney stone analysis, and IgG-based food intolerance testing. Since joining the laboratory in 2019, he has also helped establish franchise operations across Gujarat and Rajasthan, contributing to the lab’s growing national presence.`,
        },
        {
            id: 3,
            name: "Dr. Niharika K. Patel",
            role: "MBBS, MBA (Hospital & Health Systems) | Head Consultant",
            image: NiharikaKPatel,
            title: "The systems that keep quality intact",
            description: `Dr. Niharika K. Patel is part of the core team responsible for maintaining quality and oprational discipline at EA Laboratories. With an MBBS degree, an MBA in Hospital and Health Systems from BITS Pilani, and specialised training in NABL standards, she brings a structued, compliance-driven approach to clinical diagnostics.
            Based in Ahmedabad, she serves as a Consultant at Endocrine and Allergy Laboratory Pvt. Ltd., where she oversees quality assurance and day-to-day administrative operations. Her role ensures that diagnostic accuracy is supported by well-defined systems, allowing the laboratory to function smoothly while consistently meeting regulatory and clinical expectations.`,
        },
    ];

    return (
        <>
            <SEO pageKey="AboutUs" />
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="bg-white pt-10 md:py-20">
                        <div className="">

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 md-mb-15 text-center tracking-tight">
                                About Us
                            </h1>

                            <div className="grid md:grid-cols-2 items-center gap-5 mb-20">
                                <div className="order-2 md:order-1">
                                    <strong className="lg:text-2xl text-xl">About EA Laboratories</strong>
                                    <p className="text-gray-700 text-sm md:text-md lg:text-lg leading-relaxed">
                                        EA Laboratories is a trusted diagnostic centre known for accuracy, innovation, and patient-first care.
                                        With over 35 years of expertise, we specialise in advanced allergy testing and preventive health diagnostics. More than 10 lakh allergy samples tested, a milestone built on consistency and trust.
                                        Our NABL-accredited tests ensure reliable results for doctors, patients, and healthcare partners.
                                        At EA Labs, we believe health isn’t guesswork, it’s clarity, backed by science.
                                    </p>
                                </div>

                                <div className="flex justify-center order-1 md:order-2">
                                    <Image
                                        src={aboutusimageurl}
                                        alt="Our Team"
                                        className="w-[400px] lg:h-[300px] rounded-2xl"
                                    />
                                </div>
                            </div>



                            <div className="rounded-3xl mb-6">
                                <h2 className="lg:text-3xl md:text-2xl text-xl font-bold mb-10 text-center">
                                    Our Mission & Our Vision
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

                                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 flex flex-col h-full">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 flex items-center">
                                            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Our Mission
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-[16px] lg:text-lg leading-relaxed grow">
                                            To make diagnostics more than just data — to make it a path to better living.
                                            At EA Laboratories, we’re driven to deliver precise, reliable, and accessible testing that empowers doctors,
                                            reassures patients, and strengthens the trust between care and cure.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 flex flex-col h-full">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-600 mb-4 flex items-center">
                                            <svg className="w-6 h-6 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.504A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.504M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Our Vision
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-[16px] lg:text-lg leading-relaxed grow">
                                            To be India’s most trusted name in diagnostics — recognised for accuracy, compassion, and the pursuit of continuous scientific advancement.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-center mb-16">
                        <div className="relative max-w-xl w-full">
                            {/* Soft gradient background */}
                            <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-blue-50 to-indigo-50 rounded-3xl blur-2xl opacity-60"></div>

                            {/* Main card */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-blue-100 shadow-xl">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4 shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                                        Discover Our Journey
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        Watch how we've been transforming healthcare
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="flex justify-center mb-6">
                                    <button
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={() => setIsVideoOpen(true)}

                                        className="cursor-pointer group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

                                        {/* Play icon with background pulse */}
                                        <div className="relative flex items-center justify-center">
                                            <div className={`absolute w-10 h-10 bg-white/30 rounded-full transition-all duration-300 ${isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}></div>
                                            <svg
                                                className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:scale-110 relative z-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>

                                        <span className="text-xs md:text-base lg:text-lg relative z-10 font-semibold">Watch Our Story</span>

                                        {/* Arrow */}
                                        <svg
                                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="relative py-16 overflow-hidden">
                        <div className="relative z-10">
                            {/* Section Header */}
                            <div className="text-center mb-12 md:mb-16 lg:mb-20">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                                    Meet Our
                                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#AA1626] to-[#d91d33] mt-2">
                                        Medical Professionals
                                    </span>
                                </h2>
                                <p className="text-sm md:text-md lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    Our dedicated team of highly qualified medical professionals committed to providing
                                    exceptional diagnostic services with precision and care
                                </p>
                            </div>

                            {/* Team Members - Alternating Layout */}
                            <div className="space-y-1 md:space-y-24">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                            } gap-8 md:gap-12 lg:gap-16 items-start`}
                                    >
                                        {/* Image Section with Name Below */}
                                        <div className="w-full md:w-1/3">
                                            <div className="group">
                                                {/* Image Container */}
                                                <div className="relative w-full max-w-[400px] aspect-4/3 overflow-hidden transition-all duration-50">
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>


                                                {/* Name and Role Below Image */}
                                                <div className="mt-6 md:mt-8 text-center lg:text-left">
                                                    <h3 className="text-md md:text-lg lg:text-3xl font-bold text-gray-900 mb-2">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-sm md:text-md lg:text-lg font-semibold text-[#AA1626]">
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Section */}
                                        <div className="w-full">
                                            <div className="relative z-10">
                                                <p className="text-md md:text-lg lg:text-xl font-bold text-gray-900 mb-4">
                                                    {member.title}
                                                </p>

                                                {member.description.split('\n').map((line, idx) => (
                                                    <p key={idx} className="text-sm md:text-md lg:text-lg text-gray-700 leading-relaxed mb-4">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>


                    {isLoading ? (
                        <div className="flex justify-center items-center py-20 text-gray-500">
                            Loading timeline...
                        </div>
                    ) : isError ? (
                        <div className="flex justify-center items-center py-20 text-red-500">
                            Failed to load timeline data.
                        </div>
                    ) : !steps || steps.length === 0 ? (
                        <div className="flex justify-center items-center py-20 text-gray-500">
                            No About Us data found.
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 md:px-6 lg:px-25 xl:px-40 px-4">
                                <div className="w-full md:w-1/2">
                                    <AnimatePresence mode="wait">
                                        {steps[activeStep]?.image && (
                                            (() => {
                                                const step = steps[activeStep];
                                                let type = step.mediaType;
                                                if (!type) {
                                                    const ext = step.image.split('.').pop().toLowerCase();
                                                    type = ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image';
                                                }

                                                if (type === 'video') {
                                                    return (
                                                        <motion.video
                                                            key={step.image}
                                                            src={`${import.meta.env.VITE_BACK_URL}/${step.image}`}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="w-full h-80 sm:w-[500px] object-contain bg-white"
                                                            initial={{ opacity: 0, x: -40 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 40 }}
                                                            transition={{ duration: 0.4 }}
                                                            loading="lazy"
                                                        />


                                                    );
                                                } else {
                                                    return (
                                                        <motion.img
                                                            key={step.image}
                                                            src={`${import.meta.env.VITE_BACK_URL}/${step.image}`}
                                                            alt={step.title}
                                                            className="w-auto h-auto rounded-xl shadow-md"
                                                            initial={{ opacity: 0, x: -40 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 40 }}
                                                            transition={{ duration: 0.4 }}
                                                            loading="lazy"
                                                        />
                                                    );
                                                }
                                            })()
                                        )}
                                    </AnimatePresence>
                                </div>


                                <div className="w-full md:w-1/2">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={steps[activeStep]?._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center md:text-left">
                                                {steps[activeStep]?.title}
                                            </h2>

                                            <p className="wrap-break-word whitespace-pre-line text-center md:text-left leading-relaxed lg:text-lg md:text-md text-sm">
                                                {steps[activeStep]?.description}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="relative mt-12 md:mt-8 mb-15">
                                <div className="overflow-x-auto scrollbar-hide px-2">
                                    <div className="relative min-w-max py-12">

                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>

                                        <div className="flex gap-16 md:justify-between relative z-10 px-4">
                                            {steps.map((step, index) => (
                                                <div
                                                    key={step._id}
                                                    className="flex flex-col items-center cursor-pointer group relative shrink-0"
                                                    onClick={() => setActiveStep(index)}
                                                >
                                                    {index % 2 !== 0 && (
                                                        <span
                                                            className={`text-sm md:text-md lg:text-lg font-medium absolute -top-10 md:-top-8 text-center whitespace-nowrap ${activeStep === index
                                                                ? "text-blue-600"
                                                                : "text-gray-500 group-hover:text-blue-300"
                                                                }`}
                                                        >
                                                            {step.title}
                                                        </span>
                                                    )}

                                                    <div
                                                        className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${activeStep === index
                                                            ? "bg-blue-200 border-blue-600 scale-110"
                                                            : "bg-white border-gray-400 group-hover:border-blue-300"
                                                            }`}
                                                    ></div>

                                                    {index % 2 === 0 && (
                                                        <span
                                                            className={`text-sm md:text-md lg:text-lg font-medium absolute top-10 md:top-8 text-center whitespace-nowrap ${activeStep === index
                                                                ? "text-blue-600"
                                                                : "text-gray-500 group-hover:text-blue-300"
                                                                }`}
                                                        >
                                                            {step.title}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
                <AnimatePresence>
                    {isVideoOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/95 p-4"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-2 right-2 md:top-4 md:right-4 z-10000 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full p-2 md:p-2.5 transition-all duration-200 shadow-2xl"
                                aria-label="Close video"
                            >
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >


                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/BdIWBXdBito?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                                    title="EA Laboratories Story"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};

export default AboutUs;
