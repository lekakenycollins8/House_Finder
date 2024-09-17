import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RenterDashboard = () => {
    const [houses, setHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHouses = async (search = '', minPrice = '', maxPrice = '') => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}house/house-listings`, {
                params: {
                    search,
                    minPrice: minPrice || undefined,
                    maxPrice: maxPrice || undefined,
                },
                withCredentials: true,
            });
            setHouses(data.houses);
        } catch (error) {
            console.error('Error fetching houses:', error);
            setError('An error occurred when loading house listings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHouses();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        fetchHouses(searchTerm, minPrice, maxPrice);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">House Listings</h1>

            {/** Search form */}
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title, location, description or price"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {/** Price range search */}
                <div className="flex space-x-4 mt-2">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">Search
                </button>
            </form>

            {/* Show loading spinner */}

            {loading ? (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="text-center">
                    <p>{error}</p>
                </div>
            ) : houses.length > 0 ? (
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