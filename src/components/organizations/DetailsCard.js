import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";

function DetailsCard(props) {
    const [loading, isLoading] = useState(true);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if (props.types !== undefined) {
                setTypes(props.types);
                isLoading(false);
            }
        }, 1000)
    });

    if (loading)
        return;
    else types.map((type, index) => {
        if (type === false)
            types.splice(index, 1);
    });

    // TODO: Implement review system.
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Card className="me-lg-4" style={{width: "50rem"}}>
                        <Card.Body>
                            <Card.Img src={props.banner} alt="Banner"/>
                            <Card.Title className="mt-2" style={{textAlign: "center"}}>{props.title}</Card.Title>
                            <Card.Subtitle
                                style={{textAlign: "center"}}><i>{props.address}, {props.city}, {props.state} {props.zip}</i></Card.Subtitle>
                            <Card.Text className="mt-2">
                                <p><u>Contact Information</u></p>
                                <ul>
                                    <li>Phone: {props.phone}</li>
                                    <li>Email: {props.email}</li>
                                    <li>Website: {props.website}</li>
                                </ul>
                                <p>Donations Offered: {types.join(", ")}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DetailsCard;
