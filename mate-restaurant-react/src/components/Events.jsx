import React from 'react';
import './Events.css';

const Events = () => {
    return (
        <section className="events" id="events">
            {/* Event Item 1: Image Left, Text Right */}
            <div className="split-section">
                <div className="half-img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200"
                        alt="Private Dining"
                        loading="lazy"
                    />
                </div>
                <div className="half-text">
                    <h2>Private Dining</h2>
                    <p>
                        Host your next exclusive event with us. Whether it's an intimate gathering or a grand celebration,
                        our private dining spaces offer the perfect setting for unforgettable moments.
                    </p>
                    <a href="/contact" className="btn">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Event Item 2: Text Left, Image Right */}
            <div className="split-section reverse">
                <div className="half-img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200"
                        alt="Weddings"
                        loading="lazy"
                    />
                </div>
                <div className="half-text dark"> {/* Optional: Dark background variation */}
                    <h2>Weddings</h2>
                    <p>
                        Celebrate love in style. Our dedicated team ensures every detail of your special day is executed
                        to perfection, accompanied by exquisite cuisine and breathtaking views.
                    </p>
                    <a href="/contact" className="btn" style={{ color: '#cd9f2b', borderColor: '#cd9f2b' }}>
                        Enquire Now
                    </a>
                </div>
            </div>

            {/* Event Item 3: Image Left, Text Right */}
            <div className="split-section">
                <div className="half-img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1200"
                        alt="Corporate Events"
                        loading="lazy"
                    />
                </div>
                <div className="half-text">
                    <h2>Corporate Events</h2>
                    <p>
                        Impress your clients and colleagues with a sophisticated dining experience.
                        Tailored menus and seamless service for successful business gatherings.
                    </p>
                    <a href="/contact" className="btn">
                        Book Event
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Events;
