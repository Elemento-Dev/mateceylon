import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import './EventPopup.css';

const EventPopup = () => {
    const [event, setEvent] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const checkEvents = async () => {
            // Check if already seen in this session
            if (sessionStorage.getItem('eventPopupSeen')) {
                return;
            }

            try {
                const q = query(
                    collection(db, 'events'),
                    where('active', '==', true),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setEvent({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
                    // Small delay for animation
                    setTimeout(() => setShow(true), 1000);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        checkEvents();
    }, []);

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem('eventPopupSeen', 'true');
    };

    if (!event) return null;

    return (
        <div className={`event-popup-overlay ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="event-popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="event-popup-close" onClick={handleClose}>&times;</button>
                {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.title} className="event-popup-image" />
                )}
                <div className="event-popup-details">
                    <h3 className="event-popup-title">{event.title}</h3>
                    <p className="event-popup-description">{event.description}</p>
                    <button onClick={handleClose} className="event-popup-btn">
                        Close
                    </button>
                    {/* Could add a 'Lear More' link if event has a URL */}
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
