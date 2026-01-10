import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './ServicesPage.css';
import { useFirestore } from '../hooks/useFirestore';

function ServicesPage() {
    const { data: services, loading } = useFirestore('experiences');

    // Helper to render SVG string safely (assuming trusted admin input)
    const renderIcon = (svgString) => {
        if (!svgString) return null;
        return <div dangerouslySetInnerHTML={{ __html: svgString }} style={{ width: '64px', height: '64px', color: '#cd9f2b' }} />;
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4' }}>Loading services...</div>; // Simple loading state for now

    return (
        <div className="services-page">
            <PageHero
                title="Our Services"
                subtitle="Exceptional Experiences Tailored to Your Special Moments"
                backgroundImage="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600"
            />

            <section className="services-detail">
                {services.map((service, index) => (
                    <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                        <div className="service-detail-card">
                            <div className="service-detail-icon">
                                {renderIcon(service.icon)}
                            </div>
                            <h2>{service.title}</h2>
                            <p className="service-intro">{service.description}</p>

                            <div className="service-features">
                                <h3>Features Include:</h3>
                                <ul>
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {service.packages && service.packages.length > 0 && (
                                <div className="service-packages">
                                    <h3>Packages:</h3>
                                    <div className="packages-grid">
                                        {service.packages.map((pkg, idx) => (
                                            <div key={idx} className="package-card">
                                                <h4>{pkg.name}</h4>
                                                <p className="package-price">{pkg.price}</p>
                                                <p className="package-guests">{pkg.guests}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.rooms && service.rooms.length > 0 && (
                                <div className="service-packages">
                                    <h3>Available Rooms:</h3>
                                    <div className="packages-grid">
                                        {service.rooms.map((room, idx) => (
                                            <div key={idx} className="package-card">
                                                <h4>{room.name}</h4>
                                                <p className="package-guests">{room.capacity}</p>
                                                <p className="package-price">{room.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.schedule && (
                                <div className="service-schedule">
                                    <p><strong>Schedule:</strong> {service.schedule}</p>
                                    <p><strong>Pricing:</strong> {service.pricing}</p>
                                </div>
                            )}

                            <button className="btn btn-primary">Book Now</button>
                        </div>
                    </AnimatedSection>
                ))}
            </section>

            <section className="services-cta">
                <AnimatedSection animation="scale-up">
                    <h2>Need a Custom Package?</h2>
                    <p>Contact our events team to create a personalized experience for your special occasion.</p>
                    <a href="/contact" className="btn btn-primary">Contact Us</a>
                </AnimatedSection>
            </section>
        </div>
    );
}

export default ServicesPage;
