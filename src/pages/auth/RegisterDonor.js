import classes from './Login.module.css'
import Card from '../../components/ui/Card'
import cards from '../../components/ui/Card.module.css'
import {registerWithEmailAndPassword, signInWithGoogle,} from "../../firebase";
import {useState} from "react";
import {Link} from "react-router-dom";
import logo from '../../components/assets/google-logo.png'

function RegisterDonor() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [sent, setSent] = useState(false);

    function register(e) {
        e.preventDefault();

        registerWithEmailAndPassword(username, email, password, "donor").then();
    }

    return (
        <div>
            {sent ? <div className="alert alert-info alert-dismissible" role="alert">
                Please check your email for the
                verification link.
                <button type="button" className="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"></button>
            </div> : null}
            <Card id={cards["center"]}>
                <h2><b>Register Account</b></h2>
                <form className={classes.form} onSubmit={register}>
                    <div className={classes.control}>
                        <label htmlFor='username' id='username'/>
                        <input
                            type='text'
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            id='username'/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email' id='email'/>
                        <input
                            type='email'
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            id='email'/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password' id='password'/>
                        <input
                            type='password'
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            id='password'/>
                    </div>
                    <div className={classes.actions}>
                        <button className="btn btn-primary" id="liveAlertBtn" onClick={() => setSent(true)}>Create
                            Account
                        </button>
                    </div>
                    <hr className="solid"/>
                    <div style={{marginTop: '2rem'}}>
                        <button className={classes.google} onClick={signInWithGoogle}>
                            <img src={logo}
                                 alt="google icon" style={{width: "20px", height: "20px"}}/>
                            <span> Continue with Google</span>
                        </button>
                    </div>
                    <div style={{marginTop: '2.5rem'}}>
                        Already have an account? <Link to="/login">Login</Link> now.
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default RegisterDonor;