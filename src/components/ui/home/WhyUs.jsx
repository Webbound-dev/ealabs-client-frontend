import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../Icon';

const QualityIcon = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
const TimeIcon = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
const ConvenienceIcon = "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const PhoneIcon = "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z";

const features = [
  {
    icon: <Icon path={QualityIcon} className="lg:w-15 lg:h-15 md:h-13 md:w-13 h-10 w-10 text-white" />,
    title: 'Quality',
    description: 'Stringent multi-level QC and EQA programs ensure every result is accurate and dependable.',
    gradient: 'from-[#AA1626] to-red-600',
  },
  {
    icon: <Icon path={TimeIcon} className="lg:w-15 lg:h-15 md:h-13 md:w-13 h-10 w-10 text-white" />,
    title: 'On-Time Services',
    description: 'From sample collection to reporting, we’re committed to punctuality.',
    gradient: 'from-[#AA1626] to-red-600',
  },
  {
    icon: <Icon path={ConvenienceIcon} className="lg:w-15 lg:h-15 md:h-13 md:w-13 h-10 w-10 text-white" />,
    title: 'Convenience',
    description: 'Opt for home sample collection or walk into any of our centres.',
    gradient: 'from-[#AA1626] to-red-600',
  },
  {
    icon: <Icon path={PhoneIcon} className="lg:w-15 lg:h-15 md:h-13 md:w-13 h-10 w-10 text-white" />,
    title: 'Expert Assistance',
    description: 'Get clarity beyond the report with on-demand result explanations and doctor consultation (on request).',
    gradient: 'from-[#AA1626] to-red-600',
  },
];

const FeatureCard = ({ icon, title, description, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
    className={`bg-linear-to-br ${gradient} p-8 rounded-2xl flex flex-col items-start text-left text-white shadow-lg h-full`}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="lg:text-xl md:text-lg text-[18px] font-bold mb-2">{title}</h3>
    <p className="text-gray-200 text-sm md:text-[15px]">{description}</p>
  </motion.div>
);

export default function WhyUs() {
  return (
    <div className="bg-linear-to-r from-[#2c2a4a] to-[#3a3768] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-12 max-w-2xl"
        >
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">Why Choose EA Labs?</h2>
          <p className="lg:text-lg md:text-[15px] text-sm text-gray-300">
            EA Labs delivers clinician-ready reports with reliable turnaround times.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </div>
  );
}
