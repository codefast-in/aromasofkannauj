
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The Art of <span className="text-primary">Fragrance</span>
            </h2>
            
            <p className="text-muted-foreground mb-6">
              At Aromas of Kannauj, we believe that a fragrance is more than just a scent—it's an expression of personality, a trigger for memories, and a statement of style. Our journey began with a passion for creating unique olfactory experiences that resonate with the wearer and those around them.
            </p>
            
            <p className="text-muted-foreground mb-8">
              Each perfume in our collection is crafted with meticulous attention to detail, using only the finest ingredients sourced from around the world. Our master perfumers blend traditional techniques with innovative approaches to create fragrances that are both timeless and contemporary.
            </p>
            
            <Button asChild>
              <Link to="/about">Read Our Story</Link>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://imgs.search.brave.com/4GFreH6CM4SvyCf8qHxjpHC7G1hBnLqEyeZ1_n3-rgk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L0JQ/dW5YOGZGa2Y5aE1h/REtBZXFFU1MtMTA4/MC04MC5qcGc" 
                  alt="Perfume craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
                <img 
                  src="https://imgs.search.brave.com/y-lDgogS2qoVFj1CN0PeguHd7U42u-cSSJoRLj--Vy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZhLzVl/Lzg2L2ZhNWU4NmM5/Y2M2MGY0NDdjNGQx/MWExNTE0YmU4M2Jl/LmpwZw" 
                  alt="Perfume ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
