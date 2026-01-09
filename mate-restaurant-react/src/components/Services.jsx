import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <section className="services" id="services">
            {/* Service Item 1: Text Left, Image Right */}
            <div className="split-section reverse">
                <div className="half-img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200"
                        alt="Cocktail Bar"
                        loading="lazy"
                    />
                </div>
                <div className="half-text dark">
                    <h3>Cocktail Bar</h3>
                    <p>
                        Sip on artisanal cocktails crafted by our expert mixologists.
                        Our bar offers a relaxed atmosphere with a wide selection of premium spirits and wines.
                    </p>
                </div>
            </div>

            {/* Service Item 2: Image Left, Text Right */}
            <div className="split-section">
                <div className="half-img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
                        alt="Outdoor Terrace"
                        loading="lazy"
                    />
                </div>
                <div className="half-text">
                    <h3>Outdoor Terrace</h3>
                    <p>
                        Enjoy al fresco dining with panoramic views. The perfect spot for a sunny lunch or a romantic dinner under the stars.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;
