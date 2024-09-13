import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const RoleSelection = ({ setRole }) => { // Receive setRole as a prop
    const navigate = useNavigate();

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
                    navigate('/role'); // Navigate to home page for renter
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
