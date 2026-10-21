import { Col, Row, Container, TabContainer, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./projectCard.js";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projectim1 from "../assets/img/finance.svg";
import mealPlannerPreview from "../assets/img/meal-planner.svg";
import aniTrackerPreview from "../assets/img/anitracker.svg";
import TrackVisibility from "react-on-screen";
import "animate.css";
export const Projects = () => {
  const vueProjects = [
    {
      title: "FinanzApp",
      description: "Vue Node.js PostgreSQL",
      imgUrl: projectim1,
      link: "https://www.atnbnm.online/",
    },
  ];
  const reactProjects = [
    {
      title: "Meal Planner",
      description: "Next.js React Tailwind CSS",
      imgUrl: mealPlannerPreview,
      link: "https://meal-planer-public.vercel.app/",
    },
    {
      title: "AniTracker",
      description: "React Supabase",
      imgUrl: aniTrackerPreview,
      link: "https://anime-tracker-chi-sooty.vercel.app/home",
      svgDocument: true,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__bounce" : ""
                  }
                >
                  <h2>Projects</h2>
                  <p>
                    This page is a sample of my work! Scroll down to view other
                    projects I have developed
                  </p>
                </div>
              )}
            </TrackVisibility>
            <TabContainer id="projects-tabs" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="nav-pills mb-5 justify-content-center align-items-center"
                id="pills-tab"
              >
                <Nav.Item>
                  <Nav.Link eventKey="first">React</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Angular</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Vue</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    {reactProjects.map((project, index) => {
                      return <ProjectCard key={index} {...project} />;
                    })}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="coming-soon">
                    <span>IN PROGRESS</span>
                    <h3>Angular projects coming soon</h3>
                    <p>
                      I'm preparing some new work to share here. Check back
                      soon!
                    </p>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  {vueProjects.map((project, index) => {
                    return <ProjectCard key={index} {...project} />;
                  })}
                </Tab.Pane>
              </Tab.Content>
            </TabContainer>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="background"
      />
    </section>
  );
};
