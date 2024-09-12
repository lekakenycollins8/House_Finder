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
        <div>
            <h1>My Houses</h1>
            {houses.map((house) => (
                <div key={house.id}>
                    <h2>{house.title}</h2>
                    <p>{house.description}</p>
                    <p>{house.location}</p>
                    <p>{house.price}</p>
                    <p>Available From: {new Date(house.availableFrom).toLocaleDateString()}</p>
                    <div>
                        {house.imageUrls.map((imageUrl) => (
                            <img key={imageUrl} src={imageUrl} alt={house.title} />
                        ))}
                    </div>
                    <div>
                        {house.videoUrl && <video src={house.videoUrl} controls />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandlordDashboard;