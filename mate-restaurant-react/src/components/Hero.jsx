import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const playerRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Create player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('hero-video', {
                videoId: '3Kuk5Y2YIjg',
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    disablekb: 1,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    start: 9,
                },
                events: {
                    onReady: (event) => {
                        event.target.playVideo();
                        // Check playback position every 1s (sufficient for background video)
                        intervalRef.current = setInterval(() => {
                            if (playerRef.current && playerRef.current.getCurrentTime) {
                                const currentTime = playerRef.current.getCurrentTime();
                                if (currentTime >= 85) {
                                    playerRef.current.seekTo(9);
                                }
                            }
                        }, 1000);
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            event.target.seekTo(9);
                            event.target.playVideo();
                        }
                    }
                }
            });
        };

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className="hero">
            <div className="hero-video-container">
                <div id="hero-video" className="hero-video"></div>
                <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
                <h1>Mate Sri Lanka</h1>
                <p className="subtitle">EXPERIENCE EXCEPTIONAL AUSTRALIAN FUSION</p>
                <div className="cta-wrapper">
                    <a href="/menu" className="btn-link" style={{ color: '#fff', borderBottomColor: '#fff' }}>
                        VIEW MENU
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
