import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting PPR Gym. We'll get back to you soon!",
      });
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer id="contact" className="bg-midnight border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.h3 
              variants={itemVariants}
              className="font-bebas text-3xl font-bold text-electric-blue mb-6"
            >
              GET IN TOUCH
            </motion.h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-electric-blue"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-electric-blue"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-electric-blue"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Textarea
                  rows={4}
                  placeholder="Tell us about your fitness goals"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-electric-blue resize-none"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="bg-electric-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {contactMutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </motion.div>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h4 className="font-bebas text-2xl font-bold text-white mb-4">CONTACT INFO</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <MapPin className="text-electric-blue mr-3 h-5 w-5" />
                  123 Fitness Street, Gym City, GC 12345
                </p>
                <p className="flex items-center">
                  <Phone className="text-electric-blue mr-3 h-5 w-5" />
                  (555) 123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="text-electric-blue mr-3 h-5 w-5" />
                  info@pprgym.com
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-bebas text-2xl font-bold text-white mb-4">FOLLOW US</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors text-2xl">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors text-2xl">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors text-2xl">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors text-2xl">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-bebas text-2xl font-bold text-white mb-4">GYM HOURS</h4>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
                <p>Saturday: 6:00 AM - 10:00 PM</p>
                <p>Sunday: 7:00 AM - 9:00 PM</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">&copy; 2024 PPR Gym. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">Membership</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
