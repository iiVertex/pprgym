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
            className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-electric-blue"
          >
            UNLEASH YOUR POTENTIAL
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 font-montserrat"
            >
              At PPR Gym, we believe that true transformation comes from the perfect combination of power, performance, and results. Our elite coaching staff brings decades of experience in strength training, conditioning, and athletic performance to help you achieve goals you never thought possible.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed font-montserrat"
            >
              We're not just a gym – we're a community of dedicated athletes, trainers, and fitness enthusiasts who push each other to be better every single day. Join us and discover what your body and mind are truly capable of achieving.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
