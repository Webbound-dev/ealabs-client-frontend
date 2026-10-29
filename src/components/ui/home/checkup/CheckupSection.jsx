import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { searchDataAtom } from "../../../../store/SearchStore";
import CheckupCard from "./CheckupCard";
import { getAllTestPackages } from "../../../../api/apis/packagecategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";



const CheckupSection = ({ title, matchdata }) => {
    const navigate = useNavigate();
    const [searchData] = useAtom(searchDataAtom);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["testPackages"],
        queryFn: getAllTestPackages,
    });

const checkups = useMemo(() => {
    return (data || []).filter(item => item.enable === true);
}, [data]);

    const filteredCheckups = useMemo(() => {
        if (!searchData || searchData.trim() === "") return checkups;

        const query = searchData.toLowerCase();
        const matched = checkups.filter(
            (item) => item.name.toLowerCase() === query
        );

        return matched.length > 0 ? matched : checkups;
    }, [checkups, searchData]);

 useEffect(() => {
    if (!searchData || searchData.trim() === "") {
        matchdata(false);
        return;
    }

    const isMatched = checkups.some(
        (item) => item.name.toLowerCase() === searchData.toLowerCase()
    );

    matchdata(isMatched);
}, [searchData, checkups, matchdata]);


 const createSlug = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

const handleCardClick = (name) => {
    navigate(`/packagetestdetail/${createSlug(name)}`);
};




    if (isLoading) return <p className="text-center text-indigo-700">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load data</p>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h2 className="text-lg md:text-xl lg:text-3xl font-bold mb-5 lg:mb-10 text-indigo-900 flex justify-center">
                {title}
            </h2>

            <Swiper
                className="h-auto! pb-12!"
                slidesPerView={2}
                spaceBetween={16}
                pagination={{
                    clickable: true,
                    dynamicBullets: false
                }}
                modules={[Pagination]}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
            >
                {filteredCheckups.length > 0 ? (
                    filteredCheckups.map((checkup) => (
                        <SwiperSlide
                            key={checkup._id}
                            className="h-auto! flex pb-0!"
                        >
                            <motion.div
                                className="lg:pb-15 mb-6 h-full w-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <CheckupCard
                                    imageUrl={`${import.meta.env.VITE_BACK_URL}${checkup.image}`}
                                    title={checkup.name}
                                    Price={`₹${checkup.price}`}
                                    onClick={() => handleCardClick(checkup.name)}
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p className="text-center text-gray-600 w-full">
                        No test packages found.
                    </p>
                )}
            </Swiper>

        </div>
    );
};

export default CheckupSection;