import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RenterDashboard = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}house/house-listings`, {
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
            <h1 className="text-3xl font-bold mb-4">House Listings</h1>
            {houses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {houses.map((house) => (
                        <Link key={house.id} to={`/house/${house.id}`} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-semibold mb-2">{house.title}</h2>
                            <p className="text-gray-700 mb-2">{house.description}</p>
                            <p className="text-gray-700 mb-2">{house.location}</p>
                            <p className="text-gray-700 mb-2">{house.price}</p>
                            <p className="text-gray-700 mb-2">Available From: {new Date(house.availableFrom).toLocaleDateString()}</p>
                            <div className="flex flex-wrap mb-2">
                                {house.imageUrls.map((imageUrl) => (
                                    <img key={imageUrl} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt={house.title} className="w-32 h-32 object-cover m-1 rounded" />
                                ))}
                            </div>
                            <div className="mb-2">
                                {house.videoUrl && <video src={`${process.env.REACT_APP_API_URL}${house.videoUrl}`} controls className="w-full rounded" />}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p>No house listings available</p>
                </div>
            )}
        </div>
    );
    };

export default RenterDashboard;