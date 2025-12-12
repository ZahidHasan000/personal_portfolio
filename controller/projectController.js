const Project = require('../model/projectModel');

const path = require("path");
// const multer = require('multer');
const fs = require('fs');

// const uploadDir = path.join(__dirname, '../public');

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname);
//   }
// });

// const uploadDir = path.join(__dirname, '../public');

// Make sure the directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB
//   fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith('image/')) {
//       cb(new Error('Only images allowed'), false);
//     }
//     cb(null, true);
//   }
// }).single('imageUrl');

// // Image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "../public/");
//     // Check if the directory exists, create it if it doesn't
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage

// }).single("imageUrl"); // Use "imageUrl" as the field name

// exports.createProject = async (req, res) => {
//   try {
//     upload(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer error:", err);
//         return res.status(400).json({ error: "File upload error" });
//       } else if (err) {
//         console.error("Upload error:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       const { title, description, link, technology, note, backendLink, adminOnly } = req.body;
//       const imageUrl = req.file ? req.file.filename : null;
//       // const imageUrl = req.file ? {
//       //   data: req.file.buffer,
//       //   contentType: req.file.mimetype
//       // } : null;

//       try {
//         const project = await Project.create({
//           title,
//           description,
//           link,
//           imageUrl,
//           technology,
//           note,
//           backendLink,
//           adminOnly

//         });
//         res.json(project);
//       } catch (error) {
//         console.error("Database error:", error);
//         res.status(500).json({ error: "Database error" });
//       }
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.createProject = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     try {
//       const project = await Project.create({
//         title: req.body.title,
//         description: req.body.description,
//         link: req.body.link,
//         technology: req.body.technology,
//         note: req.body.note,
//         backendLink: req.body.backendLink,
//         adminOnly: req.body.adminOnly,
//         // imageUrl: req.file ? `/uploads/${req.file.filename}` : null
//       });

//       res.status(201).json(project);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
// };

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      technology: req.body.technology,
      note: req.body.note,
      backendLink: req.body.backendLink,
      adminOnly: req.body.adminOnly
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    // res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller function to get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Error getting project by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateProjectById = async (req, res) => {

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      technology: req.body.technology,
      note: req.body.note,
      backendLink: req.body.backendLink,
      adminOnly: req.body.adminOnly
    };

    // if (req.file) {
    //   updateData.imageUrl = `/uploads/${req.file.filename}`;
    // }

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      updateData,
      { new: true }
    );

    res.json(project);
};

// exports.updateProjectById = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     const updateData = {
//       title: req.body.title,
//       description: req.body.description,
//       link: req.body.link,
//       technology: req.body.technology,
//       note: req.body.note,
//       backendLink: req.body.backendLink,
//       adminOnly: req.body.adminOnly
//     };

//     // if (req.file) {
//     //   updateData.imageUrl = `/uploads/${req.file.filename}`;
//     // }

//     const project = await Project.findByIdAndUpdate(
//       req.params.projectId,
//       updateData,
//       { new: true }
//     );

//     res.json(project);
//   });
// };

// Controller function to update a project by ID
// exports.updateProjectById = async (req, res) => {
//   try {
//     upload(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer error:", err);
//         return res.status(400).json({ error: "File upload error" });
//       } else if (err) {
//         console.error("Upload error:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       const { title, description, link, technology, note, backendLink, adminOnly } = req.body;
//       const imageUrl = req.file ? req.file.filename : null;
//       // const imageUrl = req.file ? {
//       //   data: req.file.buffer,
//       //   contentType: req.file.mimetype
//       // } : null;

//       try {
//         const { projectId } = req.params;
//         const updatedProject = await Project.findByIdAndUpdate(projectId, {
//           title,
//           description,
//           link,
//           imageUrl,
//           technology,
//           note,
//           backendLink,
//           adminOnly
//         }, { new: true });
//         if (!updatedProject) {
//           return res.status(404).json({ success: false, message: 'Project not found' });
//         }
//         res.status(200).json({ success: true, message: 'Project updated successfully', project: updatedProject });
//       } catch (error) {
//         console.error('Error updating project:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//       }
//     })
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }

// };


// Controller function to delete a project by ID
exports.deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // // Delete the associated image file from the public folder
    // if (deletedProject.imageUrl) {
    //   const imagePath = path.join(__dirname, '../public', deletedProject.imageUrl);
    //   fs.unlinkSync(imagePath);
    // }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
