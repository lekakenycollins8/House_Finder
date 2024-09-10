import styles from './styles.module.css';

const Home = (userDetails) => {
    const user = userDetails.user;
    const logout = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}auth/logout`,
            "_self"
        );
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Home</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="/images/profile.jpeg" alt="profile" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Profile</h2>
                    <img className={styles.profile_img} src={user.picture} alt="profile" />
                    <input className={styles.input} defaultValue={user.name} type="text" placeholder="Username" />
                    <input className={styles.input} defaultValue={user.email} type="text" placeholder="Email" />
                    <button className={styles.btn} onClick={logout} >Logout</button>
                </div>
            </div>
        </div>
    );
    }

export default Home;