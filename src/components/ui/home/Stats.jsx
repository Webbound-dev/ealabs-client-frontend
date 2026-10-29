import React from "react";
import { motion } from "framer-motion";

const Stats = () => (
  <section className="bg-[#203270] py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-10 text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-white">
          EA Labs - Setting the Standard in Diagnostics.
        </h2>
        <p className="text-white lg:text-lg md:text-md text-sm">
          Delivering excellence through accuracy, speed, and care because every
          result matters.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { number: "10,00,000+", label: "Allergy samples tested", color: "from-teal-100 to-teal-200 text-teal-800" },
          { number: "16,000+", label: "Tests Processed Daily", color: "from-blue-100 to-blue-200 text-blue-800" },
          { number: "50+", label: "Cities Covered", color: "from-purple-100 to-purple-200 text-purple-800" },
          { number: "98.5%+", label: "On-Time Report Delivery", color: "from-pink-100 to-pink-200 text-pink-800" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-linear-to-r ${stat.color} p-4 lg:p-6 rounded-xl flex flex-col items-start justify-center shadow-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-2xl font-bold md:text-[25px] lg:text-3xl">{stat.number}</p>
            <p className="mt-2 text-sm lg:text-lg font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
