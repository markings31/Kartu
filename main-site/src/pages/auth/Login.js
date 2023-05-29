import classes from './Login.module.css'
import Card from '../../components/ui/Card'
import cards from '../../components/ui/Card.module.css'
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "../../firebase";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import logo from '../../components/assets/google-logo.png'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    // TODO: Handle incorrect login attempts.
    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then();

        if (user)
            navigate('/browse')
    }

    useEffect(() => {
        setTimeout(() => {
            if (loading)
                return;

            if (user)
                navigate("/browse");
        }, 1000);
    }, [user, loading])

    return <div>
        <Card id={cards["center"]} style={{height: "22rem"}}>
            <h2><b>Login</b></h2>
            <form className={classes.form} onSubmit={login}>
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
                    <button>Login</button>
                </div>
                <hr className="solid"/>
                <div style={{marginTop: '2rem'}}>
                    <button className={classes.google} onClick={signInWithGoogle}>
                        <img src={logo}
                             alt="google icon" style={{width: "20px", height: "20px"}}/>
                        <span> Continue with Google</span>
                    </button>
                </div>
                <div style={{marginTop: '2.5rem'}}>Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </form>
        </Card>
    </div>
}

export default Login;