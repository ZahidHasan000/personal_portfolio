import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BackGroundImage from './BackGround';
import Sidebar from './SideBar';
import http from '../http';
import './Project.css';



function Project() {
    const [projects, setProjects] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(12); // Number of projects per page

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    useEffect(() => {
        http.get(`/projects?_cache=` + Date.now())
            .then((res) => {
                setProjects(res.data.projects);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    return (
        <div className='project'>
            <Navbar />
            <div className='s'>
                <Sidebar />
                <div className='b'>
                    <BackGroundImage />

                    <div className='project-container'>

                        <div className='project-item text-white pt-2 pl-12 pr-12 pb-2'>

                            {/* {projects.map((item, index) => ( */}

                            {currentProjects.slice().reverse().map((item, index) => (
                                <div key={index}>

                                    {/* <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        {item.imageUrl ? (
                                            <div className="image-container">
                                                <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}${item.imageUrl}`} alt="" className="custom-image" />
                                                <h1 className="image-title"> View Project {item.title}</h1>
                                            </div>
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </a> */}
                                        {/* projectId */}
                                    <Link to={`/project/${item._id}`}>
                                        <div className="image-container">
                                            <img src={``}
                                                alt="" className="custom-image" />
                                            {/* <img src={`https://zahid-portfolio-1.onrender.com/${item.imageUrl}`}
                                                alt="" className="custom-image" /> */}
                                            {/* <img src={`http://localhost:5000/${item.imageUrl}`}
                                                alt="" className="custom-image" /> */}
                                            <h1 className="image-title">Details of {item.title}</h1>
                                        </div>
                                    </Link>

                                </div>
                            ))}
                        </div>


                        <div className='p'>
                            <nav>
                                <ul className='pagination pr-16'>
                                    <li className='page-item'>
                                        <button onClick={prevPage} className='page-link' disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                    </li>

                                    {[...Array(Math.ceil(projects.length / projectsPerPage)).keys()].map(number => (
                                        <li key={number} className='page-item'>
                                            <button onClick={() => paginate(number + 1)} className='page-link'>
                                                {number + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className='page-item'>
                                        <button onClick={nextPage} className='page-link' disabled={indexOfLastProject >= projects.length}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Project;





