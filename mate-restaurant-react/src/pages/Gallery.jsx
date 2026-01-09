import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './Gallery.css';
import { useState } from 'react';

function Gallery() {
    const [activeFilter, setActiveFilter] = useState('all');

    const images = [
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', category: 'interior', title: 'Main Dining Area' },
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', category: 'food', title: 'Signature Steak' },
        { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', category: 'food', title: 'BBQ Selection' },
        { url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800', category: 'interior', title: 'Private Dining Room' },
        { url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800', category: 'food', title: 'Fresh Seafood' },
        { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800', category: 'events', title: 'Celebration Event' },
        { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', category: 'interior', title: 'Bar Area' },
        { url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800', category: 'food', title: 'Dessert Selection' },
        { url: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800', category: 'events', title: 'Corporate Event' },

        { url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800', category: 'interior', title: 'Elegant Ambiance' },
        { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', category: 'food', title: 'Premium Steaks' },
        { url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800', category: 'team', title: 'Our Chef Team' },
        { url: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800', category: 'food', title: 'Australian Wines' },
        { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800', category: 'interior', title: 'Outdoor Seating' },
        { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800', category: 'events', title: 'Birthday Celebration' },
        { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', category: 'food', title: 'Gourmet Dishes' },
    ];

    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'interior', name: 'Interior' },
        { id: 'food', name: 'Food' },
        { id: 'events', name: 'Events' },
        { id: 'team', name: 'Our Team' },
    ];

    const filteredImages = activeFilter === 'all'
        ? images
        : images.filter(img => img.category === activeFilter);

    return (
        <div className="gallery-page">
            <PageHero
                title="Gallery"
                subtitle="A Visual Journey Through Mate Restaurant"
                backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600"
            />

            <section className="gallery-content">
                <AnimatedSection animation="fade-in">
                    <div className="gallery-filters">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-in">
                    <div className="gallery-grid">
                        {filteredImages.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <img src={image.url} alt={image.title} loading="lazy" />
                                <div className="gallery-overlay">
                                    <h3>{image.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}

export default Gallery;
