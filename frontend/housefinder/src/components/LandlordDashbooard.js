import { useState, useEffect } from 'react';
import axios from 'axios';

const LandlordDashboard = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/house/my-houses`, {
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
                houses.map((house) => (
                    <div key={house.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{house.title}</h2>
                        <p className="text-gray-700 mb-2">{house.description}</p>
                        <p className="text-gray-700 mb-2">{house.location}</p>
                        <p className="text-gray-700 mb-2">{house.price}</p>
                        <p className="text-gray-700 mb-2">Available From: {new Date(house.availableFrom).toLocaleDateString()}</p>
                        <div className="flex flex-wrap mb-2">
                            {house.imageUrls.map((imageUrl) => (
                                <img key={imageUrl} src={imageUrl} alt={house.title} className="w-32 h-32 object-cover m-1 rounded" />
                            ))}
                        </div>
                        <div className="mb-2">
                            {house.videoUrl && <video src={house.videoUrl} controls className="w-full rounded" />}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center">
                    <p className="text-gray-700 mb-4">No houses available.</p>
                    <button 
                        onClick={() => window.location.href = '/create-house'} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create New House Listing
                    </button>
                </div>
            )}
        </div>
    );
};

export default LandlordDashboard;