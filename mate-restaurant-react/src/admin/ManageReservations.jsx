import { useState, useEffect } from 'react';
import { reservationService } from '../services/reservationService';
import AdminLayout from './components/AdminLayout';
import './Admin.css';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'declined'
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newReservation, setNewReservation] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 2
    });

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getAllReservations();
            setReservations(data);
        } catch (error) {
            console.error("Failed to load reservations", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        // Simple confirmation can be added back if needed, but keeping it direct for reliability now.
        // if (!window.confirm(`Are you sure you want to ${newStatus} this reservation?`)) return;

        try {
            await reservationService.updateStatus(id, newStatus);

            // Optimistic update
            setReservations(prev => prev.map(res =>
                res.id === id ? { ...res, status: newStatus } : res
            ));
        } catch (error) {
            console.error("Update status failed:", error);
            alert("Failed to update status");
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await reservationService.createReservation(newReservation);
            setReservations([res, ...reservations]);
            setShowCreateModal(false);
            setNewReservation({ name: '', phone: '', email: '', date: '', time: '', guests: 2 });
            alert("Reservation created successfully!");
        } catch (error) {
            console.error("Create failed:", error);
            alert("Failed to create reservation");
        }
    };

    const filteredReservations = reservations.filter(res => {
        if (filter === 'all') return true;
        return res.status === filter;
    });

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading reservations...</div>;

    return (
        <AdminLayout title="Manage Reservations" subtitle="View and manage table bookings">
            <div className="admin-actions" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All</button>
                    <button onClick={() => setFilter('pending')} className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
                    <button onClick={() => setFilter('approved')} className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}>Approved</button>
                    <button onClick={() => setFilter('declined')} className={`filter-btn ${filter === 'declined' ? 'active' : ''}`}>Declined</button>
                </div>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    + New Reservation
                </button>
            </div>

            {/* Create Reservation Modal */}
            {showCreateModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="modal-content" style={{
                        background: '#1a1a1a', padding: '2rem', borderRadius: '8px',
                        border: '1px solid #cd9f2b', width: '90%', maxWidth: '500px'
                    }}>
                        <h3 style={{ color: '#cd9f2b', marginBottom: '1.5rem' }}>Manual Reservation</h3>
                        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Guest Name"
                                required
                                className="form-control"
                                value={newReservation.name}
                                onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    required
                                    className="form-control"
                                    value={newReservation.phone}
                                    onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email (Optional)"
                                    className="form-control"
                                    value={newReservation.email}
                                    onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="date"
                                    required
                                    className="form-control"
                                    value={newReservation.date}
                                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                                />
                                <input
                                    type="time"
                                    required
                                    className="form-control"
                                    value={newReservation.time}
                                    onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Guests"
                                min="1"
                                required
                                className="form-control"
                                value={newReservation.guests}
                                onChange={(e) => setNewReservation({ ...newReservation, guests: parseInt(e.target.value) })}
                            />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create</button>
                                <button type="button" onClick={() => setShowCreateModal(false)} style={{
                                    flex: 1, padding: '0.8rem', background: '#333', color: 'white',
                                    border: 'none', borderRadius: '4px', cursor: 'pointer'
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Guest Details</th>
                            <th>Date & Time</th>
                            <th>Guests</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No reservations found.</td>
                            </tr>
                        ) : (
                            filteredReservations.map(res => (
                                <tr key={res.id}>
                                    <td>
                                        <div style={{ fontWeight: 'bold', color: '#fff' }}>{res.name}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#888' }}>{res.phone}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#888' }}>{res.email}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>Requested: {res.createdAt?.toLocaleString()}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{res.date}</div>
                                        <div style={{ color: '#cd9f2b' }}>{res.time}</div>
                                    </td>
                                    <td>{res.guests}</td>
                                    <td>
                                        <span className={`status-badge ${res.status}`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {res.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(res.id, 'approved')}
                                                        style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(res.id, 'declined')}
                                                        style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                            {res.status !== 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(res.id, 'pending')}
                                                    style={{ background: 'transparent', border: '1px solid #666', color: '#aaa', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Revert
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ManageReservations;
