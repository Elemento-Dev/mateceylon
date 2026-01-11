import { useState, useEffect } from 'react';
import { reservationService } from '../services/reservationService';
import AdminLayout from './components/AdminLayout';
import './Admin.css';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'declined'

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

    const filteredReservations = reservations.filter(res => {
        if (filter === 'all') return true;
        return res.status === filter;
    });

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading reservations...</div>;

    return (
        <AdminLayout title="Manage Reservations" subtitle="View and manage table bookings">
            <div className="admin-actions" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All</button>
                <button onClick={() => setFilter('pending')} className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
                <button onClick={() => setFilter('approved')} className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}>Approved</button>
                <button onClick={() => setFilter('declined')} className={`filter-btn ${filter === 'declined' ? 'active' : ''}`}>Declined</button>
            </div>

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
