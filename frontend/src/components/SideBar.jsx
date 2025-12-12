// Sidebar.js
import './SideBar.css';
function Sidebar() {
  return (
    <div className="sidebar bg-gray-0 text-white w-9 h-full flex flex-col fixed top-3/4 left-0 transform -translate-y-1/2 pt-10 md:pt-10">
      <div className="follow  p-0.4 w-9 text-sm">Follow Me</div>
      <ul className="flex-1 overflow-y-auto">
        <li className="github p-2 w-9 hover:bg-gray-700 cursor-pointer"><a href="https://github.com/ZahidHasan000"><i className="fab fa-github"></i></a></li>
        <li className="twitter p-2 w-9 hover:bg-blue-500 cursor-pointer"><a href="https://twitter.com/Zahid1751403060"><i className="fab fa-twitter"></i></a></li>
        <li className="facebook p-2 w-9 hover:bg-blue-500 cursor-pointer"><a href="https://www.facebook.com/profile.php?id=100006849996705"><i className="fab fa-facebook"></i></a></li>
        <li className="linkedin p-2 w-9 hover:bg-blue-700 cursor-pointer"><a href="https://www.linkedin.com/in/md-zahid-hasan-6ba380117/"><i className="fab fa-linkedin"></i></a></li>
        <li className="whatsapp p-2 w-9 hover:bg-green-500 cursor-pointer"><a href="https://wa.me/+8801751403060"><i className="fab fa-whatsapp"></i></a></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;

