import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from './hero.png';

const Hero = () => {
return (
    <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-8 pb-12 md:pt-12 md:pb-20"> {/* Reduced padding-top */}
                <nav className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold">
                        <Link to="/">House Finder</Link>
                    </div>
                    <div className="flex space-x-1">
                        <Link className="btn text-white bg-green-600 hover:bg-green-700 rounded-full px-6 py-3 text-lg" to="/signup">
                            Sign Up
                        </Link>
                        <Link className="btn text-white bg-red-600 hover:bg-red-700 rounded-full px-6 py-3 text-lg" to="/login">
                            Login
                        </Link>
                    </div>
                </nav>
                <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                        Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">House Finder</span>
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl text-gray-600 mb-8">
                            Find your perfect home with ease. Search listings, contact landlords, and manage your house listings all in one place.
                        </p>
                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div>
                                <Link className="btn text-white bg-green-600 hover:bg-green-700 rounded-full w-full mb-4 sm:w-auto sm:mb-0 px-6 py-3 text-lg" to="/signup">
                                    Get Started
                                </Link>
                            </div>
                            <div>
                                <Link className="btn text-white bg-red-600 hover:bg-red-700 rounded-full w-full sm:w-auto sm:ml-4 px-6 py-3 text-lg" to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative flex justify-center mb-8">
                        <div className="flex flex-col justify-center">
                            <img className="mx-auto" src={HeroImage} alt="Hero" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Hero;