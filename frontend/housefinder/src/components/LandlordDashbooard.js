import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Messaging from './Messaging';

const LandlordDashboard = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}house/my-houses`, {
                    withCredentials: true,
                });
                setHouses(data.houses);
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Houses</h1>
            {houses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {houses.map((house) => (
                        <div key={house.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-semibold mb-2">{house.title}</h2>
                            <p className="text-gray-700 mb-2">{house.description}</p>
                            <p className="text-gray-700 mb-2">{house.location}</p>
                            <p className="text-gray-700 mb-2">{house.price}</p>
                            <p className="text-gray-700 mb-2">Available From: {new Date(house.availableFrom).toLocaleDateString()}</p>
                            <div className="flex flex-wrap mb-2">
                                {house.imageUrls.map((imageUrl) => (
                                    <img key={imageUrl} src={new URL(imageUrl, process.env.REACT_APP_API_URL).href} alt={house.title} className="w-32 h-32 object-cover m-1 rounded" />
                                ))}
                            </div>
                            <div className="mb-2">
                                {house.videoUrl && <video src={new URL(house.videoUrl, process.env.REACT_APP_API_URL).href} controls className="w-full rounded" />}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <Link 
                        to="/create-house"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create New House Listing
                    </Link>
                </div>
            )}
            {/* Always show the "Create New House Listing" button here */}
            {houses.length > 0 && (
                <div className="text-center mt-4">
                    <Link 
                        to="/create-house"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create New House Listing
                    </Link>
                </div>
            )}
            <Messaging />
        </div>
    );
};

export default LandlordDashboard;