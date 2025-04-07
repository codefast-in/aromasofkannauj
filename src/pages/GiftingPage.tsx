
import React from 'react';
import Layout from '@/components/layout/Layout';

const GiftingPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Gift Collections</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://www.adilqadri.com/cdn/shop/files/EMP04dsds231.jpg?v=1728822454&width=700" 
              alt="Luxury Gift Box" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Luxury Gift Sets</h2>
            <p className="text-muted-foreground mb-6">
              Our carefully curated gift sets combine our most popular fragrances with elegant packaging, making them perfect for special occasions. Each gift set is thoughtfully arranged to create a memorable unboxing experience.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're celebrating a birthday, anniversary, or simply want to show someone you care, our luxury gift sets are a perfect choice. Available in various combinations to suit different preferences and budgets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-2xl font-serif font-bold mb-4">Personalized Gifting</h2>
            <p className="text-muted-foreground mb-6">
              Make your gift extra special with our personalization options. Add a custom message, choose specific packaging colors, or create a bespoke fragrance combination that's uniquely tailored to the recipient.
            </p>
            <p className="text-muted-foreground mb-6">
              Our team of gifting experts is available to help you create the perfect personalized present that will be cherished and remembered.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden order-1 md:order-2">
            <img 
              src='https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR77XYgHRIwiiQZslqK348TbM6l9jAYew9Gscle4DND8e49qgowyDqHTJOg3ediSfLrYGcQAg9z-6RFw_GyuwRnEWr_5HLZjmh2GuGQ_jCl-Sn1l98yDOeU&usqp=CAE' 
              alt="Personalized Gifting" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="bg-secondary/30 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Corporate Gifting</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Make an impression with our corporate gifting solutions. Perfect for client appreciation, employee rewards, or special company events. We offer bulk discounts and custom branding options.
          </p>
          <div className="flex justify-center">
            <a href="/bulk-enquiry" className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors">
              Learn More About Corporate Gifting
            </a>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6">Seasonal Gift Collections</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover our limited-edition seasonal collections, specially curated for festivals, holidays, and special occasions throughout the year.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Festive Collection</h3>
              <p className="text-sm text-muted-foreground">Celebrate the joy of festivities with our special edition gift sets.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Wedding Collection</h3>
              <p className="text-sm text-muted-foreground">Elegant fragrances to complement the most special day.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Anniversary Gifts</h3>
              <p className="text-sm text-muted-foreground">Celebrate years of love with our romantic fragrance sets.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Birthday Specials</h3>
              <p className="text-sm text-muted-foreground">Make their day memorable with our birthday gift selection.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-6">Gift Cards</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Can't decide on the perfect gift? Our digital and physical gift cards allow your loved ones to choose their own fragrance experience.
          </p>
          <a href="#" className="inline-block bg-primary/10 text-primary hover:bg-primary/20 px-6 py-3 rounded-md transition-colors">
            Purchase a Gift Card
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default GiftingPage;
