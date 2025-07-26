import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-electric-blue"
          >
            UNLEASH YOUR POTENTIAL
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 font-montserrat"
            >
              At PPR Gym, we believe in the power of Pull, Push, Run. Our comprehensive training approach combines strength, conditioning, and cardio to deliver real results. Progress takes place outside of your comfort zone, and our expert coaches are here to guide you through every step of your transformation journey.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed font-montserrat"
            >
              Located at Al Rayyan Plaza, 2nd floor, we offer personalized training, HIIT classes, and comprehensive fitness programs. With valet parking and extended hours, we make it convenient for you to prioritize your health and fitness goals.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
