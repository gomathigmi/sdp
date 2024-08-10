import { Avatar, Box, Button, Image, Input, Text } from "@chakra-ui/react";
import CountUp from 'react-countup';
import { MdOutlinePermMedia, MdEvent, MdArticle } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { GetPost, getUserById } from "../Services/api";
import { formatRelativeTime } from "../Services/Time";
import ReactPlayer from "react-player";
import { UsedbContext } from "../Services/UseContext";
import Create_S_Post from "./Create_S_post";

function Media({ setIsToggled, isToggled }) {
    const { dbUser } = UsedbContext();
    const [Posts, setPosts] = useState([]);
    const [createPost, setCreatePost] = useState(false);
    const videoref = useRef();
    const onCreate_s_post = () => {
        setCreatePost(!createPost);
    }

    useEffect(() => {
        const getPost = async () => {
            const post = await GetPost();
            const updatedpost = await Promise.all(
                post.map(async (item) => {
                    const user = await getUserById(item.userid);
                    item.avatar = user.avatar;
                    item.name = user.name;
                    return item;
                })
            );
            setPosts(updatedpost);
        }
        getPost();
    }, []);

    return (
        <>
            <Box className="w-full min-h-screen flex flex-col lg:flex-row p-4 gap-4 bg-customDarkBlue">
                {/* l1 */}
                <Box className="w-full lg:w-2/3 overflow-y-auto no-scrollbar">
                    {/* -----------create a post------- */}
                    <Box
                        onClick={() => onCreate_s_post()}
                        className="flex flex-col shadow-lg rounded-lg p-4 gap-4 bg-customBg"
                    >
                        {/* --------------header--------- */}
                        <Box className="flex gap-3 items-center">
                            <Avatar
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s"
                                size={'md'}
                            />
                            <Box className="w-full">
                                <Input
                                    borderRadius={"full"}
                                    _focus={{ boxShadow: 'none', outline: 'none' }}
                                    placeholder="What's on your mind?"
                                    width={"full"}
                                    cursor={'pointer'}
                                />
                            </Box>
                        </Box>
                        {/* ----------------footer------- */}
                        <Box className="flex gap-3 justify-center">
                            <Button className="flex items-center gap-2" colorScheme="gray.200" variant="ghost">
                                <MdOutlinePermMedia />
                                <Text>Media</Text>
                            </Button>
                            <Button className="flex items-center gap-2" colorScheme="gray.200" variant="ghost">
                                <MdEvent />
                                <Text>Event</Text>
                            </Button>
                            <Button className="flex items-center gap-2" colorScheme="gray.200" variant="ghost">
                                <MdArticle />
                                <Text>Article</Text>
                            </Button>
                        </Box>
                    </Box>
                    {/* --------------Post------------ */}
                    {Posts.map((item, index) => (
                        <Box
                            className="mt-4 flex flex-col gap-2 p-2 w-full rounded-lg shadow-lg bg-customBg"
                            key={index}
                        >
                            {/* ----head---- */}
                            <Box className="flex items-center gap-3">
                                <Avatar src={item.avatar} name={item.name} />
                                <Box>
                                    <Text className="font-semibold text-gray-200">{item.name}</Text>
                                    <Text className="text-sm text-gray-500">{formatRelativeTime(Number(item?.time))}</Text>
                                </Box>
                                <Button className="ml-auto" colorScheme="blue" variant="outline">Follow</Button>
                            </Box>
                            {/* --------body------ */}
                            <Box className="p-2">
                                <Text>{item?.msg}</Text>
                                {item.type === "image" && (
                                    <Image src={item.url} width={'100%'} maxWidth={'600px'} className="mt-2" borderRadius="lg" />
                                )}
                                {item.type === "video" && (
                                    <ReactPlayer url={item.url} ref={videoref} width='100%' />
                                )}
                            </Box>
                            {/* ---------footer---------- */}
                            <Box className="flex mt-2 justify-around">
                                <AiOutlineLike size={'30px'} color="white" />
                                <TfiCommentAlt size={'30px'} color="white" />
                                <BiRepost size={'30px'} color="white" />
                                <IoIosShareAlt size={'30px'} color="white" />
                            </Box>
                        </Box>
                    ))}
                </Box>
                {/* l2 */}
                <Box className="w-full lg:w-1/3 flex flex-col gap-4">
                    {/* ---------profile banner----- */}
                    <Box className="relative bg-customBg rounded-lg">
                        <Box className="flex justify-center font-semibold p-4 text-2xl text-custompink" cursor={'pointer'}>My Profile</Box>
                        {/* Banner and Image */}
                        <Box
                            bgImage="url('/public/b1.webp')"
                            bgSize="cover"
                            bgPosition="center"
                            className="w-full h-32 lg:h-40"
                            onClick={() => onCreate_s_post()}
                        />
                        <Box className="absolute top-24 lg:top-32 left-1/2 transform -translate-x-1/2">
                            <Avatar size={'xl'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s" />
                        </Box>
                        {/* Username and Slogan */}
                        <Box className="text-center px-4 mt-16">
                            <Text fontSize={'xl'} className="font-light">{dbUser?.name}</Text>
                            <Text fontSize={'lg'} className="font-light">✨ Volunteering: A Pathway to Purpose ✨</Text>
                        </Box>
                        {/* Following and Followers */}
                        <Box className="flex justify-center mt-6 gap-10">
                            <Box className="flex flex-col items-center">
                                <CountUp start={0} end={6000} duration={2.75} separator=",">
                                    {({ countUpRef }) => (
                                        <Text fontSize={'2xl'} className="font-bold" ref={countUpRef} />
                                    )}
                                </CountUp>
                                <Text fontSize={'lg'} className="font-light">Following</Text>
                            </Box>
                            <Box className="flex flex-col items-center">
                                <CountUp start={0} end={2000} duration={2.75} separator=",">
                                    {({ countUpRef }) => (
                                        <Text fontSize={'2xl'} className="font-bold" ref={countUpRef} />
                                    )}
                                </CountUp>
                                <Text fontSize={'lg'} className="font-light">Followers</Text>
                            </Box>
                        </Box>
                    </Box>

                    {/* -----------request to follow---- */}
                    <Box className="w-full h-auto shadow-xl p-4 bg-customBg rounded-lg">
                        <Text className="text-2xl font-semibold">Requests</Text>
                        {["Manish Devaraj", "SKCT_IOT", "Shruthi", "Dharshini Loganathan", "Amypo Technologies", "TATA Communications", "Madhumidha"].map((name, idx) => (
                            <Box key={idx} className="w-full mt-4 flex items-center hover:bg-customDarkBlue p-2 rounded-lg">
                                <Avatar />
                                <Text className="ml-2 font-light text-xl">{name}</Text>
                                <Button className="ml-auto" colorScheme="blue" variant="outline">Follow</Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
                {createPost && <Box className="bg-customDarkBlue absolute top-5 w-full lg:w-2/5 h-[600px] mt-6 ml-32 rounded-[50px] shadow-lg">
                    <Create_S_Post onCreate_s_post={onCreate_s_post} />
                </Box>}
            </Box>
        </>
    )
}

export default Media;
