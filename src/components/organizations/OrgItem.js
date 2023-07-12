import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function OrgItem(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/organizations/${props.redirect}`);
    }

    // TODO: Wrap description text within card
    return (
        <div className="container">
            <div className="row me-lg-5 justify-content-center">
                <div className="col-md-7">
                    <br/>
                    <Card className="shadow-sm p-3" style={{width: "55rem"}}>
                        <Card.Img variant="top" src={props.banner}
                                  style={{height: "15rem", overflow: "hidden"}}/>
                        <Card.Body>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Subtitle
                                className="mb-3 mt-2 text-muted">{props.address}, {props.city}, {props.state} {props.zip}</Card.Subtitle>
                            <Card.Text>{props.description}</Card.Text>
                            <div className="row justify-content-center">
                                <div className="col-lg-2">
                                    <Button variant="outline-primary" className="mt-3" onClick={handleClick}>Learn
                                        More</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}
