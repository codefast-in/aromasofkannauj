
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Designer",
      image: "/placeholder.svg",
      quote: "The Royal Oud perfume has become my signature scent. I receive compliments every time I wear it, and the longevity is impressive.",
      rating: 5
    },
    {
      name: "Arjun Mehta",
      role: "Entrepreneur",
      image: "/placeholder.svg",
      quote: "I've tried many luxury perfumes, but Raahi Parfums offers something truly unique. The attention to detail in their fragrances is remarkable.",
      rating: 5
    },
    {
      name: "Aisha Khan",
      role: "Interior Designer",
      image: "/placeholder.svg",
      quote: "Rose Elixir is everything I wanted in a floral fragrance. It's elegant without being overwhelming, and lasts throughout the day.",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why our customers love Raahi Parfums and the difference our fragrances make in their lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="mb-4 italic">"{testimonial.quote}"</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
