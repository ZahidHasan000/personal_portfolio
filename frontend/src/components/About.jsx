import Navbar from './Navbar';
import BackGroundImage from './BackGround';
import Skill from './Skill';
import CV from "../assets/updated.pdf";
import Sidebar from './SideBar';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <Navbar />
            <div className="relative flex">
                <Sidebar />
                <div className="flex-1">
                    <BackGroundImage />
                    <div className="about mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 m-0 p-0">
                        <div className="about-2 mt-8 md:mt-8 pt-8 md:pt-8 ml-8 md:ml-8 pl-8 md:pl-8 text-left">
                            <h2 className='summary'>Summary</h2>
                            <p>I am a Software Developer with over two years of hands-on experience building scalable, user-focused, and data-driven applications. I’m passionate about creating products that solve real-world problems and bring meaningful impact to businesses and users alike. My work spans across frontend, backend, ERP development, and AI/data-driven systems, giving me the versatility to work on end-to-end software solutions. I value clean architecture, modern development practices, and delivering reliable, production-ready features.I enjoy collaborating in teams, contributing to communities, and continuously learning to stay ahead in a fast-evolving tech landscape.</p>
                            <div className='resume mt-3 pt-3'>
                                <a href={CV} download className="button">
                                    <span className="text-green-500 hover:text-green-700">Download My CV</span>
                                </a>
                            </div>
                        </div>
                        <div className="skill mt-14 sm:mt-16 pt-14 sm:pt-16 text-center">
                            <Skill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;





