import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import image from "../../../assets/img/India Map (2).png";


const locations = [
  {
    id: "ahmedabad",
    name: "Ahmedabad (Head Office)",
    doctorName: "",
    address:
      "108, Westface, Opp. Indian Overseas Bank, Thaltej-Hebatpur Road, Thaltej, Ahmedabad, Gujarat - 380059",
    phones: "9062-200-200,9099045247,9998805452,9998809545",
    emails: "endoallergy@gmail.com, endoallergy@yahoo.com",
    coords: { top: "49%", left: "14.5%" },
  },
  {
    id: "ajmer",
    name: "Ajmer",
    doctorName: "Akhil Agarwal",
    address:
      "Behind Hotel L N Courtyard, Lohagal Road, Laxmi Nein",
    phones: "9351717243",
    emails: "endocrineallergylaboratory@gmail.com",
    coords: { top: "36%", left: "21.5%" },
  },
  {
    id: "amreli",
    name: "Amreli",
    doctorName: "Anil Adatia",
    address:
      "Manekpara Main Road, Swaminarayan Temple Road, Opp. Life Line Corner",
    phones: "9426255201",
    emails: "endocrineamreli@gmail.com",
    coords: { top: "53%", left: "9.5%" },
  },
  {
    id: "aurangabad",
    name: "Aurangabad",
    doctorName: "Janardan Chopade",
    address:
      "Plot No. 23, Jyotinagar, Opp. SBI Bank, Dashmesh Nagar, Chhatrapati Sambhajinagar",
    phones: "9975389697",
    emails: "snendocrineaurangabad@gmail.com",
    coords: { top: "59%", left: "24%" },
  },
  {
    id: "bhilwara",
    name: "Bhilwara",
    doctorName: "Akhil Agarwal",
    address:
      "R C Vyas Colony, Opp. Private Bus Stand, Krishna Hospital Road, Near Bank of Maharashtra",
    phones: "9351717243, 9509366079",
    emails: "endocrinelaboratoriesbhilwara@gmail.com",
    coords: { top: "40%", left: "22%" },
  },
  {
    id: "bhopal",
    name: "Bhopal",
    doctorName: "Jitendra Sharma",
    address:
      "40, MIG Old MLA Quarters, Jawahar Chowk, TT Nagar",
    phones: "9301125170",
    emails: "endolab_bpl@yahoo.com",
    coords: { top: "47%", left: "31%" },
  },
  {
    id: "gwalior",
    name: "Gwalior",
    doctorName: "Deepak Gupta",
    address:
      "Behind Ram Mandir, Phalka Bazar, Lashkar",
    phones: "9301574871, 9301125171",
    emails: "saikripa_gwl@yahoo.com",
    coords: { top: "38%", left: "34%" },
  },
  {
    id: "indore",
    name: "Indore",
    doctorName: "Dinesh Soni",
    address:
      "35-1, Kuber Palace, SBI ATM, Jaora Compound, Opp. M. Y. Hospital",
    phones: "9827437123, 9329703020",
    emails: "endocrine_indore@yahoo.com",
    coords: { top: "50%", left: "26%" },
  },
  {
    id: "jaipur",
    name: "Jaipur",
    doctorName: "Girdharilal Agarwal",
    address:
      "A-62, Subhashnagar Shopping Center, Subhashnagar",
    phones: "9829058385",
    emails: "shyamdiagnosticjpr@yahoo.com",
    coords: { top: "36%", left: "26%" },
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    doctorName: "Dr. Khusveersingh Bhati",
    address:
      "G-79, Near Agrasen Park, Sector G, Shastrinagar",
    phones: "8949197825, 9680350296",
    emails: "endocrine1992jodhpur@gmail.com",
    coords: { top: "37%", left: "16.2%" },
  },
  {
    id: "kota",
    name: "Kota",
    doctorName: "Neelu Taneja",
    address:
      "Suwala Kachori Wale ke upar, DAV School Road, Talwandi",
    phones: "9252956477, 9079203751",
    emails: "endo_sachin@yahoo.com",
    coords: { top: "41.5%", left: "26.8%" },
  },
  {
    id: "vadodara",
    name: "Vadodara",
    doctorName: "Sahil Motiwala",
    address:
      "J-3, Manav Mandir Society, Opp. Panigate Water Tank, Waghodia Road",
    phones: "9879538400",
    emails: "ealabvadodara@gmail.com",
    coords: { top: "49%", left: "20%" },
  },
];


