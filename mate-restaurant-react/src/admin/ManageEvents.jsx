import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useStorage } from '../hooks/useStorage';
import AdminLayout from './components/AdminLayout';
import './Admin.css';

function ManageEvents() {
    const { data: events, loading, addDocument, deleteDocument, updateDocument } = useFirestore('events');
    const { uploadFile, deleteFile } = useStorage();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        active: true,
        imageUrl: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageUrl = formData.imageUrl;

            if (file) {
                // Upload new image
                try {
                    imageUrl = await uploadFile(file, 'events');
                } catch (uploadError) {
                    // If upload fails, we can check if they provided a URL manually
                    if (!formData.imageUrl) {
                        throw new Error("Image upload failed and no backup URL provided. " + uploadError.message);
                    }
                    console.warn("Upload failed, using provided URL instead:", uploadError);
                }
            }

            const dataToSave = { ...formData, imageUrl };

            if (isEditing) {
                await updateDocument(editId, dataToSave);
                setIsEditing(false);
                setEditId(null);
            } else {
                await addDocument(dataToSave);
            }

            setFormData({
                title: '',
                description: '',
                active: true,
                imageUrl: ''
            });
            setFile(null);
            document.getElementById('eventFileInput').value = '';
            alert('Event saved successfully!');
        } catch (error) {
            console.error("Error saving event:", error);
            alert(`Failed to save event: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteDocument(id);
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            description: item.description,
            active: item.active || false,
            imageUrl: item.imageUrl || ''
        });
        setIsEditing(true);
        setEditId(item.id);
        setFile(null);
        if (document.getElementById('eventFileInput')) document.getElementById('eventFileInput').value = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading events...</div>;

    return (
        <AdminLayout title="Manage Events" subtitle="Create and manage event popups">

            {/* Form */}
            <div className="admin-form">
                <h3 className="section-title">{isEditing ? 'Edit Event' : 'Add New Event'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

                    <div className="form-group">
                        <label>Event Title</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            required
                            className="form-control"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{ height: '100px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image Source</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input
                                id="eventFileInput"
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ padding: '0.8rem' }}
                            />
                            <div style={{ textAlign: 'center', color: '#888' }}>- OR -</div>
                            <input
                                type="text"
                                placeholder="Paste Image URL directly (if upload fails)"
                                className="form-control"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                        {formData.imageUrl && !file && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>
                                Preview: <img src={formData.imageUrl} alt="Preview" style={{ height: '30px', verticalAlign: 'middle' }} />
                                <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#cd9f2b', marginLeft: '10px' }}>View Full</a>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff' }}>
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                style={{ marginRight: '0.5rem', width: '20px', height: '20px' }}
                            />
                            Active (Show in popup)
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={uploading}
                            style={{ opacity: uploading ? 0.7 : 1 }}
                        >
                            {uploading ? 'Processing...' : (isEditing ? 'Update Event' : 'Add Event')}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ title: '', description: '', active: true, imageUrl: '' });
                                    setFile(null);
                                }}
                                style={{
                                    padding: '0.8rem 2rem',
                                    backgroundColor: '#444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    marginLeft: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </form>
            </div>

            {/* List */}
            <div className="admin-table-container">
                <h3 className="section-title">Existing Events</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>
                                    {event.imageUrl ? (
                                        <img src={event.imageUrl} alt={event.title} style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                                    ) : 'No Image'}
                                </td>
                                <td>
                                    <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#888' }}>{event.description.substring(0, 50)}...</div>
                                </td>
                                <td>
                                    <span style={{
                                        backgroundColor: event.active ? '#065f46' : '#444',
                                        color: event.active ? '#d1fae5' : '#aaa',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem'
                                    }}>
                                        {event.active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(event)}
                                        style={{ marginRight: '1rem', border: 'none', background: 'none', color: '#cd9f2b', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    );
}

export default ManageEvents;
