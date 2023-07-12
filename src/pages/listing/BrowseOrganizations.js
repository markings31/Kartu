import {db} from "../../firebase";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import OrgInfo from "../../components/organizations/OrgInfo";
import LoadingScreen from "../../components/ui/Loader";
import {Container, Row} from "react-bootstrap";

// TODO: Add checkbox to filter by type of organization. (e.g. donor, receiver)
export default function BrowseOrganizations() {
    const [loading, isLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [donors, setDonors] = useState({});
    const [filteredDonors, setFilteredDonors] = useState({});

    // TODO: Use firebase.js functions instead of local.
    const allDonors = async () => {
        try {
            const snapshot = await getDocs(collection(db, "donors"));
            setDonors(snapshot.docs.map(doc => doc.data()));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            allDonors().then();
            isLoading(false);
        }, 1000);
    });

    if (loading)
        return <LoadingScreen/>

    // TODO: Only list organizations that have existing data.
    return (
        <Container>
            <Row className="justify-content-end">
                <h2 className="col">Browse Organizations</h2>
                <div className="col-3 form-group offset-md-3">
                    <input className="form-control " type="text" value={query} onChange={e => setQuery(e.target.value)}
                           placeholder="Search for an organization..."/>
                </div>
                <div className="col-md-1">
                    <button
                        onClick={() => setFilteredDonors(donors.filter(donor => donor.donorInfo.name.toLowerCase().includes(query.toLowerCase())))}
                        className="btn me-2 btn-secondary">Search
                    </button>
                </div>
                <br/>
                <ul>
                    <OrgInfo donors={Object.keys(filteredDonors).length === 0 ? donors : filteredDonors}/>
                </ul>
            </Row>
        </Container>
    );
}
