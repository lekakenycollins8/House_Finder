import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelection = async (role) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}auth/role`,
                { role },
                { withCredentials: true }
            );
            navigate('/'); // Navigate to home page after successful role assignment
        } catch (error) {
            console.error('Error selecting role:', error);
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
