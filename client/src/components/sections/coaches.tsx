import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const coaches = [
  {
    name: "COACH FRANCOIS",
    role: "Personal Trainer & Strength Specialist",
    description: "Expert in strength training and muscle building. Specializes in creating personalized workout plans to help you achieve your fitness goals safely and effectively.",
    image: "/attached_assets/image_1753502424184.png"
  },
  {
    name: "COACH AHMED DIMASSI",
    role: "HIIT & Conditioning Specialist", 
    description: "High-intensity interval training expert focused on fat loss and cardiovascular conditioning. Brings energy and motivation to every training session.",
    image: "/attached_assets/image_1753502440067.png"
  },
  {
    name: "COACH MOHAMED",
    role: "Functional Training & Athletics",
    description: "Specializes in functional movement patterns and athletic performance. Helps clients build real-world strength and improve overall movement quality.",
    image: "/attached_assets/image_1753502456727.png"
  },
  {
    name: "COACH AHMED ALAZAB",
    role: "Personal Training & Nutrition",
    description: "Combines expertise in personal training with nutritional guidance. Focuses on holistic approach to fitness including proper form and lifestyle optimization.",
    image: "/attached_assets/image_1753502473834.png"
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
          <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
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
                    className="w-full h-80 object-cover object-center transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-inter text-2xl font-bold text-electric-blue mb-2">
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
