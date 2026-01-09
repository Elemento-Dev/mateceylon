function PageHero({ title, subtitle, backgroundImage }) {
    return (
        <section
            className="page-hero"
            style={{ backgroundImage: `linear-gradient(rgba(4, 7, 7, 0.6), rgba(4, 7, 7, 0.6)), url('${backgroundImage}')` }}
        >
            <div className="page-hero-content">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </section>
    );
}

export default PageHero;
