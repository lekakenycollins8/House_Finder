import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Signup = () => {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}auth/google/callback`,
            "_self"
        );
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Sign up</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="/images/signup.jpeg" alt="signup" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Create Account</h2>
                    <input className={styles.input} type="text" placeholder="Username" />
                    <input className={styles.input} type="text" placeholder="Email" />
                    <input className={styles.input} type="password" placeholder="Password" />
                    <button className={styles.btn}>Sign up</button>
                    <p className={styles.text}>OR</p>
                    <button className={styles.google_btn} onClick={googleAuth}>
                        <img src='./images/google.png' alt='Google' />
                        <span>Sign up with Google</span>
                    </button>
                    <p className={styles.text}>
                        Already have an account? <Link to="/login">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
    }

export default Signup;