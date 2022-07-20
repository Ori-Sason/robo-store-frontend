import React from 'react';
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { GoogleMap } from '../cmps/google-map'
export const AboutPage = () => {

    const markers = useRef([
        { title: 'Tel-Aviv', lat: 32.109333, lng: 34.855499 },
        { title: 'Hadera', lat: 32.434046, lng: 34.919652 },
        { title: 'Bat Yam', lat: 32.013186, lng: 34.748019 },
    ])

    return (
        <section className="about-page main-layout">
            <h1 className='page-header'>About us</h1>
            <p><Link to='/robots'>Robo Store</Link> is a <span className='fake'>fake</span> robot retailer.</p>
            <p>We ship our products all over the world.</p>
            <p>The company's stores are located in Israel.</p>
            <GoogleMap markers={markers.current} defaultLocation={{ lat: 32.209333, lng: 34.855499 }} />
        </section>
    );
}