
import React from 'react';
import { Link } from 'react-router-dom';
import { GENDER_CATEGORIES } from '@/config/constants';

const Categories: React.FC = () => {
  const categories = [
    {
      name: GENDER_CATEGORIES[0],
      image: "/placeholder.svg",
      description: "Bold and sophisticated scents for the modern gentleman."
    },
    {
      name: GENDER_CATEGORIES[1],
      image: "/placeholder.svg",
      description: "Elegant and captivating fragrances for the contemporary woman."
    },
    {
      name: GENDER_CATEGORIES[2],
      image: "/placeholder.svg",
      description: "Versatile scents designed to transcend traditional boundaries."
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Explore Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect fragrance for every occasion and personality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/shop?category=${category.name}`}
              className="group overflow-hidden rounded-lg relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                  <p className="mb-4 opacity-90">{category.description}</p>
                  <span className="inline-block border-b border-white pb-1 transition-all group-hover:pl-2">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
