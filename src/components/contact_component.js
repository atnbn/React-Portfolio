import { useRef, useState } from "react"
import contactImg from "../assets/img/contact-img.svg"
import { Col, Container, Row } from "react-bootstrap"
import emailjs from "emailjs-com"

export const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails)
    const [isSending, setIsSending] = useState(false);
    const sending = useRef(false);
    const [status, setStatus] = useState({});
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_USER_ID;
    const hasEmailService = Boolean(serviceId && templateId && publicKey);
    const contactEmail = process.env.REACT_APP_CONTACT_EMAIL;
    const emailDraft = contactEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent(`Portfolio enquiry from ${formDetails.firstName} ${formDetails.lastName}`.trim())}&body=${encodeURIComponent(`${formDetails.message}\n\nFrom: ${formDetails.firstName} ${formDetails.lastName}\nEmail: ${formDetails.email}\nPhone: ${formDetails.phoneNumber}`)}` : null;
    const onFormUpdate = (category, value) => {
        setStatus({});
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending.current) return;
        const details = Object.fromEntries(Object.entries(formDetails).map(([key, value]) => [key, value.trim()]));
        if (!details.firstName || !details.email || !details.message) {
            setStatus({ success: false, message: 'Please enter your first name, email address and message.' });
            return;
        }
        if (!hasEmailService) {
            setStatus({ success: false, message: 'Direct sending is currently unavailable. Please try again later.' });
            return;
        }
        sending.current = true;
        setIsSending(true);
        setStatus({});
        try {
            await emailjs.send(serviceId, templateId, {
                ...details,
                from_name: `${details.firstName} ${details.lastName}`.trim(),
                from_email: details.email,
                reply_to: details.email,
            }, publicKey);
            setStatus({ success: true, message: 'Message sent successfully. Thank you for getting in touch!' });
            setFormDetails(formInitialDetails);
        } catch (error) {
            setStatus({ success: false, message: 'Your message could not be sent. Your text is saved here — please try again.' });
        } finally {
            sending.current = false;
            setIsSending(false);
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <p>Send me a message. Phone number and last name are optional.</p>
                        <form onSubmit={handleSubmit} aria-busy={isSending}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input name="firstName" aria-label="First name" autoComplete="given-name" required maxLength={100} disabled={isSending} type="text" value={formDetails.firstName} placeholder="First Name *" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input name="lastName" aria-label="Last name" autoComplete="family-name" maxLength={100} disabled={isSending} type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input name="email" aria-label="Email" autoComplete="email" required maxLength={254} disabled={isSending} type="email" value={formDetails.email} placeholder="Email *" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input name="phoneNumber" aria-label="Phone number" autoComplete="tel" maxLength={50} disabled={isSending} type="tel" value={formDetails.phoneNumber} placeholder="Phone No." onChange={(e) => onFormUpdate('phoneNumber', e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea name="message" aria-label="Message" required maxLength={5000} disabled={isSending} rows="6" value={formDetails.message} placeholder="Message *" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                    {hasEmailService ? <button type="submit" disabled={isSending}><span>{isSending ? 'Sending...' : 'Send message'}</span></button> : !emailDraft && <p>Direct sending is currently unavailable. Please try again later.</p>}
                                    {emailDraft && <p className="mt-3"><a className="text-white" href={emailDraft}>Open email app with this message</a></p>}
                                    {!hasEmailService && emailDraft && <p>Your email app will open a draft. Send it there to finish.</p>}
                                </Col>
                                {status.message && (
                                    <Col xs={12}>
                                        <p role={status.success === false ? 'alert' : 'status'}>{status.message}</p>
                                    </Col>
                                )}
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
