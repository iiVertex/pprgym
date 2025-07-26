import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-midnight/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="w-10 h-10 mr-3 rounded-full bg-white p-1 flex items-center justify-center">
                <img 
                  src="/attached_assets/image_1753502846687.png" 
                  alt="PPR Gym Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-2xl font-inter font-bold text-electric-blue">
                PPR GYM
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection("home")} className="text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                About
              </button>
              <button onClick={() => scrollToSection("coaches")} className="text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Coaches
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Testimonials
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Contact
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-electric-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-midnight/95 border-t border-gray-800">
              <button onClick={() => scrollToSection("home")} className="block w-full text-left px-3 py-2 text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left px-3 py-2 text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                About
              </button>
              <button onClick={() => scrollToSection("coaches")} className="block w-full text-left px-3 py-2 text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Coaches
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left px-3 py-2 text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Testimonials
              </button>
              <button onClick={() => scrollToSection("contact")} className="block w-full text-left px-3 py-2 text-white hover:text-electric-blue transition-colors duration-300 font-semibold">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
