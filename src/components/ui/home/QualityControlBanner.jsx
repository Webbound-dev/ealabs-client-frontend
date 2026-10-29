import { motion } from "framer-motion";

export default function QualityControlBanner() {
  return (
    <motion.div
      className="bg-[linear-gradient(to_right,#86efac_70%,white_100%)] py-11 mb-6 sm:mx-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="md:text-3xl text-2xl lg:text-4xl font-extrabold sm:text-center container mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-red-600">3-Level Quality Control</span>
        <span className="text-indigo-900"> on Every Batch.</span>
      </h2>
    </motion.div>
  );
}
