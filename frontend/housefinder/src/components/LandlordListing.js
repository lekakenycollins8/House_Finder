import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandLordListing = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('availableFrom', availableFrom);
        images.forEach((image) => {
            formData.append('images', image);
        });
        if (video) {
            formData.append('video', video);
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/house/create-house`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating house listing:', error);
        }
    };

    return (
        <div>
            <h1>Create a new listing</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="House Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Available From"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    required
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                    required
                />
                <input
                    type="file"
                    accept='video/*'
                    onChange={(e) => setVideo(e.target.files[0])}
                    required
                />
                <button type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default LandLordListing;