function ServiceItem({ icon, title, description }) {
    return (
        <div className="service-item">
            <div className="service-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default ServiceItem;
