import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Messaging from './Messaging';

const HouseDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}house/house/${id}`, {
                    withCredentials: true,
                });
                setHouse(data.house);
            } catch (error) {
                console.error('Error fetching house:', error);
            }
        };

        fetchHouse();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            {house ? (
                <div className="bg-white shadow-md rounded-lg p-4">
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
            ) : (
                <p>Loading...</p>
            )}
            <Messaging houseId={id} />
        </div>
    );
};

export default HouseDetails;