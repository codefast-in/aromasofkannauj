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
          Immerse yourself in the enchanting world of traditional Indian attars,
          carefully crafted to evoke emotions and sensations. At Aromas of
          Kannauj, we're passionate about preserving the ancient art of
          attar-making, while making these exquisite fragrances accessible to
          everyone.
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
      <div className=" py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg mb-8">
            Kannauj, a small town in Uttar Pradesh, India, has been renowned for
            its perfumery traditions for centuries. Our family has been part of
            this legacy for generations, perfecting the art of blending
            essential oils to create unique and captivating attars. We're proud
            to bring this heritage to the world, through our carefully curated
            collection.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Our Attars</h2>
          <p className="text-lg mb-8">
            Our attars are made from the finest, sustainably sourced essential
            oils, carefully selected for their exceptional quality and aroma.
            Each attar is a masterful blend of traditional and modern
            techniques, ensuring a distinct and alluring fragrance experience.
          </p>
          <p className="text-lg mb-8">
            <span className="text-primary font-bold">
              Natural and Cruelty-Free
            </span>
            <br />
            Our attars are free from synthetic chemicals, artificial fragrances,
            and animal-derived ingredients, making them perfect for those
            seeking natural, cruelty-free products. <br />
            <span className="text-primary font-bold">
              Small Batch Production
            </span>
            <br />
            We produce our attars in small batches to ensure consistency,
            quality, and attention to detail. <br />
            <span className="text-primary font-bold">
              Expertly Crafted
            </span>
            <br />
            Our skilled perfumers carefully craft each attar, using techniques
            passed down through generations.
            <br /> <span className="text-primary font-bold">
              Unique Blends
            </span>
            <br />
            Our attars are expertly blended to create unique, captivating
            fragrances that evoke emotions and memories.
            <br />
            <span className="text-primary font-bold">
              Sustainable Sourcing
            </span>
            <br />
            We prioritize sustainability and ethical practices in sourcing our
            ingredients, ensuring a positive impact on the environment and local
            communities.
          </p>
        </div>
      </div>

      <div className=" py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Explore Our Collections</h2>

          <p className="text-lg mb-8">
            <span className="text-primary font-bold">Classic Attars</span>
            <br />
            Timeless fragrances that evoke the traditional perfumery of Kannauj.
            <br /> <span className="text-primary font-bold">
              Fusion Attars
            </span>
            <br />
            Innovative blends that combine traditional Indian scents with modern
            twists.
            <br />
            <span className="text-primary font-bold">Seasonal Attars</span>
            <br />
            Limited-edition fragrances crafted to capture the essence of each
            season.
            <br />
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Why Choose Aromas of Kannauj?
          </h2>

          <p className="text-lg mb-8">
            <span className="text-primary font-bold">Authenticity</span> <br />
            We're committed to preserving the traditional methods and recipes of
            Kannauj's perfumery heritage. <br />
            <span className="text-primary font-bold">Quality</span> <br />
            We use only the finest, sustainably sourced essential oils to ensure
            exceptional fragrance quality. <br />
            <span className="text-primary font-bold">
              Customer Satisfaction
            </span>
            <br />
            We're dedicated to providing exceptional customer service and
            ensuring your complete satisfaction.
            <br />
          </p>
        </div>
      </div>
      <div className=" py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8">
            Stay updated on new arrivals, promotions, and perfumery tips by
            following us on social media or subscribing to our newsletter.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Shop with Us</h2>
          <p className="text-lg mb-8">
            Browse our collection today and discover the enchanting world of
            Aromas of Kannauj.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
