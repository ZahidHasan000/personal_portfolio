import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import BackGroundImage from './BackGround';
import Sidebar from './SideBar';
import http from '../http';
import './ProjectDetails.css';

// Hardcoded admin password/key
const ADMIN_KEY = 'zahid3060';

function ProjectDetails() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Check if admin parameter matches
    const isAdmin = searchParams.get('admin') === ADMIN_KEY;

    const [editedProject, setEditedProject] = useState({
        title: '',
        description: '',
        technology: '',
        link: '',
        note: '',
        backendLink: '',
    });

    useEffect(() => {
        console.log('Fetching project with ID:', id); // Debug log

        http.get(`/projects/${id}`)
            .then((res) => {
                console.log('API Response:', res.data); // Debug log to see structure

                // Handle different response structures
                const projectData = res.data.project || res.data;

                setProject(projectData);
                setEditedProject({
                    title: projectData.title || '',
                    description: projectData.description || '',
                    technology: projectData.technology || '',
                    link: projectData.link || '',
                    note: projectData.note || '',
                    backendLink: projectData.backendLink || '',
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching project:', err);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className='project-details'>
                <Navbar />
                <div className='s'>
                    <Sidebar />
                    <div className='b'>
                        <BackGroundImage />
                        <div className="loading">Loading project details...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className='project-details'>
                <Navbar />
                <div className='s'>
                    <Sidebar />
                    <div className='b'>
                        <BackGroundImage />
                        <div className="error">Project not found</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='project-details'>
            <Navbar />
            <div className='s'>
                <Sidebar />
                <div className='b'>
                    <BackGroundImage />

                    <div className='details-card'>
                        {/* {project.imageUrl && (
                                <img 
                                    src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}${project.imageUrl}`} 
                                    alt={project.title || 'Project image'} 
                                    className="project-detail-image" 
                                />
                            )} */}
                        <div className='project-details-container'>
                            {/* <Link to="/project" className="back-button">← Back to Projects</Link> */}
                            <Link to="/project" className="back-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 inline mr-2"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 1 0 1.5h-5.69l1.72 1.72a.75.75 0 1 0 1.06 1.06l-3-3Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Back to Projects
                            </Link>
                        </div>

                        <div className='details-content'>
                            {/* Project Title */}
                            <div className='detail-field'>
                                <label>Project Name:</label>
                                {isEditing && isAdmin ? (
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedProject.title}
                                        onChange={handleInputChange}
                                        className="edit-input"
                                    />
                                ) : (
                                    <h1>{project.title || 'Untitled Project'}</h1>
                                )}
                            </div>

                            {/* Project Description */}
                            <div className='detail-field'>
                                <label>Project Description:</label>
                                {isEditing && isAdmin ? (
                                    <textarea
                                        name="description"
                                        value={editedProject.description}
                                        onChange={handleInputChange}
                                        rows="5"
                                        className="edit-input"
                                    />
                                ) : (
                                    <p className="description-text">
                                        {project.description || 'No description available'}
                                    </p>
                                )}
                            </div>

                          
                            <div className='detail-field'>
                                <label>Used Technology:</label>
                                {isEditing && isAdmin ? (
                                    <input
                                        type="text"
                                        name="technology"
                                        value={editedProject.technology}
                                        onChange={handleInputChange}
                                        className="edit-input"
                                        placeholder="e.g., React, Node.js, MongoDB"
                                    />
                                ) : (
                                    <p className="technology-text">
                                        {project.technology || 'Not specified'}
                                    </p>
                                )}
                            </div>

                         
                            <div className='detail-field'>
                                <label>Project Link:</label>
                                {isEditing && isAdmin ? (
                                    <input
                                        type="url"
                                        name="link"
                                        value={editedProject.link}
                                        onChange={handleInputChange}
                                        className="edit-input"
                                        placeholder="https://example.com"
                                    />
                                ) : (
                                    project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link-btn"
                                        >
                                            Visit Project →
                                        </a>
                                    ) : (
                                        <p>No link available</p>
                                    )
                                )}
                            </div>

                            <div className='detail-field'>
                                <label>Note:</label>
                                {isEditing && isAdmin ? (
                                    <>
                                        <textarea
                                            name="note"
                                            value={editedProject.note}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                            placeholder="Add project notes..."
                                            rows="3"
                                        />
                                        <input
                                            type="url"
                                            name="backendLink"
                                            value={editedProject.backendLink}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                            placeholder="https://github.com/backend-repo"
                                            style={{ marginTop: '10px' }}
                                        />
                                    </>
                                ) : (
                                    <div className='note-content-wrapper'>
                                        {project.note && (
                                            <p className="note-text" style={{ marginBottom: '15px' }}>
                                                {project.note}
                                            </p>
                                        )}
                                        {project.backendLink && (
                                            <a
                                                href={project.backendLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="backend-link-btn"
                                            >
                                                Run This Server
                                            </a>
                                        )}
                                        {!project.note && !project.backendLink && (
                                            <p></p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;