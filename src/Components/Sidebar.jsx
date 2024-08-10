import { Avatar, Box, Text, IconButton } from "@chakra-ui/react";
import { RiDashboardFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { SiSparkpost } from "react-icons/si";
import { IoMdLogOut } from "react-icons/io";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import logoImage from '../assets/Images/sidebarLogo.png'; // Ensure this path is correct
import PropTypes from 'prop-types';
import { UsedbContext } from "../Services/UseContext";
import { useNavigate } from "react-router-dom";
import { CgMediaLive } from "react-icons/cg";

function Sidebar({ onNotificationClick, onChatClick, onProfileClick, onPostClick, onDashClick, onMediaClick}) {
  const navigate = useNavigate();
  const { logout } = UsedbContext();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    logout();
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box
      width={["60px", "60px", "80px"]} // Responsive width
      height="100vh"
      bg="#121643" // Gradient background
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop="1rem"
    >
      {/* Logo */}
      <Box
        bgImage={`url(${logoImage})`}
        bgSize="cover"
        bgPosition="center"
        width={["30px", "40px", "50px"]} // Responsive logo size
        height={["30px", "40px", "50px"]}
        mt={5}
        onClick={handleLogoClick}
        cursor="pointer"
      />

      {/* Menu */}
      <Box as="nav" mt={5} flex="1" display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={5}
          p={1}
        >
          <IconButton
            aria-label="Dashboard"
            icon={<RiDashboardFill size="24px" />}
            variant="ghost"
            color="orange"
            size="lg"
            onClick={onDashClick}
            cursor="pointer"
            _hover={{ bg: "#1e2842", borderRadius: "md" }}
          />
          <Text fontSize="xs" fontWeight="semibold" color="orange">Dashboard</Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={5}
          p={1}
        >
          <IconButton
            aria-label="Posts"
            icon={<SiSparkpost size="24px" />}
            variant="ghost"
            color="orange"
            size="lg"
            cursor="pointer"
            _hover={{ bg: "#1e2842", borderRadius: "md" }}
            onClick={onPostClick}
          />
          <Text fontSize="xs" fontWeight="semibold" color="orange">Posts</Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={5}
          p={1}
        >
          <IconButton
            aria-label="Media"
            icon={<CgMediaLive size="24px" />}
            variant="ghost"
            color="orange"
            size="lg"
            cursor="pointer"
            _hover={{ bg: "#1e2842", borderRadius: "md" }}
            onClick={onMediaClick}
          />
          <Text fontSize="xs" fontWeight="semibold" color="orange">Media</Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={5}
          p={2}
        >
          <IconButton
            aria-label="Notifications"
            icon={<CiHeart size="24px" />}
            variant="ghost"
            color="orange"
            size="lg"
            cursor="pointer"
            _hover={{ bg: "#1e2842", borderRadius: "md" }}
            onClick={onNotificationClick}
          />
          <Text fontSize="xs" fontWeight="semibold" color="orange">Notifications</Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={5}
          p={1}
        >
          <IconButton
            aria-label="Chats"
            icon={<BsFillChatSquareTextFill size="24px" />}
            variant="ghost"
            color="orange"
            size="lg"
            cursor="pointer"
            _hover={{ bg: "#1e2842", borderRadius: "md" }}
            onClick={onChatClick}
          />
          <Text fontSize="xs" fontWeight="semibold" color="orange">Chats</Text>
        </Box>

        {/* Spacer */}
        <Box flex="1" />

        {/* Profile and Logout */}
        <Box mb={["1cm", "1cm", "0.1cm"]}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
          >
            <IconButton
              aria-label="Profile"
              icon={<Avatar
                src="https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys-thumbnail.jpg"
                size="sm"
              />}
              variant="ghost"
              color="orange"
              size="lg"
              onClick={onProfileClick}
              cursor="pointer"
              _hover={{ bg: "#1e2842", borderRadius: "md" }}
            />
            <Text fontSize="xs" fontWeight="semibold" color="orange">Profile</Text>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={1}
          >
            <IconButton
              aria-label="Log Out"
              icon={<IoMdLogOut size="24px" />}
              variant="ghost"
              color="orange"
              size="lg"
              cursor="pointer"
              _hover={{ bg: "#1e2842", borderRadius: "md" }}
              onClick={handleLogout}
            />
            <Text fontSize="xs" fontWeight="semibold" color="orange">Log Out</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  onNotificationClick: PropTypes.func.isRequired,
  onChatClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  onPostClick: PropTypes.func.isRequired,
  onDashClick: PropTypes.func.isRequired,
  onMediaClick: PropTypes.func.isRequired,
};

export default Sidebar;
