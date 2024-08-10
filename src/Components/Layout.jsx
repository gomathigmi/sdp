import { Box } from "@chakra-ui/react";
import Notification from "./Volunteer/Notification";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Chatdrawer from "./Volunteer/Chatdrawer";
import Dashboard from "./Volunteer/Dashboard";
import OrgProfile from "./Organisation/OrgProfile";
import Profile from "./Volunteer/Profile";
import OrgDashboard from "./Organisation/OrgDashboard";
import Media from "./Media"; // Import the Media component

import { UsedbContext } from "../Services/UseContext";
import { getUser } from "../Services/api";
import Application from "./Application";

function Layout() {
    const [isToggled, setIsToggled] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [isDash, setIsDash] = useState(true);
    const [isPost, setIsPost] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isMedia, setIsMedia] = useState(false); // Add state for media page

    const { isVolunteer, user, setdbUser } = UsedbContext();

    useEffect(() => {
        const getUserData = async () => {
            const u = await getUser(user.email);
            setdbUser(u);
        };
        getUserData();
    }, [setdbUser, user.email]);

    const onDashClick = () => {
        setIsDash(true);
        setIsPost(false);
        setIsProfile(false);
        setIsMedia(false); // Reset other states
    };

    const onPostClick = () => {
        setIsDash(false);
        setIsPost(true);
        setIsProfile(false);
        setIsMedia(false); // Reset other states
    };

    const onProfileClick = () => {
        setIsDash(false);
        setIsPost(false);
        setIsProfile(true);
        setIsMedia(false); // Reset other states
    };

    const onChatClick = () => {
        setIsToggled(!isToggled);
        setIsChat(!isChat);
    };

    const onNotificationClick = () => {
        setIsToggled(!isToggled);
        setIsNotification(!isNotification);
    };

    const onMainPageClick = () => {
        if (isToggled && (isNotification || isChat)) {
            setIsToggled(false);
            setIsNotification(false);
            setIsChat(false);
        }
    };

    const onMediaClick = () => {
        setIsDash(false);
        setIsPost(false);
        setIsProfile(false);
        setIsMedia(true); // Set media state to true
    };

    return (
        <>
            <Box className={`flex ${isToggled ? 'blur-sm' : ''}`} onClick={onMainPageClick}>
                {/* Sidebar */}
                <Box>
                    <Sidebar 
                        onNotificationClick={onNotificationClick}
                        onChatClick={onChatClick}
                        onDashClick={onDashClick}
                        onPostClick={onPostClick}
                        onProfileClick={onProfileClick}
                        onMediaClick={onMediaClick} // Pass media click handler
                    />
                </Box>
                {/* Main Content */}
                <Box className="w-full h-screen overflow-auto">
                    {isDash && (isVolunteer ? <Dashboard /> : <OrgDashboard />)}
                    {isPost && <Application />}
                    {isProfile && (isVolunteer ? <Profile /> : <OrgProfile />)}
                    {isMedia && <Media />} {/* Render Media component */}
                </Box>
            </Box>
            {isNotification && (
                <Box className="bg-white absolute top-5 w-8/12 ml-80 h-[600px] mt-6 rounded-[50px] shadow-lg">
                    <Notification />
                </Box>
            )}
            {isChat && (
                <Box className="bg-white absolute top-5 w-4/12 ml-96 h-[600px] mt-6 rounded-[50px] shadow-lg">
                    <Chatdrawer />
                </Box>
            )}
        </>
    );
}

export default Layout;