const Icon = ({ path, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const locationPath =
  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";
const phonePath =
  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
const emailPath =
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const doctorPath =
  "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";


export default function OurNetworks() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const contactCardRef = useRef(null);

  const handleLocationClick = (loc) => {
    setSelectedLocation(loc);
    setClickedLocation(loc.id);

    // Scroll to contact card on mobile with focus
    if (window.innerWidth < 768 && contactCardRef.current) {
      setTimeout(() => {
        contactCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        // Add focus effect
        contactCardRef.current.style.transform = 'scale(1.02)';
        setTimeout(() => {
          contactCardRef.current.style.transform = 'scale(1)';
        }, 300);
      }, 100);
    }

    // Hide name after 3 seconds on mobile
    setTimeout(() => {
      setClickedLocation(null);
    }, 3000);
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-indigo-900">Our Networks</h2>
          <p className="mt-2 lg:text-lg md:text-md text-sm text-gray-600">
            Our single goal: fast, accurate, affordable diagnostics for every
            patient.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center justify-center">
          <motion.div
            ref={contactCardRef}
            className="w-full md:w-1/2 lg:w-1/3 bg-white/50 border border-purple-300 rounded-2xl p-8 shadow-lg backdrop-blur-sm transition-all duration-300"

          >
            <h3 className="lg:text-2xl md:text-xl text-lg font-bold text-indigo-900 mb-6">
              {selectedLocation.name}
            </h3>
            <ul className="space-y-5">
              {/* Address */}
              <li className="flex items-center gap-4">
                <Icon
                  path={locationPath}
                  className="h-6 w-6 text-red-500 shrink-0"
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedLocation.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-indigo-600 text-sm md:text-md lg:text-base"
                >
                  {selectedLocation.address}
                </a>
              </li>
              {selectedLocation?.doctorName && (
                <li className="flex items-center gap-4">
                  <Icon
                    path={doctorPath}
                    className="h-6 w-6 text-red-500 shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-md lg:text-base">
                    {selectedLocation.doctorName}
                  </span>
                </li>
              )}

              {/* Phone Numbers */}
              <li className="flex items-center gap-4">
                <Icon
                  path={phonePath}
                  className="h-6 w-6 text-red-500 shrink-0 mt-1"
                />
                <div className="flex flex-col">
                  {selectedLocation.phones.split(",").map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.trim()}`}
                      className="text-gray-700 hover:text-indigo-600 text-sm md:text-md lg:text-base"
                    >
                      {phone.trim()}
                    </a>
                  ))}
                </div>
              </li>

              {/* Emails */}
              <li className="flex items-center gap-4">
                <Icon
                  path={emailPath}
                  className="h-6 w-6 text-red-500 shrink-0 mt-1"
                />
                <div className="flex flex-col w-full">
                  {selectedLocation.emails.split(",").map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email.trim()}`}
                      className="text-gray-700 hover:text-indigo-600 text-sm md:text-md lg:text-base break-all"
                    >
                      {email.trim()}
                    </a>
                  ))}
                </div>
              </li>

            </ul>


          </motion.div>

          <div className="w-full md:w-1/2 lg:w-1.5/4 relative">
            <img
              src={image}
              alt="Map of our networks across India"
              className="w-full h-auto rounded-lg"
            />
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleLocationClick(loc)}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                style={{ top: loc.coords.top, left: loc.coords.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group ${selectedLocation.id === loc.id ? "scale-125" : "scale-100"
                  } hover:scale-110`}
                aria-label={`Show details for ${loc.name}`}
              >
                <Icon
                  path={locationPath}
                  className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 transition-colors duration-200 ${selectedLocation.id === loc.id
                    ? "text-green-600"
                    : "text-red-500 cursor-pointer "
                    }`}
                />
                {/* Name tooltip - shows on hover (desktop) or click (mobile) */}
                <span
  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs font-semibold text-white bg-indigo-900 rounded whitespace-nowrap transition-opacity duration-200
    opacity-0
    md:group-hover:opacity-100
    ${hoveredLocation === loc.id ? "opacity-100" : ""}
    ${clickedLocation === loc.id ? "opacity-0" : ""} 
    md:block
    hidden
  `}
>
  {loc.name}
</span>

              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}