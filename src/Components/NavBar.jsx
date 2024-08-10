import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.png';

const NavBar = () => {
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    navigate('/');
  };

  const handleOrganizerClick = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent p-4 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 md:h-20" 
          />
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-4 md:space-x-8 mx-2 md:mx-16">
          <div className="relative group">
            <button className="text-black text-sm md:text-lg font-semibold hover:text-purple-700">
              About Us
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 md:w-56 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold text-gray-900">About Us</h3>
                <p className="text-xs md:text-sm text-gray-700">Learn more about our mission and values. We are dedicated to connecting volunteers with organizations that need their help.</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button 
              className="text-black text-sm md:text-lg font-semibold hover:text-purple-700"
              onClick={handleVolunteerClick}
            >
              Volunteer
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 md:w-56 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold text-gray-900">Volunteer</h3>
                <p className="text-xs md:text-sm text-gray-700">Explore various volunteer opportunities and make a difference in your community.</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button 
              className="text-black text-sm md:text-lg font-semibold hover:text-purple-700"
              onClick={handleOrganizerClick}
            >
              Organizer
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 md:w-56 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-lg font-bold text-gray-900">Organizer</h3>
                <p className="text-xs md:text-sm text-gray-700">Learn how to create and manage volunteer events and projects effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
