
import React from 'react';
import Layout from '@/components/layout/Layout';

const OurStoryPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Our Story</h1>
        
        <div className="mb-16">
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <img 
              src="/logo.jpg" 
              alt="Heritage of Kannauj" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-serif font-bold mb-2">The Heritage of Kannauj</h2>
                <p className="text-white/80">A centuries-old tradition of exquisite perfumery</p>
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-6">
            The town of Kannauj, nestled in the heart of India, has been renowned for its perfumery traditions since ancient times. Often referred to as the "Perfume Capital of India," Kannauj has preserved the ancient art of traditional attar making that dates back to the Mughal era.
          </p>
          
          <p className="text-lg mb-6">
            Our journey begins in this historic town, where our ancestors practiced the meticulous craft of extracting essences from flowers, herbs, and spices using the traditional "deg-bhapka" distillation method—a technique that has remained virtually unchanged for centuries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-serif font-bold mb-4">Our Family Legacy</h2>
            <p className="text-muted-foreground mb-6">
              For four generations, our family has been part of Kannauj's illustrious perfumery tradition. What began as a small artisanal workshop has evolved into Aromas of Kannauj, while still honoring the time-tested techniques and wisdom passed down through generations.
            </p>
            <p className="text-muted-foreground mb-6">
              Each family member has contributed their unique perspective to our craft, adding layers of innovation while maintaining respect for tradition. Our grandfather's exceptional ability to identify complex scent notes, our father's innovation in distillation techniques, and our generation's focus on sustainable sourcing—all have shaped what Aromas of Kannauj represents today.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden order-1 md:order-2">
            <img 
              src="https://www.popxo.com/_next/image/?url=https%3A%2F%2Fwp.popxo.com%2Fwp-content%2Fuploads%2F2024%2F11%2F08131728%2Findian-perfume-brands--768x586.png&w=828&q=75" 
              alt="Traditional Attar Making" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="bg-secondary/30 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">The Art of Attar Making</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-3">Traditional Distillation</h3>
              <p className="text-sm text-muted-foreground">
                We use the traditional "deg-bhapka" method, where floral material is placed in a copper still (deg) and gently steam-distilled. The vapors travel through a bamboo pipe into a receiver (bhapka) containing sandalwood oil, which captures the aromatic compounds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-3">Natural Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                We source the finest flowers, herbs, spices, and woods from sustainable farms across India. Each ingredient is carefully selected at its peak for the most vibrant aromatic profile and distilled within hours of harvesting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-3">Aging Process</h3>
              <p className="text-sm text-muted-foreground">
                After distillation, our attars undergo a meticulous aging process in camel skin bottles, allowing the fragrances to mature and develop their full complexity and depth, resulting in rich, multi-layered scent profiles.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Bridging Tradition and Modernity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://oudarabiadubai.com/cdn/shop/files/380714785_212040368373578_3136724095941561871_n.png?v=1696018274&width=720" 
                alt="Modern Perfumery" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="font-medium mb-2">Contemporary Innovations</h3>
              <p className="text-sm text-muted-foreground">
                While we honor traditional methods, we've also embraced modern techniques to enhance the stability, longevity, and projection of our fragrances. Our laboratory combines the wisdom of ancient craftsmen with contemporary scientific understanding.
              </p>
            </div>
            <div>
              <img 
                src="https://rukminim2.flixcart.com/image/640/558/xif0q/attar/j/j/q/brand-100-original-club-de-nuit-9-9ml-great-fragrance-long-original-imagh57hhaz6wqd4.jpeg?q=60&crop=false" 
                alt="Sustainable Practices" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="font-medium mb-2">Sustainable Commitment</h3>
              <p className="text-sm text-muted-foreground">
                We've introduced sustainable practices throughout our production process—from supporting organic farming communities to using recyclable packaging and implementing water conservation in our distillation process.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6">Global Reach, Local Heart</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Today, Aromas of Kannauj brings the exquisite fragrance heritage of India to a global audience. While our attars and perfumes can be found across continents, our heart remains in Kannauj, where each creation begins its journey.
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            We take pride in sharing not just our products but the rich cultural history behind them—creating a bridge between ancient wisdom and contemporary appreciation for fine fragrances.
          </p>
        </div>
        
        <div className="bg-primary/10 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Our Promise</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Every fragrance from Aromas of Kannauj carries our commitment to quality, authenticity, and sustainable craftsmanship. We invite you to experience the timeless artistry of Indian perfumery through our carefully curated collections.
          </p>
          <a href="/shop" className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors">
            Explore Our Collections
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default OurStoryPage;
