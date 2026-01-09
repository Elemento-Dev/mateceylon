import React from 'react';
import './OrderOnline.css';

const OrderOnline = () => {
    return (
        <section className="order-online">
            <div className="container">
                <h2>Enjoy Mate at Home</h2>
                <p>Order now through our delivery partners</p>
                <div className="order-buttons">
                    <a href="#" className="btn-outline">
                        Uber Eats
                    </a>
                    <a href="#" className="btn-outline">
                        PickMe Food
                    </a>
                </div>
            </div>
        </section>
    );
}

export default OrderOnline;
