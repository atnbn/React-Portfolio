import { Col } from 'react-bootstrap'

export const ProjectCard = ({ title, description, imgUrl, link, svgDocument }) => {
    return (
        <Col size={12} sm={6} md={4}>
            <a className="link" target='#blank' href={link}>
                <div className="proj-imgbx">
                    {svgDocument ? (
                        <object
                            className="proj-preview-document"
                            data={imgUrl}
                            type="image/svg+xml"
                            role="img"
                            aria-label={`${title} project preview`}
                        >
                            <img src={imgUrl} alt={`${title} project preview`} />
                        </object>
                    ) : (
                        <img src={imgUrl} alt={`${title} project preview`} />
                    )}
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </div>
                </div>
            </a>
        </Col>
    )
}