import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './Gallery.css';
import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

function Gallery() {
    const [activeFilter, setActiveFilter] = useState('all');
    const { data: images, loading } = useFirestore('gallery_items');

    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'interior', name: 'Interior' },
        { id: 'food', name: 'Food' },
        { id: 'events', name: 'Events' },
        { id: 'team', name: 'Our Team' },
    ];

    const filteredImages = () => {
        if (loading) return [];
        if (activeFilter === 'all') return images;
        return images.filter(img => img.category === activeFilter);
    };

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
                        {filteredImages().map((image, index) => (
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
