// import React from 'react';
import BackGroundImage from '../../src/assets/bg.png';
import './BackGround.css'; // Import your existing CSS file
import Animation from './Animation';


function BackGround() {
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-[-1] shadow-overlay" style={{ backgroundImage: `url(${BackGroundImage})` }}>

                <Animation />

            </div>
        </div>


    );
}

export default BackGround;


