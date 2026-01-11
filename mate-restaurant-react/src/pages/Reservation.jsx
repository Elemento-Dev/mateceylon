import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { reservationService } from '../services/reservationService';
import 'react-calendar/dist/Calendar.css';
import './Reservation.css';

const Reservation = () => {
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        guests: 2,
        time: '19:00'
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Format date to YYYY-MM-DD for consistency
        const dateString = date.toLocaleDateString('en-CA'); // YYYY-MM-DD

        try {
            await reservationService.createReservation({
                ...formData,
                date: dateString,
                guests: parseInt(formData.guests)
            });
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', guests: 2, time: '19:00' });
        } catch (error) {
            console.error("Error submitting reservation:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reservation-page">
            <div className="page-hero" style={{ backgroundImage: "url('/gallery/interior-1.jpg')" }}>
                <div className="page-hero-content">
                    <h1>Reserve Your Table</h1>
                    <p>Experience the exceptional at Mate Restaurant</p>
                </div>
            </div>

            <div className="reservation-container">
                <div className="reservation-section">
                    <h2>Select Date</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        minDate={new Date()}
                        className="custom-calendar"
                    />
                    <p style={{ marginTop: '1rem', color: '#888', textAlign: 'center' }}>
                        Selected: {date.toDateString()}
                    </p>
                </div>

                <div className="reservation-section">
                    <h2>Reservation Details</h2>
                    <form onSubmit={handleSubmit} className="reservation-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="+94 7X XXX XXXX"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Number of Guests</label>
                            <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleInputChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>{num} Guests</option>
                                ))}
                                <option value="11">10+ (Please call us)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Preferred Time</label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                            >
                                <option value="12:00">12:00 PM (Lunch)</option>
                                <option value="13:00">01:00 PM (Lunch)</option>
                                <option value="14:00">02:00 PM (Lunch)</option>
                                <option value="18:00">06:00 PM (Dinner)</option>
                                <option value="19:00">07:00 PM (Dinner)</option>
                                <option value="20:00">08:00 PM (Dinner)</option>
                                <option value="21:00">09:00 PM (Dinner)</option>
                                <option value="22:00">10:00 PM (Dinner)</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Confirm Reservation'}
                        </button>

                        {status === 'success' && (
                            <div className="success-message">
                                <h3>Request Sent!</h3>
                                <p>We have received your reservation request. We will contact you shortly to confirm.</p>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="error-message">
                                <p>Something went wrong. Please try again or call us directly.</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
