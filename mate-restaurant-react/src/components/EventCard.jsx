function EventCard({ image, badge, title, description, link }) {
    return (
        <div className="event-card">
            <div className="event-image" style={{ backgroundImage: `url('${image}')` }}>
                <div className="event-badge">{badge}</div>
            </div>
            <div className="event-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={link} className="btn btn-primary">
                    {badge === 'Coming Soon' ? 'Book Your Table' : badge === 'Every Friday' ? 'Reserve Now' : 'Inquire Now'}
                </a>
            </div>
        </div>
    );
}

export default EventCard;
