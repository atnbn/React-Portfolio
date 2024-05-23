import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css'
import TrackVisibility from 'react-on-screen';
import { HashLink } from "react-router-hash-link";
import {
    BrowserRouter as Router
} from "react-router-dom";
export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const toRotate = [" Front End Developer", " Software Developer"];
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [activeLink, setActiveLink] = useState('home');
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker); }
    }, [text]);


    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    const tick = () => {
        let i = loopNum % toRotate.length; // Corrected index calculation
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    };

    return (
        <Router>
            <section className="banner" id="home">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} xl={7}>
                            <TrackVisibility>
                                {({ isVisible }) =>
                                    <div className={isVisible ? "animate__animated animate__fadeIn" : ''}>
                                        <span className="tagline">Welcome to my Portfolio</span>
                                        <h1>{`Hi, I'm Bünyamin Altan`}<span className="wrap">{text}</span></h1>
                                        <p>I am a self-taught programmer with a strong passion for creating visually appealing and user-friendly interfaces.
                                            I discovered my love for programming about three years ago, and it has been a passion of mine ever since.</p>
                                        <HashLink to="#connect">
                                            <button>Let's connect <ArrowRightCircle size={25} /> </button>

                                        </HashLink>
                                    </div>
                                }
                            </TrackVisibility>
                        </Col>
                        <Col xs={12} md={6} xl={5}>
                            <img src={headerImg} alt="Header Img" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Router>
    );
};
