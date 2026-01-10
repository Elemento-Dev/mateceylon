import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import './Admin.css';

function ManageServices() {
    const { data: services, loading, addDocument, deleteDocument, updateDocument } = useFirestore('experiences');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '', // SVG string
        features: [''], // Array of strings
        packages: [], // Array of { name, price, guests }
        rooms: [], // Array of { name, capacity, price }
        schedule: '',
        pricing: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    // Packages Management
    const addPackage = () => {
        setFormData({ ...formData, packages: [...formData.packages, { name: '', price: '', guests: '' }] });
    };

    const updatePackage = (index, field, value) => {
        const newPackages = [...formData.packages];
        newPackages[index] = { ...newPackages[index], [field]: value };
        setFormData({ ...formData, packages: newPackages });
    };

    const removePackage = (index) => {
        const newPackages = formData.packages.filter((_, i) => i !== index);
        setFormData({ ...formData, packages: newPackages });
    };

    // Rooms Management
    const addRoom = () => {
        setFormData({ ...formData, rooms: [...formData.rooms, { name: '', capacity: '', price: '' }] });
    };

    const updateRoom = (index, field, value) => {
        const newRooms = [...formData.rooms];
        newRooms[index] = { ...newRooms[index], [field]: value };
        setFormData({ ...formData, rooms: newRooms });
    };

    const removeRoom = (index) => {
        const newRooms = formData.rooms.filter((_, i) => i !== index);
        setFormData({ ...formData, rooms: newRooms });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clean up empty fields
            const cleanedData = {
                ...formData,
                features: formData.features.filter(f => f.trim() !== ''),
            };

            if (isEditing) {
                await updateDocument(editId, cleanedData);
                setIsEditing(false);
                setEditId(null);
            } else {
                await addDocument(cleanedData);
            }
            resetForm();
            alert('Service saved successfully!');
        } catch (error) {
            console.error("Error saving service:", error);
            alert('Failed to save service.');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            icon: '',
            features: [''],
            packages: [],
            rooms: [],
            schedule: '',
            pricing: ''
        });
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            description: item.description,
            icon: item.icon || '',
            features: item.features || [''],
            packages: item.packages || [],
            rooms: item.rooms || [],
            schedule: item.schedule || '',
            pricing: item.pricing || ''
        });
        setIsEditing(true);
        setEditId(item.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await deleteDocument(id);
        }
    };

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading services...</div>;

    return (
        <AdminLayout title="Manage Services" subtitle="Configure experiences, packages, and rooms">

            <div className="admin-form">
                <h3 className="section-title">{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" required className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea required className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ height: '80px', resize: 'vertical' }} />
                    </div>
                    <div className="form-group">
                        <label>Icon (SVG Code)</label>
                        <textarea className="form-control" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} style={{ height: '60px', fontFamily: 'monospace', fontSize: '0.8rem' }} placeholder="<svg...>...</svg>" />
                    </div>

                    {/* Features */}
                    <div className="nested-section">
                        <label className="nested-label">Features</label>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="nested-item">
                                <input type="text" className="form-control" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Feature description" />
                                <button type="button" onClick={() => removeFeature(index)} className="btn-remove">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={addFeature} className="btn-add">+ Add Feature</button>
                    </div>

                    {/* Packages */}
                    <div className="nested-section">
                        <label className="nested-label">Packages</label>
                        {formData.packages.map((pkg, index) => (
                            <div key={index} className="nested-grid">
                                <input className="form-control" placeholder="Name" value={pkg.name} onChange={(e) => updatePackage(index, 'name', e.target.value)} />
                                <input className="form-control" placeholder="Price" value={pkg.price} onChange={(e) => updatePackage(index, 'price', e.target.value)} />
                                <input className="form-control" placeholder="Guests" value={pkg.guests} onChange={(e) => updatePackage(index, 'guests', e.target.value)} />
                                <button type="button" onClick={() => removePackage(index)} className="btn-remove">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={addPackage} className="btn-add">+ Add Package</button>
                    </div>

                    {/* Rooms */}
                    <div className="nested-section">
                        <label className="nested-label">Private Rooms (Optional)</label>
                        {formData.rooms.map((room, index) => (
                            <div key={index} className="nested-grid">
                                <input className="form-control" placeholder="Room Name" value={room.name} onChange={(e) => updateRoom(index, 'name', e.target.value)} />
                                <input className="form-control" placeholder="Capacity" value={room.capacity} onChange={(e) => updateRoom(index, 'capacity', e.target.value)} />
                                <input className="form-control" placeholder="Price" value={room.price} onChange={(e) => updateRoom(index, 'price', e.target.value)} />
                                <button type="button" onClick={() => removeRoom(index)} className="btn-remove">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={addRoom} className="btn-add">+ Add Room</button>
                    </div>

                    {/* Common Fields */}
                    <div className="nested-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="nested-label">Schedule Text</label>
                            <input type="text" className="form-control" value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} />
                        </div>
                        <div>
                            <label className="nested-label">Pricing Text</label>
                            <input type="text" className="form-control" value={formData.pricing} onChange={(e) => setFormData({ ...formData, pricing: e.target.value })} />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary" style={{ marginRight: '1rem' }}>{isEditing ? 'Update Service' : 'Add Service'}</button>
                        {isEditing && <button type="button" onClick={() => { setIsEditing(false); resetForm(); }} className="btn-primary" style={{ backgroundColor: '#444' }}>Cancel</button>}
                    </div>
                </form>
            </div>

            {/* List View */}
            <div className="admin-table-container">
                <h3 className="section-title">Existing Services</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(item => (
                            <tr key={item.id}>
                                <td style={{ fontWeight: 'bold' }}>{item.title}</td>
                                <td style={{ color: '#888' }}>{item.description.substring(0, 50)}...</td>
                                <td>
                                    <button onClick={() => handleEdit(item)} style={{ marginRight: '1rem', border: 'none', background: 'none', color: '#cd9f2b', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No services found. Add one above!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default ManageServices;
