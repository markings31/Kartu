import React from 'react';
import {MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow} from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted offcanvas-bottom'>
            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3"/>
                                Kartu
                            </h6>
                            <p>
                                A student-driven project dedicated to helping young organizations
                                find their dream partner and receive the funding they need to succeed.
                            </p>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='/aboutus' className='text-reset'>
                                    About Us
                                </a>
                            </p>
                            <p>
                                <a href='/dashboard' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='/events' className='text-reset'>
                                    Events
                                </a>
                            </p>
                            <p>
                                <a href='/help' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2"/>
                                5400 Ziegler Rd, Fort Collins, Colorado 80528
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3"/>
                                cshs@frhs.tech
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3"/> + 01 234 567 88
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3"/> + 01 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{backgroundColor: 'black'}}>
                © 2022 Copyright: <a className='text-reset fw-bold' href='https://kartu.com/'>kartu.com
            </a>
            </div>
        </MDBFooter>
    );
}