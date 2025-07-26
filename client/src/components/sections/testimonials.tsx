import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Layla K.",
    memberSince: "Member since 2023",
    rating: 5,
    text: "PPR Gym's Pull Push Run approach completely changed my fitness journey. The coaches pushed me outside my comfort zone and I achieved results I never thought possible!"
  },
  {
    name: "Omar A.",
    memberSince: "Member since 2022", 
    rating: 5,
    text: "The HIIT classes at PPR are intense but incredibly effective. Coach Ahmed's energy is contagious and the valet parking makes it so convenient to never miss a session."
  },
  {
    name: "Sara M.",
    memberSince: "Member since 2024",
    rating: 5,
    text: "Located perfectly at Al Rayyan Plaza, PPR Gym has the best trainers in Qatar. Coach Francois helped me build strength I never knew I had. Progress truly happens outside your comfort zone!"
  }
];

export default function Testimonials() {
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
    <section id="testimonials" className="py-20 bg-gradient-to-r from-electric-blue/20 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            SUCCESS <span className="text-electric-blue">STORIES</span>
          </h2>
          <p className="text-xl text-gray-300 font-montserrat">
            Real transformations from real people
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
            >
              <Card className="bg-midnight/80 shadow-xl border-gray-700 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-electric-blue">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-200 font-montserrat text-lg leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.memberSince}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
