import { Container, Row, Col } from "react-bootstrap"
import logo from "../assets/img/logo.svg"
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/github.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-item-center">
                    <Col sm={6}><h2 className="logo">ATNB</h2></Col>
                    <Col sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a target='#blank' href="https://linkedin.com/in/bünyamin-altan-932322243"><img src={navIcon1} alt="Nav Icon 1" /></a>
                            <a target='#blank' href="https://github.com/atnbn"><img src={navIcon2} alt="Nav Icon 2" /></a>
                            <a target='#blank' href="https://www.instagram.com/buni_at/"><img src={navIcon3} alt="Nav Icon 3" /></a>
                        </div>
                        <p>CopyRight 2022. All Right Reserved</p>
                    </Col>
                </Row>
            </Container>

        </footer>
    )
}