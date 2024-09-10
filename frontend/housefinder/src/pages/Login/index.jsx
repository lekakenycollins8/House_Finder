import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Login = () => {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}auth/google/callback`,
            "_self"
        );
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Login</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="/images/login.jpeg" alt="Login" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Members Login</h2>
                    <input className={styles.input} type="text" placeholder="Email" />
                    <input className={styles.input} type="password" placeholder="Password" />
                    <button className={styles.btn}>Login</button>
                    <p className={styles.text}>OR</p>
                    <button className={styles.google_btn} onClick={googleAuth}>
                        <img src='./images/google.png' alt='Google' />
                        <span>Sign in with Google</span>
                    </button>
                    <p className={styles.text}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
    }

export default Login;