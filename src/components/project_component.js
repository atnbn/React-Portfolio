import { Col, Row, Container, TabContainer, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./projectCard.js";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projectim1 from "../assets/img/Kanban.png";
import projectim2 from "../assets/img/Forkify.png";
import projectim3 from "../assets/img/ringoffire.png";
import projectim4 from "../assets/img/Slack.png";
import projectim5 from "../assets/img/Elpololoco.png";
import TrackVisibility from "react-on-screen";
import 'animate.css'
export const Projects = () => {
    const javaScriptProjects = [{

        title: "Forkify",
        description: "Javascript",
        imgUrl: projectim2,
        https: "silver-begonia-2336f4.netlify.app/"
    },
    {
        title: "El Polo Loco",
        description: "OOP Javascript",
        imgUrl: projectim5,
        https: "https://atnbn.github.io/el_pollo_loco_object_orientation/"
    }]
    const Python = [{

        title: "Forkify",
        description: "Javascript",
        imgUrl: projectim2,
        https: "silver-begonia-2336f4.netlify.app/"
    }]
    const angularProjects = [
        {
            title: "Kanban",
            description: "Angular Node.js Mongo DB",
            imgUrl: projectim1,
            link: "https://kanban-azure-kappa.vercel.app/#/",
        },

        {
            title: "Ring of Fire",
            description: "Angular Firebase",
            imgUrl: projectim3,
            link: "https://ring-of-fire-2c176.web.app/ringoffire/"
        },
        {
            title: "Slack",
            description: "Angular Firebase",
            imgUrl: projectim4,
            link: "https://slack-clone-c2cbe.web.app/login"
        },
    ];

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__bounce" : ''}>
                                    <h2>Projects</h2>
                                    <p>This page is a sample of my work! Scroll down to view other projects I have developed</p>
                                </div>
                            }
                        </TrackVisibility>
                        <TabContainer id="projects-tabs" defaultActiveKey="first">
                            <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab" >
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Angular</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">JS</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Python</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {angularProjects.map((project, index) => {
                                            return (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            );
                                        })}
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row>
                                        {javaScriptProjects.map((project, index) => {
                                            return (
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            );
                                        })}
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </TabContainer>

                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} alt="background" />
        </section >
    );
};
