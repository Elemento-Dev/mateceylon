import PageHero from '../components/PageHero';
import ServiceItem from '../components/ServiceItem';
import AnimatedSection from '../components/AnimatedSection';
import './ServicesPage.css';

function ServicesPage() {
    const services = [
        {
            title: 'Birthday Celebrations',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="2" />
                    <path d="M32 10 L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="32" cy="28" r="2" fill="currentColor" />
                    <path d="M20 46 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 50 L46 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M16 54 L48 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
            ),
            description: 'Make your birthday unforgettable with our premium dining experience.',
            features: [
                'Personalized birthday cake',
                'Complimentary champagne toast',
                'Special birthday decorations',
                'Dedicated server for your table',
                'Custom menu options',
                'Photo opportunities with our chef'
            ],
            packages: [
                { name: 'Basic Package', price: 'Rs. 15,000', guests: 'Up to 10 guests' },
                { name: 'Premium Package', price: 'Rs. 28,000', guests: 'Up to 20 guests' },
                { name: 'Deluxe Package', price: 'Rs. 45,000', guests: 'Up to 30 guests' },
            ]
        },
        {
            title: 'Corporate Events',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 42 L16 52 L20 36 L8 24 L24 24 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
            description: 'Professional event spaces for meetings, conferences, and corporate gatherings.',
            features: [
                'Private dining rooms',
                'Audio-visual equipment',
                'High-speed WiFi',
                'Customized menu options',
                'Professional event coordinator',
                'Flexible seating arrangements'
            ],
            packages: [
                { name: 'Meeting Package', price: 'Rs. 25,000', guests: 'Up to 15 guests' },
                { name: 'Conference Package', price: 'Rs. 50,000', guests: 'Up to 40 guests' },
                { name: 'Gala Dinner', price: 'Rs. 85,000', guests: 'Up to 60 guests' },
            ]
        },
        {
            title: 'BBQ Nights',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="36" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 36 L16 30 Q16 26 20 26 L44 26 Q48 26 48 30 L48 36" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="28" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="36" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
            description: 'Experience authentic Australian BBQ every Friday night.',
            features: [
                'Live BBQ cooking station',
                'Premium meat selection',
                'Fresh seafood options',
                'Traditional Australian sides',
                'Unlimited salad bar',
                'Live music entertainment'
            ],
            schedule: 'Every Friday from 6:00 PM to 11:00 PM',
            pricing: 'Rs. 3,500 per person (All-you-can-eat)'
        },
        {
            title: 'Private Dining',
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 16 Q28 8 32 8 Q36 8 36 16 L36 24 Q36 32 32 56 Q28 32 28 24 Z" stroke="currentColor" strokeWidth="2" />
                    <ellipse cx="32" cy="24" rx="8" ry="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M24 24 Q20 28 20 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M40 24 Q44 28 44 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            description: 'Exclusive private dining rooms for intimate gatherings.',
            features: [
                'Elegant private rooms',
                'Personalized menu creation',
                'Sommelier-selected wine pairings',
                'Dedicated chef service',
                'Private entrance available',
                'Customized ambiance and décor'
            ],
            rooms: [
                { name: 'The Sydney Room', capacity: '8-12 guests', price: 'Rs. 35,000 minimum spend' },
                { name: 'The Melbourne Suite', capacity: '15-20 guests', price: 'Rs. 55,000 minimum spend' },
                { name: 'The Brisbane Terrace', capacity: '20-30 guests', price: 'Rs. 75,000 minimum spend' },
            ]
        }
    ];

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
                                {service.icon}
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

                            {service.packages && (
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

                            {service.rooms && (
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
