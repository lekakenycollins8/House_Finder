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
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
          }
        if (video) {
            formData.append('video', video);
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}house/create-house`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/my-houses');   
        } catch (error) {
            console.error('Error creating house listing:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a new listing</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="House Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Enter the title of the house</p>
                    </div>
                    <div>
                        <textarea
                            placeholder="Description of the number of bedrooms, bathrooms, Water availability etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded h-32"
                        />
                        <p className="text-gray-500 text-sm">Provide a detailed description</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Enter the location of the house</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Enter the price of the house</p>
                    </div>
                    <div>
                        <input
                            type="date"
                            placeholder="Available From"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Select the availability date</p>
                    </div>
                    <div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages(e.target.files)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Upload images of the house</p>
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <p className="text-gray-500 text-sm">Upload a video of the house (optional)</p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create Listing
                    </button>

                </form>
            </div>
        </div>
    );
};

export default LandLordListing;