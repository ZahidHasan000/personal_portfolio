import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import BackGround from './BackGround';
import Sidebar from './SideBar';
import Typewriter from 'typewriter-effect'; // Import the Typewriter component
import './Home.css';

function Home() {
    const [texts] = useState(['Full Stack Developer' , 'Odoo Developer', 'Backend Engineer', 'Problem Solver']); // Define an array of strings for the Typewriter effect

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div className="home min-h-screen">
            <Navbar />
            <Sidebar />
            <BackGround />
            <div className="caption">

                <div className="box custom-border overflow-hidden">
                    <div className="custom-text text-left px-0">
                        <h4 className="text text-white">
                            <Typewriter
                                options={{
                                    strings: ["Hello, I'm"],
                                    autoStart: true,
                                    cursor: '',
                                    loop: false, // Disable looping for the introductory text
                                    deleteSpeed: Infinity,
                                }}
                            />
                        </h4>
                    </div>
                    <div className="custom-name text-center">
                        <h1 id='name' className="text text-white">
                            <Typewriter
                                options={{
                                    strings: ["Zahid Hasan"],
                                    autoStart: true,
                                    cursor: '.',
                                    loop: false,
                                    deleteSpeed: Infinity,
                                }}
                            />
                        </h1>
                    </div>
                    <div className="custom-pos text-right px-11">
                        <div className="text-white">
                            <Typewriter
                                options={{
                                    strings: texts,
                                    autoStart: true,
                                    cursor: '!',
                                    loop: true,
                                    deleteSpeed: 50,
                                }}
                                className="text-base md:text-lg lg:text-xl xl:text-2xl "
                            />
                        </div>
                    </div>
                </div>


            </div>
            {/* </section> */}
        </div>
    );
}

export default Home;

