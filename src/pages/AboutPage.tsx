import About from "@/components/home/About";
import Layout from "@/components/layout/Layout";
import React from "react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <About />
        <p className="text-lg mb-8">
          Welcome to our perfume shop! We are passionate about creating the
          finest fragrances that evoke emotions and memories. Our journey began
          with a love for scents and a desire to share that passion with the
          world.
        </p>
        <p className="text-lg mb-8">
          Our team of skilled perfumers meticulously crafts each fragrance using
          the highest quality ingredients. We believe that a great perfume
          should not only smell good but also tell a story and create a lasting
          impression.
        </p>
        <p className="text-lg mb-8">
          We take pride in our commitment to sustainability and ethical
          sourcing. Our ingredients are carefully selected to ensure that they
          are not only luxurious but also environmentally friendly.
        </p>
        <p className="text-lg mb-8">
          Thank you for choosing us as your fragrance destination. We hope you
          enjoy exploring our collection as much as we enjoyed creating it for
          you.
        </p>
        <p className="text-lg mb-8">
          If you have any questions or need assistance, please feel free to
          reach out to our customer service team. We are here to help you find
          your perfect scent.
        </p>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-8">
            To create unforgettable fragrances that inspire and uplift, while
            maintaining a commitment to sustainability and ethical practices.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-8">
            To be a leading fragrance brand known for our innovative scents and
            dedication to quality and sustainability.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <p className="text-lg mb-8">
            Quality, Innovation, Sustainability, and Customer Satisfaction.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
