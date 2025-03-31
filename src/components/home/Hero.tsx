
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import bg from "../../assets/Signature_series.jpg"
const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-royal-purple/90 to-dark-purple">
      <div className="absolute inset-0 bg-[url('https://imgs.search.brave.com/hqQDGso8EDkxZ7NCybZ9aLGwGeBAqRPGPLsak8lGb8M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzkvMjcv/MmRhM2UwMjgtYWEz/My00NWFmLTk4MmYt/NDUwOGQ1Nzc5ZDEw/LmpwZw')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Discover Your <span className="text-gold">Signature</span> Scent
          </h1>
          
          <p className="text-lg mb-8 opacity-90">
            Explore our exclusive collection of luxury perfumes crafted with the finest ingredients. Find the perfect fragrance that tells your unique story.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/shop">Shop Now</Link>
            </Button>
            
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
