import React from 'react';

const Features = () => {
  return (
    <section className="relative bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center pb-12 md:pb-16">
            <h2 className="text-3xl md:text-4xl font-bold">House Finder helps you find your dream home</h2>
            <p className="mt-4 text-lg">Our platform offers a comprehensive solution for both home seekers and landlords. Explore our features below:</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Search Listings</h3>
              <p>Find houses based on your preferences. Use filters to narrow down your search and find the perfect home that meets your needs.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Contact Landlords</h3>
              <p>Get in touch with landlords directly. Our messaging system ensures secure and efficient communication between you and the property owners.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Manage Listings</h3>
              <p>Landlords can manage their house listings easily. Update property details, availability, and pricing with our user-friendly interface.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;