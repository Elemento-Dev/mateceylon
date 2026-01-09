import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './Contact.css';
import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send the form data to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="contact-page">
            <PageHero
                title="Contact Us"
                subtitle="We'd Love to Hear From You"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
            />

            <section className="contact-content">
                <div className="contact-info-cards">
                    <AnimatedSection animation="scale-up" delay={0}>
                        <div className="contact-info-card">
                            <div className="contact-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3>Visit Us</h3>
                            <p>Address Line 1<br />City, Sri Lanka</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="scale-up" delay={150}>
                        <div className="contact-info-card">
                            <div className="contact-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Call Us</h3>
                            <p>+94 XX XXX XXXX<br />Mon-Sun: 11AM - 11PM</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="scale-up" delay={300}>
                        <div className="contact-info-card">
                            <div className="contact-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>Email Us</h3>
                            <p>info@materestaurant.lk<br />reservations@materestaurant.lk</p>
                        </div>
                    </AnimatedSection>
                </div>

                <div className="contact-grid">
                    <AnimatedSection animation="slide-right">
                        <div className="contact-form-container">
                            <h2>Send us a Message</h2>
                            {submitted && (
                                <div className="form-success">
                                    Thank you! We'll get back to you soon.
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="reservation">Reservation</option>
                                            <option value="event">Event Inquiry</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left">
                        <div className="contact-map">
                            <h2>Find Us</h2>
                            <div className="map-container">
                                {/* Placeholder for Google Maps */}
                                <div className="map-placeholder">
                                    <p>Map will be here</p>
                                    <p className="map-note">Google Maps integration available</p>
                                </div>
                            </div>

                            <div className="contact-hours">
                                <h3>Opening Hours</h3>
                                <p><strong>Monday - Thursday:</strong> 11:00 AM - 11:00 PM</p>
                                <p><strong>Friday - Sunday:</strong> 11:00 AM - 12:00 AM</p>
                                <p><strong>BBQ Nights:</strong> Every Friday from 6:00 PM</p>
                            </div>

                            <div className="contact-parking">
                                <h3>Parking & Transport</h3>
                                <p><strong>Parking:</strong> Complimentary valet parking available</p>
                                <p><strong>Public Transport:</strong> Accessible via bus routes 138, 174, and 176</p>
                                <p><strong>Taxi Services:</strong> Uber, PickMe, and Kangaroo Cabs available</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

export default Contact;
