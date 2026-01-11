import React, { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase/config';
import AdminLayout from './components/AdminLayout';
import { FiGrid, FiImage, FiLayers, FiCalendar } from 'react-icons/fi';
import './Admin.css';

function Dashboard() {
    const [stats, setStats] = useState({ menu: 0, gallery: 0, services: 0, reservations: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const menuCount = await getCountFromServer(collection(db, 'menu_items'));
                const galleryCount = await getCountFromServer(collection(db, 'gallery_items'));
                const servicesCount = await getCountFromServer(collection(db, 'experiences'));
                const reservationsCount = await getCountFromServer(collection(db, 'reservations'));

                setStats({
                    menu: menuCount.data().count,
                    gallery: galleryCount.data().count,
                    services: servicesCount.data().count,
                    reservations: reservationsCount.data().count
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <AdminLayout title="Dashboard Overview" subtitle="Welcome back to your control center">
            <div className="stats-grid">
                {/* Stat Cards */}
                <div className="stat-card">
                    <div className="stat-content">
                        <h3 className="stat-title">Menu Items</h3>
                        <p className="stat-value">{stats.menu}</p>
                    </div>
                    <FiGrid className="stat-icon" />
                </div>
                <div className="stat-card">
                    <div className="stat-content">
                        <h3 className="stat-title">Gallery Images</h3>
                        <p className="stat-value">{stats.gallery}</p>
                    </div>
                    <FiImage className="stat-icon" />
                </div>
                <div className="stat-card">
                    <div className="stat-content">
                        <h3 className="stat-title">Active Services</h3>
                        <p className="stat-value">{stats.services}</p>
                    </div>
                    <FiLayers className="stat-icon" />
                </div>
                <div className="stat-card">
                    <div className="stat-content">
                        <h3 className="stat-title">Reservations</h3>
                        <p className="stat-value">{stats.reservations}</p>
                    </div>
                    <FiCalendar className="stat-icon" />
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
