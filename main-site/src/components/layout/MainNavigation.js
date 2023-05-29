import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../../firebase";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button, Container, Modal} from "react-bootstrap";
import {useState} from "react";

export default function MainNavigation() {
    const [user] = useAuthState(auth);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    function dashboardDropdown() {
        return (
            <div>
                <NavDropdown className="btn btn-primary me-5" title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href={"/organizations/" + user.uid}>Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/dashboard">
                        Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item className="d-grid gap-2">
                        <Button variant="danger" onClick={handleShow}>Log Out</Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Log Out</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to log out?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => {
                                    logout()
                                    navigate('/')
                                    setShow(false);
                                }}>Logout</Button>
                            </Modal.Footer>
                        </Modal>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        );
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#063e99"}} variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            src={require("../assets/kartu_icon_transparent.png")}
                            alt="logo"
                            width="50"
                            height="50"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/browse">Browse</Nav.Link>
                            <Nav.Link eventKey="disabled" disabled>About Us</Nav.Link>
                            <Nav.Link eventKey="disabled" disabled>Events</Nav.Link>
                        </Nav>
                        <Nav>
                            {user ? dashboardDropdown() : <Nav.Link href="/login">
                                <Button variant="primary">Login</Button>
                            </Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
