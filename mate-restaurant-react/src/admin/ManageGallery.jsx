import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useStorage } from '../hooks/useStorage';
import AdminLayout from './components/AdminLayout';
import './Admin.css';

function ManageGallery() {
    const { data: galleryItems, loading, addDocument, deleteDocument } = useFirestore('gallery_items');
    const { uploadFile, deleteFile } = useStorage();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('interior');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const categories = [
        { id: 'interior', name: 'Interior' },
        { id: 'food', name: 'Food' },
        { id: 'events', name: 'Events' },
        { id: 'team', name: 'Our Team' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an image file');
            return;
        }

        setUploading(true);
        try {
            const imageUrl = await uploadFile(file, 'gallery');
            await addDocument({
                title,
                category,
                url: imageUrl,
            });
            setTitle('');
            setFile(null);
            document.getElementById('fileInput').value = '';
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error("Error uploading image:", error);
            alert('Failed to upload image.');
        }
        setUploading(false);
    };

    const handleDelete = async (item) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await deleteFile(item.url);
                await deleteDocument(item.id);
            } catch (error) {
                console.error("Error removing image:", error);
            }
        }
    };

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading gallery...</div>;

    return (
        <AdminLayout title="Manage Gallery" subtitle="Curate your visual portfolio">

            {/* Upload Form */}
            <div className="admin-form">
                <h3 className="section-title">Upload New Image</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="form-group">
                        <label>Image Title</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Select Image</label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="form-control"
                            required
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ padding: '0.8rem' }}
                        />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="btn-primary"
                            style={{ opacity: uploading ? 0.7 : 1, cursor: uploading ? 'not-allowed' : 'pointer' }}
                        >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="gallery-grid">
                {galleryItems.map(item => (
                    <div key={item.id} className="gallery-item">
                        <img src={item.url} alt={item.title} />
                        <div className="gallery-info">
                            <h4 className="gallery-title">{item.title}</h4>
                            <p className="gallery-category">{item.category}</p>
                            <button
                                onClick={() => handleDelete(item)}
                                className="btn-delete-block"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {galleryItems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    No images found. Upload some to showcase your restaurant!
                </div>
            )}
        </AdminLayout>
    );
}

export default ManageGallery;
