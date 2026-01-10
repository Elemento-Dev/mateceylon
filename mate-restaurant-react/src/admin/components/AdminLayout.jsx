import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiGrid, FiImage, FiLayers, FiLogOut } from 'react-icons/fi';
import '../Admin.css';

function AdminLayout({ children, title, subtitle }) {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            {/* Fixed Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">MATE Admin</div>
                <nav className="admin-nav">
                    <ul>
                        <li>
                            <Link to="/admin/dashboard" className={`admin-nav-link ${isActive('/admin/dashboard')}`}>
                                <FiHome className="nav-icon" /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/menu" className={`admin-nav-link ${isActive('/admin/menu')}`}>
                                <FiGrid className="nav-icon" /> Manage Menu
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/gallery" className={`admin-nav-link ${isActive('/admin/gallery')}`}>
                                <FiImage className="nav-icon" /> Manage Gallery
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/services" className={`admin-nav-link ${isActive('/admin/services')}`}>
                                <FiLayers className="nav-icon" /> Manage Services
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut className="nav-icon" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1 className="admin-title">{title}</h1>
                        {subtitle && <p style={{ color: '#888', marginTop: '0.5rem' }}>{subtitle}</p>}
                    </div>
                    <div className="user-info">
                        Logged in as: <strong>{currentUser?.email}</strong>
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
