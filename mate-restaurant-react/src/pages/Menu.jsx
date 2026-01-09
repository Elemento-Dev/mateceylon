import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import './Menu.css';
import { useState } from 'react';

function Menu() {
    const [activeCategory, setActiveCategory] = useState('all');

    const menuData = {
        appetizers: [
            { name: 'Aussie Meat Pies', description: 'Traditional beef pies with flaky pastry', price: 'Rs. 850', vegetarian: false },
            { name: 'Kangaroo Carpaccio', description: 'Thinly sliced kangaroo with rocket and parmesan', price: 'Rs. 1,450', special: true },
            { name: 'Prawns on the Barbie', description: 'Grilled king prawns with garlic butter', price: 'Rs. 1,650' },
            { name: 'Veggie Spring Rolls', description: 'Crispy rolls with Asian vegetables', price: 'Rs. 650', vegetarian: true },
        ],
        mains: [
            { name: 'Wagyu Beef Steak', description: '300g premium wagyu with seasonal vegetables', price: 'Rs. 4,500', special: true },
            { name: 'Barramundi Fillet', description: 'Pan-seared barramundi with lemon butter sauce', price: 'Rs. 2,850' },
            { name: 'Slow Cooked Lamb Shoulder', description: 'Tender lamb with mint jelly and roasted potatoes', price: 'Rs. 3,200' },
            { name: 'Chicken Parmigiana', description: 'Breaded chicken with tomato sauce and melted cheese', price: 'Rs. 1,950' },
            { name: 'Vegetable Wellington', description: 'Mushroom and spinach in puff pastry', price: 'Rs. 1,750', vegetarian: true },
        ],
        bbq: [
            { name: 'Mixed Grill Platter', description: 'Beef, lamb, chicken, and sausages with sides', price: 'Rs. 3,500' },
            { name: 'BBQ Ribs', description: 'Slow-cooked pork ribs with smoky BBQ sauce', price: 'Rs. 2,650' },
            { name: 'Seafood BBQ', description: 'Prawns, calamari, and fish with grilled vegetables', price: 'Rs. 3,850' },
            { name: 'Lamb Chops', description: 'Marinated lamb chops with rosemary', price: 'Rs. 2,950' },
        ],
        desserts: [
            { name: 'Pavlova', description: 'Meringue with fresh cream and tropical fruits', price: 'Rs. 850', special: true },
            { name: 'Lamingtons', description: 'Chocolate coconut sponge cake', price: 'Rs. 650' },
            { name: 'Tim Tam Cheesecake', description: 'Creamy cheesecake with Tim Tam biscuits', price: 'Rs. 950' },
            { name: 'Anzac Biscuit Ice Cream', description: 'Homemade ice cream with Anzac biscuits', price: 'Rs. 750' },
        ],
        beverages: [
            { name: 'Australian Wines', description: 'Selection of premium red and white wines', price: 'Rs. 1,200/glass' },
            { name: 'Flat White', description: 'Traditional Australian coffee', price: 'Rs. 450' },
            { name: 'Fresh Fruit Smoothies', description: 'Tropical and berry flavors', price: 'Rs. 650' },
            { name: 'Craft Beers', description: 'Australian imported and local craft selections', price: 'Rs. 850/bottle' },
        ],
    };

    const categories = [
        { id: 'all', name: 'All Items' },
        { id: 'appetizers', name: 'Appetizers' },
        { id: 'mains', name: 'Main Courses' },
        { id: 'bbq', name: 'BBQ Specialties' },
        { id: 'desserts', name: 'Desserts' },
        { id: 'beverages', name: 'Beverages' },
    ];

    const getFilteredItems = () => {
        if (activeCategory === 'all') {
            return Object.entries(menuData).flatMap(([category, items]) =>
                items.map(item => ({ ...item, category }))
            );
        }
        return menuData[activeCategory].map(item => ({ ...item, category: activeCategory }));
    };

    return (
        <div className="menu-page">
            <PageHero
                title="Our Menu"
                subtitle="Authentic Australian Cuisine"
                backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600"
            />

            <section className="menu-content">
                <AnimatedSection animation="fade-in">
                    <div className="menu-categories">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up">
                    <div className="menu-items-grid">
                        {getFilteredItems().map((item, index) => (
                            <div key={index} className="menu-item-card">
                                <div className="menu-item-header">
                                    <h3>{item.name}</h3>
                                    <span className="price">{item.price}</span>
                                </div>
                                <p className="description">{item.description}</p>
                                <div className="menu-item-badges">
                                    {item.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
                                    {item.special && <span className="badge special">Chef's Special</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={200}>
                    <div className="menu-note">
                        <p>All prices are in Sri Lankan Rupees and inclusive of service charge and taxes.</p>
                        <p>Please inform our staff of any allergies or dietary requirements.</p>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}

export default Menu;
