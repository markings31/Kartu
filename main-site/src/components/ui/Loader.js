import {Spinner} from "react-bootstrap";

export default function LoadingScreen() {
    return (
        <div>
            <Spinner
                animation="border"
                variant="primary"
                style={{width: "3rem", height: "3rem"}}
                className="d-block mx-auto my-auto"
            />
        </div>
    )
}
