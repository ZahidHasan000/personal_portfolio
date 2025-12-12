const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // imageUrl: {
  //   type: String,
  //   required: false,
  // },
  technology: {
    type: String,
  },
  note: {
    type: String,
  },
  backendLink: {
    type: String,

    // data: Buffer, // Store image data as Buffer
    // contentType: String // Store content type of the image

  },
  adminOnly: {
    type: Boolean,
    default: false
  }
}, { collection: 'Project' });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
