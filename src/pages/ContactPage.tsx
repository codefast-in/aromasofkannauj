import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import React from "react";

const ContactPage = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-8">
          We would love to hear from you! If you have any questions, comments,
          or feedback, please feel free to reach out to us using the form below
          or through our social media channels.
        </p>
        
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              required></textarea>
          </div>
          <Button
            type="submit"
            className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;
