import {Route, Routes} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import EditProfile from "./pages/auth/EditProfile";
import ProfileType from "./pages/auth/ProfileType";
import RegisterDonor from "./pages/auth/RegisterDonor";
import RegisterLocal from "./pages/auth/RegisterReceiver";
import BrowseOrganizations from "./pages/listing/BrowseOrganizations";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import {getAuth, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";

function App() {

    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        signInWithEmailLink(auth, email, window.location.href)
            .then(() => {
                window.localStorage.removeItem('emailForSignIn');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/browse" element={<BrowseOrganizations/>}/>
                    <Route path="/register" element={<ProfileType/>}/>
                    <Route path="/register/business" element={<RegisterDonor/>}/>
                    <Route path="/register/local" element={<RegisterLocal/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/dashboard' element={<EditProfile/>}/>
                    <Route path='/test' element={<test/>}/>
                    <Route path='/organizations/:id' element={<Profile/>}/>
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
