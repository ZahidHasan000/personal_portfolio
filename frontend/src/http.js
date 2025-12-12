import axios from "axios";
export default axios.create({
  baseURL: '/api/'
});
// export default axios.create({
//   // baseURL: `${'https://zahid-portfolio-1.onrender.com/api/'}`,
//   baseURL: `${'http://localhost:5000/api/'}`,
//   // baseURL: `${process.env.REACT_APP_GET_BASE_URL}`,
//   // baseURL: import.meta.env.VITE_API_BASE_URL,
//   // headers: {
//   //   // "Content-Type": "application/json",
//   //   'Content-Type': 'multipart/form-data'
//   // }
// });

