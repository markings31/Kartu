import {Button} from "react-bootstrap";

export default function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <img src={require("../components/assets/kartu_icon_transparent.png")} alt="logo"
                         style={{
                             width: "20rem",
                             height: "20rem",
                         }}/>
                </div>
                <div className="col-md-5">
                    <h1 className="mt-5">Welcome to Kartu</h1>
                    <p className="mt-4">
                        We're a student-driven project dedicated to helping young organizations find their dream partner
                        and
                        receive the funding they need to succeed.
                    </p>
                    <Button href="/browse" type="primary" className="mt-3">
                        Browse
                    </Button>
                </div>
            </div>
            <br/>
            <br/>
            <div className="row my-5">
                <div className="col">
                    <div className="card-group">
                        <div className="card">
                            <img
                                src="https://www.k6agency.com/wp-content/uploads/2020/09/10-Most-Popular-Social-Messaging-Apps-For-Business.jpg"
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">Simple Communication</h5>
                                <p className="card-text">
                                    Here at Kartu, we believe in providing an intuitive platform for young businesses
                                    and organizations to
                                    communicate with each other. No more long-winded emails or confusing phone calls.
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img
                                src="https://media.istockphoto.com/vectors/man-with-laptop-studying-or-working-concept-table-with-books-lamp-vector-id1164543414?b=1&k=20&m=1164543414&s=612x612&w=0&h=Uf2T_OPX7a0P2EYzzqr4uTdXxaavKaSZjts4wRGKN1k="
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">Easy-to-use Tools</h5>
                                <p className="card-text">
                                    Kartu is designed to be as easy to use as possible. We strive to ensure that
                                    young organizations can easily find the funding they need and communicate with their
                                    partners.
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img
                                src="https://img.freepik.com/free-vector/big-isolated-employee-working-office-workplace-flat-illustration_1150-41780.jpg?w=2000"
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">Detailed Analytics</h5>
                                <p className="card-text">
                                    As a business, information is key. Kartu provides detailed analytics
                                    on donations as well as a convenient hub for managing and communicating with
                                    partners.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="text-center mt-5">
                <h2>Get in Touch</h2>
                <p className="lead">Have questions or concerns? Please don't hesitate to contact us.</p>
            </div>
            <div className="row justify-content-center my-5">
                <div className="col-lg-6">
                    <form action="">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="my@email.com"
                            className="form-control"
                        />
                        <div className="form-floating my-5">
                            <input
                                type="name"
                                id="name"
                                placeholder="e.g. David"
                                className="form-control"
                            />
                            <label htmlFor="name" className="form-label">Name</label>
                        </div>
                        <label htmlFor="subject" className="form=label">Subject</label>
                        <select name="subject" id="subject" className="form-select">
                            <option value="pricing">Pricing</option>
                            <option value="technical" selected>Technical question</option>
                            <option value="other">Other</option>
                        </select>

                        <div className="form-floating my-5">
                <textarea
                    name="query"
                    id="query"
                    style={{height: "150px"}}
                    className="form-control"
                    placeholder="Write a message"
                ></textarea>

                            <label htmlFor="query">Write a message</label>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}