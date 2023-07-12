import {Link, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, writeDonor} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import LoadingScreen from "../../components/ui/Loader";

function EditProfile() {
    const [user, loadingUser] = useAuthState(auth);
    const [loading, isLoading] = useState(true);
    const [type, setType] = useState("");
    const [data, setData] = useState({});
    const navigate = useNavigate();

    // Donor Info
    const [donorName, setDonorName] = useState("");
    const [donorContactEmail, setDonorContactEmail] = useState("");
    const [donorAdminEmail, setDonorAdminEmail] = useState("");
    const [donorLogo, setDonorLogo] = useState("");
    const [donorBanner, setDonorBanner] = useState("");
    const [donorPhone, setDonorPhone] = useState("");
    const [donorAddress, setDonorAddress] = useState("");
    const [donorCity, setDonorCity] = useState("");
    const [donorState, setDonorState] = useState("");
    const [donorZip, setDonorZip] = useState("");
    const [donorWebsite, setDonorWebsite] = useState("");
    const [donorDescription, setDonorDescription] = useState("");
    const [donationTypes, setDonationTypes] = useState([]);
    const [requirements, setRequirements] = useState("");
    const [noticeTime, setNoticeTime] = useState("");

    // Recipient Info
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhone, setRecipientPhone] = useState("");
    const [recipientLogo, setRecipientLogo] = useState("");
    const [recipientBanner, setRecipientBanner] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [recipientCity, setRecipientCity] = useState("");
    const [recipientState, setRecipientState] = useState("");
    const [recipientZip, setRecipientZip] = useState("");
    const [recipientWebsite, setRecipientWebsite] = useState("");


    const companyType = async () => {
        try {
            const dbRef = doc(db, 'users', user.uid);
            const snapshot = await getDoc(dbRef);
            setType(await snapshot.data()['companyType']);
        } catch (e) {
        }
    }

    const displayPage = type === "donor" ? "donors" : "receivers"

    const companyInfo = async () => {
        try {
            const dbRef = doc(db, displayPage, user.uid);
            const snapshot = await getDoc(dbRef);
            setData(await snapshot.data()[type === "donor" ? 'donorInfo' : 'receiverInfo']);
        } catch (e) {
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (loadingUser)
                return;

            companyType().then();
            companyInfo().then();

            if (Object.keys(data).length !== 0) {
                isLoading(false);
            }
        }, 1000);
    })

    useEffect(() => {
        if (!loading) {
            if (donationTypes.length === 0) {
                donationTypes[0] = data.donationTypes[0] === undefined ? false : data.donationTypes[0];
                donationTypes[1] = data.donationTypes[1] === undefined ? false : data.donationTypes[1];
                donationTypes[2] = data.donationTypes[2] === undefined ? false : data.donationTypes[2];
            }
        }
    }, [loading])

    const donorObject = {
        address: donorAddress === "" || donorAddress === undefined ? data['address'] : donorAddress,
        contactEmail: donorContactEmail === "" || donorContactEmail === undefined ? data['contactEmail'] : donorContactEmail,
        adminEmail: donorAdminEmail === "" || donorAdminEmail === undefined ? data['adminEmail'] : donorAdminEmail,
        banner: donorBanner === "" || donorBanner === undefined ? data['banner'] : donorBanner,
        description: donorDescription === "" || donorDescription === undefined ? data['description'] : donorDescription,
        donationTypes: donationTypes === [] || donationTypes === undefined ? data.donationTypes : donationTypes,
        city: donorCity === "" || donorCity === undefined ? data['city'] : donorCity,
        logo: donorLogo === "" || donorLogo === undefined ? data['logo'] : donorLogo,
        state: donorState === "" || donorState === undefined ? data['state'] : donorState,
        zip: donorZip === "" || donorZip === undefined ? data['zip'] : donorZip,
        phone: donorPhone === "" || donorPhone === undefined ? data['phone'] : donorPhone,
        name: donorName === "" || donorName === undefined ? data['name'] : donorName,
        website: donorWebsite === "" || donorWebsite === undefined ? data['website'] : donorWebsite,
    }

    const updateDonations = (e, index) => {
        const types = donationTypes;
        if (e.target.checked)
            types[index] = e.target.id;
        else types.splice(index, 1);

        setDonationTypes(types);
    };

    // TODO: Create alert function for success + error messages instead of default popup.
    const updateProfile = () => {
        writeDonor(donorObject);

        navigate(`/organizations/${user.uid}`);
    }

    function detailsSection() {
        return (
            <div className="row gutters">
                <div className="col-xl-12">
                    <h5 className="mb-3 text-primary">Company Details</h5>
                </div>
                <div className="form-group col-xl-6">
                    <label htmlFor="fullName">Full Name of Company</label>
                    <input
                        type="text"
                        value={type === "donor" ? donorName : recipientName}
                        onChange={e => type === "donor" ? setDonorName(e.target.value) : setRecipientName(e.target.value)}
                        className="form-control"
                        id="fullName"
                        placeholder={data['name']}/>
                </div>
                <div className="form-group col-xl-6">
                    <label htmlFor="eMail">Contact Email</label>
                    <input
                        type="email"
                        value={type === "donor" ? donorContactEmail : ""}
                        onChange={e => type === "donor" ? setDonorContactEmail(e.target.value) : setRecipientPhone(e.target.value)}
                        className="form-control"
                        id="eMail"
                        placeholder={data['contactEmail']}/>
                </div>
                <div className="form-group col-xl-6 mt-2">
                    <label htmlFor="eMail">Admin Email</label>
                    <input
                        type="email"
                        value={type === "donor" ? donorAdminEmail : ""}
                        onChange={e => type === "donor" ? setDonorAdminEmail(e.target.value) : setRecipientPhone(e.target.value)}
                        className="form-control"
                        id="eMail"
                        placeholder={data['adminEmail']}/>
                </div>
                <div className="form-group col-xl-6 mt-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        value={type === "donor" ? donorPhone : recipientPhone}
                        onChange={e => type === "donor" ? setDonorPhone(e.target.value) : setRecipientPhone(e.target.value)}
                        className="form-control"
                        id="phone"
                        placeholder={data['phone']}/>
                </div>
                <div className="form-group col-xl-6 mt-2">
                    <label htmlFor="website">Website URL</label>
                    <input
                        type="url"
                        value={type === "donor" ? donorWebsite : recipientWebsite}
                        onChange={e => type === "donor" ? setDonorWebsite(e.target.value) : setRecipientWebsite(e.target.value)}
                        className="form-control"
                        id="website"
                        placeholder={data['website']}/>
                </div>
                <div className="form-group col-xl-6 mt-2">
                    <label htmlFor="logo">Company Logo URL</label>
                    <br/>
                    <input
                        type="url"
                        value={type === "donor" ? donorLogo : recipientLogo}
                        className="form-control"
                        onChange={e => type === "donor" ? setDonorLogo(e.target.value) : setRecipientLogo(e.target.value)}
                        placeholder={data['logo']}
                        id="logo"/>
                    <br/>
                </div>
                <div className="form-group col-xl-6 mt-2">
                    <label htmlFor="banner">Company Banner URL</label>
                    <br/>
                    <input
                        type="url"
                        value={type === "donor" ? donorBanner : recipientBanner}
                        className="form-control"
                        onChange={e => type === "donor" ? setDonorBanner(e.target.value) : setRecipientBanner(e.target.value)}
                        placeholder={data['banner']}
                        id="banner"/>
                    <br/>
                </div>
            </div>
        )
            ;
    }

    function donorView() {
        return (
            <form onSubmit={updateProfile}>
                <div className="container">
                    <div className="row gutters">
                        <div className="col-xl-3">
                            <div className="card h-100">
                                <img src={data['logo'] === undefined ? "https://via.placeholder.com/400" : data['logo']}
                                     className="card-img-top" alt="Default Logo"/>
                                <div className="card-body">
                                    <h5 className="card-title">{data['name'] === "" ? "New Company" : data['name']}</h5>
                                    <p className="card-title">About Us...</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-secondary border-0">Donations We
                                            Offer
                                        </li>
                                        <li className="list-group-item border-0">Food</li>
                                        <li className="list-group-item border-0">Cash</li>
                                    </ul>
                                    <p className="user-email">Contact Us:</p>
                                    <Link to="#" className="card-link">Email</Link>
                                    <Link to="#" className="card-link">Website</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-9">
                            <div className="card h-100">
                                <div className="card-body">
                                    {detailsSection()}
                                    <div className="row gutters">
                                        <div className="col-xl-12">
                                            <h6 className="mt-3 mb-2 text-primary">Company Address</h6>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="Street">Street</label>
                                                <input
                                                    type="name"
                                                    value={donorAddress}
                                                    onChange={e => setDonorAddress(e.target.value)}
                                                    className="form-control"
                                                    id="Street"
                                                    placeholder={data['address']}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="ciTy">City</label>
                                                <input
                                                    type="name"
                                                    value={donorCity}
                                                    onChange={e => setDonorCity(e.target.value)}
                                                    className="form-control"
                                                    id="ciTy"
                                                    placeholder={data['city']}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="sTate">State</label>
                                                <input
                                                    type="text"
                                                    value={donorState}
                                                    onChange={e => setDonorState(e.target.value)}
                                                    className="form-control"
                                                    id="sTate"
                                                    placeholder={data['state']}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="zIp">Zip Code</label>
                                                <input
                                                    type="text"
                                                    value={donorZip}
                                                    onChange={e => setDonorZip(e.target.value)}
                                                    className="form-control"
                                                    id="zIp"
                                                    placeholder={data['zip']}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12">
                                            <h5 className="mt-3 mb-2 text-primary">Donation Information</h5>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="Street" className="mb-1">Types of Donations:</label>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={donationTypes[0]}
                                                        defaultChecked={data.donationTypes !== undefined ? data.donationTypes[0] : false}
                                                        onChange={e => updateDonations(e, 0)}
                                                        id="Human Hours"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        Human Hours
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={donationTypes[1]}
                                                        defaultChecked={data.donationTypes !== undefined ? data.donationTypes[1] : false}
                                                        onChange={e => updateDonations(e, 1)}
                                                        id="Food"/>
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                        Food
                                                    </label>
                                                </div>
                                                {/* TODO: Set donation type by adding checked fields to array. */}
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={donationTypes[2]}
                                                        defaultChecked={data.donationTypes !== undefined ? data.donationTypes[2] : false}
                                                        onChange={e => updateDonations(e, 2)}
                                                        id="Money"/>
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                        Money
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="ciTy">Description</label>
                                                <textarea
                                                    rows='2'
                                                    value={donorDescription}
                                                    onChange={e => setDonorDescription(e.target.value)}
                                                    className="form-control"
                                                    id="floatingInputValue"
                                                    placeholder={data['description']}/>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="sTate">Requirements</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingInputValue"
                                                    placeholder="Must be a local 501(c)3"/>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="zIp">Notice Time Required</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingInputValue"
                                                    placeholder="3 Weeks"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12">
                                            <div className="text-right">
                                                <button onClick={() => navigate('/')}
                                                        className="btn btn-secondary">Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary m-lg-3">Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    function receiverView() {
        return (
            <form onSubmit={updateProfile}>
                <div className="container">
                    <div className="row gutters">
                        <div className="col-xl-3">
                            <div className="card h-100">
                                <img src="https://via.placeholder.com/400" className="card-img-top"
                                     alt="Maxwell Admin"/>
                                <div className="card-body">
                                    <h5 className="card-title">{data['name'] === "" ? "New Company" : data['name']}</h5>
                                    <p className="card-title">About Us...</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-secondary border-0">Donations We
                                            Offer
                                        </li>
                                        <li className="list-group-item border-0">Food</li>
                                        <li className="list-group-item border-0">Cash</li>
                                    </ul>
                                    <p className="user-email">Contact Us:</p>
                                    <Link to="#" className="card-link">Email</Link>
                                    <Link to="#" className="card-link">Website</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9">
                            <div className="card h-100">
                                <div className="card-body">
                                    {detailsSection()}
                                    <div className="row gutters mt-3">
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label htmlFor="ciTy">Organization Mission</label>
                                                <textarea rows='3' className="form-control" id="floatingInputValue"
                                                          placeholder="Your organization's mission."/>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="sTate">What will you do with the resources?</label>
                                                <textarea rows='3' className="form-control" id="floatingInputValue"
                                                          placeholder="Please include as much detail as possible."/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h5 className="mt-4 mb-2 text-primary">Donation Information</h5>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Street">Types of Donations</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Human Hours
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="flexCheckChecked"/>
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Food
                                            </label>
                                        </div>
                                    </div>

                                    <div className="row gutters">
                                        <div className="col-xl-12">
                                            <button onClick={() => navigate('/')} className="btn btn-secondary">Cancel
                                            </button>
                                            <button className="btn btn-primary m-lg-3">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    if (loading)
        return <LoadingScreen/>;

    if (type === 'donor')
        return donorView();
    else if (type === 'receiver') {
        console.log(true);
        return receiverView();
    }
}

export default EditProfile;