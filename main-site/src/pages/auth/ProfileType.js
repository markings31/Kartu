import {Card} from "react-bootstrap";
import classes from "../../components/organizations/Item.module.css"
import {useNavigate} from "react-router-dom";

function ProfileType() {
    const nav = useNavigate()

    const navToRegisterBusiness = () => {
        nav('/register/business');
    }

    const navToRegisterLocal = () => {
        nav('/register/local');
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-5">
                    <Card>
                        <Card.Img
                            src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2018Q4/sales-org-structure/sales-organization-team-structure-header@2x.png"
                            style={{width: "100%", height: "20rem"}}
                        />
                        <Card.Body>
                            <Card.Title><b><u>Register as a Donor</u></b></Card.Title>
                            <Card.Text>
                                <p>As a business, you will offer local organizations valuable resources to foster their
                                    development in your community.
                                </p>

                                <p>Here, you can provide information such as:</p>

                                <ul>
                                    <li>Upcoming Fundraising Events</li>
                                    <li>Feedback From Past Partners</li>
                                    <li>Average Money Raised</li>
                                    <li>Your Mission</li>
                                </ul>
                            </Card.Text>
                            <p>And more!</p>
                        </Card.Body>
                        <div className={classes.actions}>
                            <button onClick={navToRegisterBusiness}>Register Now</button>
                        </div>
                    </Card>
                </div>
                <div className="col-5">
                    <Card>
                        <Card.Img
                            src="https://www.visa.ca/content/dam/VCOM/regional/na/canada/small-business/back-to-business/find-a-business-marquee-800x300.jpg"
                            style={{width: "100%", height: "20rem"}}
                        />
                        <Card.Body>
                            <Card.Title><b><u>Register as a Receiver</u></b></Card.Title>
                            <Card.Text>
                                <p>
                                    As a local organization, you will have access to many tremendous tools that will
                                    ensure
                                    that your next event or fundraiser
                                    will be a smashing success.
                                </p>

                                <p>Some of our notable resources include:</p>


                                <ul>
                                    <li>Dedicated Messaging Channels for Easy Communication</li>
                                    <li>Comprehensive Metrics</li>
                                    <li>Site Advertisements</li>
                                    <li>Directory for Upcoming Events</li>
                                </ul>
                            </Card.Text>
                            <p>And more!</p>
                        </Card.Body>
                        <div className={classes.actions}>
                            <button onClick={navToRegisterLocal}>Register Now</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProfileType;