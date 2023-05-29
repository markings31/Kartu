import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where,} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDk29oeKmFLolfcCibclfMV3Jyw_OsvNQc",
    authDomain: "theappforcshs.firebaseapp.com",
    databaseURL: "https://theappforcshs-default-rtdb.firebaseio.com",
    projectId: "theappforcshs",
    storageBucket: "theappforcshs.appspot.com",
    messagingSenderId: "1078518134464",
    appId: "1:1078518134464:web:994bbf1b1f19760bfddf25",
    measurementId: "G-07S7YLX7DZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user ? user.uid : "None"));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (username, email, password, companyType) => {
    try {
        const actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user ? user.uid : "None"), {
            uid: user.uid,
            username,
            authProvider: "local",
            email,
            companyType,
        });

        if (companyType === "donor") {
            writeDonor({
                address: "",
                contactEmail: "",
                banner: "",
                description: "",
                donationTypes: [],
                logo: "",
                adminEmail: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
                name: "",
                website: ""
            });
        } else if (companyType === "receiver") {
            await writeReceiver({
                address: "",
                contactEmail: "",
                banner: "",
                description: "",
                donationTypes: [],
                logo: "",
                adminEmail: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
                name: "",
                website: ""
            });
        }

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                logout();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

/**
 * writeCompany creates a new database entry for a company.<br>
 * If the company already exists, it overwrites it
 * @param {object} donorObject Object that holds all internal data for a company
 * @returns {promise} a promise of what it'll do after completing the operation. You probably don't ever need to use this, but I'll add it bc idk how react works
 * @example writeCompany({html: "<p>We'll give you free food!</p>",
 *      image: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/10/mcdonalds-exterior.jpg?quality=82&strip=1",
 *      name: "The testing company"}, "newtestcompany"); // Note: Don't actually type out this object. The names of the properties will be the same as what we decide for the standard company document
 * **/
const writeDonor = async (donorObject) => {
    const user = auth.currentUser
    try {
        await setDoc(doc(db, "donors", user ? user.uid : 'None'), {
            uid: user.uid,
            donorInfo: donorObject,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const writeReceiver = async (receiverObject) => {
    const user = auth.currentUser
    try {
        await setDoc(doc(db, "receivers", user ? user.uid : 'None'), {
            uid: user.uid,
            receiverInfo: receiverObject,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

/**
 * getDonorInfo gets information about a donor
 * @param {string} donorName name of company to get information about
 * @returns {promise} A promise of what it'll do after getting the data
 * @example
 * getCompanyInformation("TestingCompany").then(doc => {
 *     const data = doc.data();
 *     console.log("name is "+ data.name + ", image is at " + data.image + ", and their HTML code is " + data.html);
 * });
 **/
function getDonorInfo() {
    const myPost = db.collection("donors").doc(auth.currentUser.uid);
    return myPost.get();
}

/**
 * getOrganizationInformation gets information about a company
 * @param {string} receiverName name of organization to get information about
 * @returns {promise} A promise of what it'll do after getting the data
 * @example
 * getOrganizationInformation("Science-O").then(doc => {
 *     const data = doc.data();
 *     console.log("name is "+ data.name + ", image is at " + data.image + ", and their HTML code is " + data.html);
 * });
 **/
function getReceiverInfo(receiverName) {
    const myPost = db.collection("receivers").doc(receiverName);
    return myPost.get();
}

/**
 * getAllOrganizations gets all organizations' information as an array of objects
 * @returns {promise} a promise of what it'll do after getting the data
 * @example
 * getAllOrganizations().then(doc => {
 *     console.log(doc);
 * })
 * **/
async function getAllDonors() {
    try {
        const dbRef = collection(db, 'donors');
        const snapshot = await getDocs(dbRef);
        return snapshot.docs.map(doc => doc.data());
    } catch (err) {
        console.error(err);
    }
}

/**
 * getAllCompanies gets all companies' information as an array of objects
 * @returns {promise} a promise of what it'll do after getting the data
 * @example
 * getAllCompanies().then(doc => {
 *     console.log(doc);
 * })
 * **/
async function getAllReceivers() {
    const dbRef = collection(db, 'receivers');
    const snapshot = await getDocs(dbRef);
    return snapshot.docs.map(doc => doc.data());
}


const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth).then();
};

export {
    auth,
    db,
    googleProvider,
    signInWithEmailAndPassword,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    writeDonor,
    getDonorInfo,
    getAllDonors,
    logout,
};