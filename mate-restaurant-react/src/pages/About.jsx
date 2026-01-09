import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './About.css';

function About() {
    const chefs = [
        {
            name: 'James Mitchell',
            role: 'Executive Chef',
            image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
            bio: 'With over 20 years of experience in Australian cuisine, Chef James brings authentic flavors to every dish.'
        },
        {
            name: 'Sarah Williams',
            role: 'Sous Chef',
            image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400',
            bio: 'Specializing in BBQ and grilled specialties, Sarah ensures every meal is cooked to perfection.'
        },
        {
            name: 'Marco Santos',
            role: 'Pastry Chef',
            image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400',
            bio: 'Creating traditional Australian desserts with a modern twist, Marco delights guests with sweet masterpieces.'
        },
    ];

    const milestones = [
        { year: '2020', event: 'Mate Restaurant Founded', description: 'Opening of Sri Lanka\'s first Australian cuisine restaurant' },
        { year: '2021', event: 'Award Recognition', description: 'Received "Best New Restaurant" award from Sri Lanka Tourism' },
        { year: '2022', event: 'Expansion', description: 'Added private dining rooms and BBQ night events' },
        { year: '2023', event: 'International Recognition', description: 'Featured in Australian Culinary Magazine' },
        { year: '2024', event: 'Community Impact', description: 'Launched sustainability and local sourcing initiatives' },
        { year: '2025', event: 'Continued Excellence', description: 'Serving authentic Australian cuisine with passion' },
    ];

    return (
        <div className="about-page">
            <PageHero
                title="About Us"
                subtitle="Bringing Australian Culinary Excellence to Sri Lanka"
                backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
            />

            <section className="about-story">
                <AnimatedSection animation="fade-up">
                    <div className="story-content">
                        <h2>Our Story</h2>
                        <p>
                            Mate Restaurant was born from a passion to bring authentic Australian cuisine to the beautiful island of Sri Lanka.
                            As the first restaurant in the country dedicated to Australian culinary traditions, we pride ourselves on delivering
                            an experience that transports our guests to the land Down Under.
                        </p>
                        <p>
                            Our journey began when our founder, having spent years in Australia, realized the unique opportunity to introduce
                            Sri Lankans to the rich and diverse flavors of Australian cooking. From premium wagyu steaks to traditional BBQ,
                            from fresh seafood to classic desserts like pavlova, every dish tells a story of Australian heritage.
                        </p>
                        <p>
                            Today, Mate Restaurant stands as a testament to cultural exchange through food, where we blend Australian authenticity
                            with Sri Lankan hospitality to create unforgettable dining experiences.
                        </p>
                    </div>
                </AnimatedSection>
            </section>

            <section className="about-mission">
                <div className="mission-grid">
                    <AnimatedSection animation="fade-up" delay={0}>
                        <div className="mission-card">
                            <h3>Our Mission</h3>
                            <p>
                                To provide an authentic Australian dining experience while maintaining the highest standards of quality,
                                service, and hospitality that Sri Lanka is known for.
                            </p>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up" delay={150}>
                        <div className="mission-card">
                            <h3>Our Values</h3>
                            <ul>
                                <li>Authenticity in every dish</li>
                                <li>Premium quality ingredients</li>
                                <li>Exceptional customer service</li>
                                <li>Sustainable practices</li>
                                <li>Community engagement</li>
                            </ul>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up" delay={300}>
                        <div className="mission-card">
                            <h3>Our Commitment</h3>
                            <p>
                                We are committed to sourcing the finest ingredients, training our staff to the highest standards,
                                and creating a welcoming atmosphere for all our guests.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <section className="about-team">
                <AnimatedSection animation="fade-up">
                    <h2>Meet Our Chefs</h2>
                </AnimatedSection>
                <AnimatedSection animation="fade-up">
                    <div className="chefs-grid">
                        {chefs.map((chef, index) => (
                            <div key={index} className="chef-card">
                                <div className="chef-image" style={{ backgroundImage: `url(${chef.image})` }}></div>
                                <h3>{chef.name}</h3>
                                <p className="chef-role">{chef.role}</p>
                                <p className="chef-bio">{chef.bio}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            <section className="about-timeline">
                <AnimatedSection animation="fade-up">
                    <h2>Our Journey</h2>
                </AnimatedSection>
                <div className="timeline">
                    {milestones.map((milestone, index) => (
                        <AnimatedSection key={index} animation="slide-left" delay={index * 100}>
                            <div className="timeline-item">
                                <div className="timeline-year">{milestone.year}</div>
                                <div className="timeline-content">
                                    <h3>{milestone.event}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;
