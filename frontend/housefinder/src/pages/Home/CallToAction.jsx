import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your dream home?</h2>
          <p className="text-xl mb-8">Sign up now and start your journey with House Finder.</p>
          <Link className="btn text-blue-600 bg-white hover:bg-gray-100 rounded-full px-6 py-3" to="/signup">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;