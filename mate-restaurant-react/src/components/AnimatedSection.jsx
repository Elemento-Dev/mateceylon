import { useInView } from 'react-intersection-observer';

function AnimatedSection({ children, animation = 'fade-up', delay = 0, className = '' }) {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '50px 0px', // Pre-load slightly before view
    });

    return (
        <div
            ref={ref}
            className={`animated-section ${animation} ${inView ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default AnimatedSection;
