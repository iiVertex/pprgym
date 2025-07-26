import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const coaches = [
  {
    name: "COACH MARCUS",
    role: "Head Trainer & Strength Specialist",
    description: "15+ years of experience in powerlifting and strength training. Former competitive athlete with expertise in transforming beginners into elite performers.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500"
  },
  {
    name: "COACH SARAH",
    role: "Conditioning & Performance Specialist",
    description: "Olympic-level conditioning coach specializing in functional movement and athletic performance. Expert in HIIT and metabolic training protocols.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500"
  },
  {
    name: "COACH DAVID",
    role: "Nutrition & Recovery Specialist",
    description: "Certified nutritionist and recovery expert. Designs personalized meal plans and recovery protocols to maximize your training results and overall wellness.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500"
  },
  {
    name: "COACH EMMA",
    role: "Movement & Mobility Specialist",
    description: "Former professional dancer turned movement specialist. Focuses on mobility, flexibility, and corrective exercise to prevent injury and optimize performance.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500"
  }
];

export default function Coaches() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="coaches" className="py-20 bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            MEET THE <span className="text-electric-blue">COACHES</span>
          </h2>
          <p className="text-xl text-gray-400 font-montserrat">
            Elite professionals dedicated to your success
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              variants={cardVariants}
              className="group"
            >
              <Card className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border-gray-700 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-80 object-cover object-center filter grayscale transition-all duration-300 group-hover:filter-none group-hover:sepia group-hover:hue-rotate-180 group-hover:saturate-300 group-hover:brightness-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bebas text-2xl font-bold text-electric-blue mb-2">
                    {coach.name}
                  </h3>
                  <p className="text-gray-400 font-semibold mb-3">
                    {coach.role}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {coach.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
