import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './styles.module.css';

const RoleSelection = ({ setRole }) => { // Receive setRole as a prop
    const navigate = useNavigate();

    // Fetch the user's role when the component mounts
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}role/user-role`,
                    { withCredentials: true }
                );
                const { role } = response.data;

                if (role) {
                    setRole(role); // Update the role in the frontend state
                    if (role === 'landlord') {
                        navigate('/my-houses'); // Redirect landlord to their dashboard
                    } else {
                        navigate('/renter-dashboard'); // Redirect renter to their home/dashboard
                    }
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, [navigate, setRole]); // Dependencies: `navigate` and `setRole`

    const handleRoleSelection = async (role) => {
        console.log(`Role selected: ${role}`);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}role/create-role`, // Ensure API URL is correct
                { role },
                { withCredentials: true }
            );

            if (response.status === 200 || response.status === 201) { // Ensure a successful response
                setRole(role); // Update role state in App
                if (role === 'landlord') {
                    navigate('/my-houses'); // Navigate to landlord dashboard after successful role assignment
                } else {
                    navigate('/renter-dashboard'); // Navigate to home page for renter
                }
            } else {
                console.error('Failed to assign role');
            }
        } catch (error) {
            console.error('Error selecting role for this project:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Select Your Role</h1>
            <button onClick={() => handleRoleSelection('landlord')} className={styles.btn}>
                Landlord
            </button>
            <button onClick={() => handleRoleSelection('renter')} className={styles.btn}>
                Renter
            </button>
        </div>
    );
};

export default RoleSelection;
