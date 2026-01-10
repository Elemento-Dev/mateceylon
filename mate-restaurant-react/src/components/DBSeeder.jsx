import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, writeBatch, doc } from 'firebase/firestore';

const initialMenuData = {
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

const initialGalleryData = [
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

const initialServicesData = [
    {
        title: 'Birthday Celebrations',
        icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="2" /><path d="M32 10 L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="32" cy="28" r="2" fill="currentColor" /><path d="M20 46 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M18 50 L46 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M16 54 L48 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>',
        description: 'Make your birthday unforgettable with our premium dining experience.',
        features: ['Personalized birthday cake', 'Complimentary champagne toast', 'Special birthday decorations', 'Dedicated server for your table', 'Custom menu options', 'Photo opportunities with our chef'],
        packages: [
            { name: 'Basic Package', price: 'Rs. 15,000', guests: 'Up to 10 guests' },
            { name: 'Premium Package', price: 'Rs. 28,000', guests: 'Up to 20 guests' },
            { name: 'Deluxe Package', price: 'Rs. 45,000', guests: 'Up to 30 guests' },
        ]
    },
    {
        title: 'Corporate Events',
        icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 42 L16 52 L20 36 L8 24 L24 24 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" /></svg>',
        description: 'Professional event spaces for meetings, conferences, and corporate gatherings.',
        features: ['Private dining rooms', 'Audio-visual equipment', 'High-speed WiFi', 'Customized menu options', 'Professional event coordinator', 'Flexible seating arrangements'],
        packages: [
            { name: 'Meeting Package', price: 'Rs. 25,000', guests: 'Up to 15 guests' },
            { name: 'Conference Package', price: 'Rs. 50,000', guests: 'Up to 40 guests' },
            { name: 'Gala Dinner', price: 'Rs. 85,000', guests: 'Up to 60 guests' },
        ]
    },
    {
        title: 'BBQ Nights',
        icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="36" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M16 36 L16 30 Q16 26 20 26 L44 26 Q48 26 48 30 L48 36" stroke="currentColor" strokeWidth="2" /><line x1="20" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="1.5" /><circle cx="28" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="36" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="40" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" /></svg>',
        description: 'Experience authentic Australian BBQ every Friday night.',
        features: ['Live BBQ cooking station', 'Premium meat selection', 'Fresh seafood options', 'Traditional Australian sides', 'Unlimited salad bar', 'Live music entertainment'],
        schedule: 'Every Friday from 6:00 PM to 11:00 PM',
        pricing: 'Rs. 3,500 per person (All-you-can-eat)'
    },
    {
        title: 'Private Dining',
        icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 16 Q28 8 32 8 Q36 8 36 16 L36 24 Q36 32 32 56 Q28 32 28 24 Z" stroke="currentColor" strokeWidth="2" /><ellipse cx="32" cy="24" rx="8" ry="4" stroke="currentColor" strokeWidth="2" /><path d="M24 24 Q20 28 20 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M40 24 Q44 28 44 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>',
        description: 'Exclusive private dining rooms for intimate gatherings.',
        features: ['Elegant private rooms', 'Personalized menu creation', 'Sommelier-selected wine pairings', 'Dedicated chef service', 'Private entrance available', 'Customized ambiance and décor'],
        rooms: [
            { name: 'The Sydney Room', capacity: '8-12 guests', price: 'Rs. 35,000 minimum spend' },
            { name: 'The Melbourne Suite', capacity: '15-20 guests', price: 'Rs. 55,000 minimum spend' },
            { name: 'The Brisbane Terrace', capacity: '20-30 guests', price: 'Rs. 75,000 minimum spend' },
        ]
    }
];

function DBSeeder({ customButtonClass }) {
    const [status, setStatus] = useState('Idle');

    const seedData = async () => {
        setStatus('Seeding...');
        const batch = writeBatch(db);
        const timestamp = new Date();

        try {
            // ... (keep logic same)
            // Seed Menu
            Object.entries(initialMenuData).forEach(([category, items]) => {
                items.forEach(item => {
                    const docRef = doc(collection(db, 'menu_items'));
                    batch.set(docRef, { ...item, category, createdAt: timestamp });
                });
            });

            // Seed Gallery
            initialGalleryData.forEach(item => {
                const docRef = doc(collection(db, 'gallery_items'));
                batch.set(docRef, { ...item, createdAt: timestamp });
            });

            // Seed Services
            initialServicesData.forEach(item => {
                const docRef = doc(collection(db, 'experiences'));
                batch.set(docRef, { ...item, createdAt: timestamp });
            });

            await batch.commit();
            setStatus('Done');
            alert('Database seeded successfully!');
        } catch (error) {
            console.error(error);
            setStatus('Error');
            alert('Failed to seed database: ' + error.message);
        }
    };

    return (
        <button
            onClick={seedData}
            className={customButtonClass}
            style={!customButtonClass ? { padding: '10px 20px', background: 'blue', color: 'white', cursor: 'pointer' } : {}}
            disabled={status === 'Seeding...'}
        >
            {status === 'Seeding...' ? 'Seeding...' : 'Seed Database (One Click)'}
        </button>
    );
}

export default DBSeeder;
