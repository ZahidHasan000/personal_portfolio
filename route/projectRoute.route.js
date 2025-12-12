const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById } = require('../controller/projectController');
const router = express.Router();

router.get('/projects', getAllProjects);
router.get('/projects/:projectId', getProjectById);
router.put('/update-project/:projectId', updateProjectById);
router.delete('/delete-project/:projectId', deleteProjectById);
router.post('/save-project', createProject);

module.exports = router;