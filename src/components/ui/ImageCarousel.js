import classes from '../../pages/Carousel.module.css';
import {Carousel} from "react-bootstrap";

export default function ImageCarousel() {
    return (
        <Carousel className={classes.carousel}>
            <Carousel.Item>
                <img
                    src={require("../assets/CSHS1.JPG")}
                    style={{height: "400px", width: "700px"}}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={require("../assets/CSHS2.jpg")}
                    style={{height: "400px", width: "700px"}}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={require("../assets/CSHS3.jpg")}
                    style={{height: "400px", width: "700px"}}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}