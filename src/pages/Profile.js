import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useEffect, useState} from "react";
import DetailsCard from "../components/organizations/DetailsCard";
import LoadingScreen from "../components/ui/Loader";
import {Card} from "react-bootstrap";
import ImageCarousel from "../components/ui/ImageCarousel";

function Profile() {
    const [loading, isLoading] = useState(true);
    const {id} = useParams();
    const [data, setData] = useState({});

    const companyInfo = async () => {
        try {
            const dbRef = doc(db, "donors", id);
            const snapshot = await getDoc(dbRef);
            setData(await snapshot.data()['donorInfo']);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            companyInfo().then();
            isLoading(false);
        }, 1000);
    });

    if (loading)
        return <LoadingScreen/>;

    return (
        <div className="container-fluid">
            <Card className="shadow p-3">
                <Card.Body>
                    <br/>
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item"><a href="/browse">Browse</a></li>
                                <li className="breadcrumb-item active" aria-current="page">{data['name']}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <Card.Title><h2><b>{data['name']}</b></h2></Card.Title>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row justify-content-between">
                        <ImageCarousel/>
                        <div className="col-6 mb-4">
                            <DetailsCard title={data['name']} description={data['description']}
                                         address={data['address']}
                                         city={data['city']} state={data['state']} zip={data['zip']}
                                         banner={data['banner']}
                                         phone={data['phone']} email={data['contactEmail']}
                                         website={data['website']}
                                         types={data.donationTypes}/>
                        </div>
                    </div>
                    <Card.Subtitle className="mt-4">
                        <h4><u>About</u></h4>
                    </Card.Subtitle>
                    <Card.Text>{data['description']}</Card.Text>
                    <br/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Profile;
