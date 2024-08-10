import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    Image,
    Input,
    Text,
    Textarea,
  } from "@chakra-ui/react";
  import { GiBurningDot } from "react-icons/gi";
  import { CiCirclePlus } from "react-icons/ci";
  import { IoSend } from "react-icons/io5";
  import { UsedbContext } from "../Services/UseContext";
  import { useEffect, useState } from "react";
  import { CreateApplication, GetApplication } from "../Services/api";
  import { FaCloudDownloadAlt } from "react-icons/fa";
  function Application() {
    const { isVolunteer, upload_brouche_firbase, dbUser } = UsedbContext();
  
    const [isApplication, setisApplication] = useState(false);
  
    const [isApply,setisApply] = useState(false);
    
    const [brouche, setbrouche] = useState(null);
    const [cover, setcover] = useState(null);
  
    const [eventname, seteventname] = useState("");
    const [eventtime, seteventtime] = useState("");
    const [eventdes, seteventdes] = useState("");
  
    const [applications, setapplications] = useState([]);
  
    useEffect(() => {
      const getallapplication = async () => {
        const res = await GetApplication();
        setapplications(res);
      };
      getallapplication();
    }, []);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setbrouche(file);
        console.log(file); // Handle the file here
      }
    };
    const handleFileChange2 = (event) => {
      const file = event.target.files[0];
      if (file) {
        setcover(file);
        console.log(file); // Handle the file here
      }
    };
  
    const handelsend = async () => {
      const name = brouche.name + Date.now();
      const brou = await upload_brouche_firbase(brouche, name, "brouche");
      const cov = await upload_brouche_firbase(cover, name, "cover");
  
      await CreateApplication({
        url: cov,
        description: eventdes,
        organizerid: dbUser.id,
        eventname: eventname,
        brouche: brou,
        time: eventtime,
      });
  
      setisApplication(false);
    };
   
    const [applyname,setapplyname]=useState('');
    const [applydes,setapplydes]=useState('');
    const onApplyClick=(item)=>
    {
      console.log(item);
       setisApply(!isApply);
       setapplydes(item.description);
       setapplyname(item.eventname);
    }
  
    const handleEventNameChange = (e) => seteventname(e.target.value);
    const handleEventTimeChange = (e) => seteventtime(e.target.value);
    const handleEventDesChange = (e) => seteventdes(e.target.value);
  
    return (
      <>
        <Box className="w-full h-[93vh] flex bg-customBg">
          {/* Left Section */}
          <Box className="w-8/12 h-full p-4 overflow-auto no-scrollbar">
            {/* Event Header */}
            <Text className="text-3xl font-pblack">Event</Text>
  
            {/* Event Cards */}
            <Grid templateColumns="repeat(3, 1fr)" gap={6} className="w-full overflow-auto">
              {applications.map((item, index) => (
                <Box
                  className=" w-full rounded-3xl mt-1 shadow-2xl"
                  key={index}
                >
                  <Image
                    src={item?.url}
                    w={"full"}
                    borderTopRadius={"20px"}
                  />
                  <Box className="p-4">
                    <Text className="text-2xl font-pmedium mt-1">
                      {item?.eventname}
                    </Text>
                    <Text className="text-xl font-pmedium mt-1">
                      {item?.time}
                    </Text>
                    <Box className="flex items-center gap-1">
                      <Button
                        colorScheme="transparent"
                        className="bg-custompink hover:opacity-50"
                      >
                        32 members
                      </Button>
                      <AvatarGroup size="md" className="ml-auto">
                        <Avatar
                          name="Ryan Florence"
                          src="https://bit.ly/ryan-florence"
                        />
                        <Avatar
                          name="Segun Adebayo"
                          src="https://bit.ly/sage-adebayo"
                        />
                        <Avatar
                          name="Kent Dodds"
                          src="https://bit.ly/kent-c-dodds"
                        />
                      </AvatarGroup>
                    </Box>
                    {isVolunteer?<Box><Button className="w-full mt-2"  colorScheme="blue" onClick={()=>onApplyClick(item)}>Apply</Button></Box>:null}
                    <Box className="flex justify-center items-center mt-1">
                      <GiBurningDot
                        size={"20px"}
                        className="text-center text-green-500"
                      />
                      <Text className="text-center text-green-500">
                        Upcoming
                      </Text>
                      <Box cursor={'pointer'} className="ml-auto"
                      
                      >
                       <a href={item.brouche} download target="_blank" rel="noopener noreferrer">
                    <FaCloudDownloadAlt className="text-custompink" size={'20px'} />
                        </a>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
              ))}
            </Grid>
          </Box>
  
          {/* Right Section */}
          <Box className="w-4/12 h-[80vh] bg-white mr-4 mt-5 rounded-xl p-3">
            {/* Completed Events Header */}
            <Text className="text-3xl font-pblack mt-4">Completed Events</Text>
            <Box className="w-full h-60 overflow-y-auto no-scrollbar">
              {/* Completed Event Cards */}
              <Box className="flex items-center p-4 rounded-xl hover:bg-gray-100">
                <Avatar />
                <Box>
                  <Text className="text-xl font-medium text-center ml-2">
                    THE NYC
                  </Text>
                </Box>
                <Box className="flex ml-9">
                  <Text className=" text-xl font-medium text-gray-400">
                    20 members
                  </Text>
                </Box>
  
                <Text className="ml-4 text-xl font-medium">Coimbatore</Text>
              </Box>
            </Box>
          </Box>
        </Box>
  
        {/* Create Event Button */}
        {!isVolunteer && (
          <Box
            className="absolute bottom-16 right-10"
            cursor={"pointer"}
            onClick={() => setisApplication(!isApplication)}
          >
            <CiCirclePlus size={"60px"} className="text-custompink" />
          </Box>
        )}
  
        {/* Create Event Form */}
        {isApplication && (
          <Box className=" absolute top-5 w-4/12 ml-96 h-[660px] mt-6 rounded-[50px] shadow-lg p-6 overflow-y-auto no-scrollbar">
            <Box className="w-full h-full ">
              <Text className="text-3xl font-pblack text-center">
                Create a Event
              </Text>
              <Box borderBottom={"1px solid black"} className="ml-4" />
              {/* Event Form */}
              <Box>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Event Name"
                  _focus={{ boxShadow: "none", outline: "none", border: "none" }}
                  border={"none"}
                  className="mt-2"
                  onChange={handleEventNameChange}
                />
                <Box borderBottom={"1px solid black"} className="ml-4" />
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Time"
                  _focus={{ boxShadow: "none", outline: "none", border: "none" }}
                  border={"none"}
                  className="mt-2"
                  onChange={handleEventTimeChange}
                />
                <Box borderBottom={"1px solid black"} className="ml-4" />
                <Textarea
                  height={"60vh"}
                  className="mt-4"
                  onChange={handleEventDesChange}
                />
              </Box>
              <Input
                type="file"
                display={"none"}
                id="brouche"
                onChange={handleFileChange} // Attach the onChange handler here
              />
              <Input
                type="file"
                display={"none"}
                id="frontcover"
                onChange={handleFileChange2} // Attach the onChange handler here
                accept="image/*"
              />
              <Box className="flex items-center">
                <Button className="mt-2">
                  <label htmlFor="brouche">Upload Brouche</label>
                </Button>
                <Button className="mt-2">
                  <label htmlFor="frontcover">Upload Front Cover</label>
                </Button>
                <IoSend
                  className="ml-auto mr-8 text-custompink"
                  onClick={handelsend}
                />
              </Box>
            </Box>
          </Box>
        )}
        
        {isApply&&<Box className="bg-white  absolute top-56 w-7/12 ml-96 h-[300px] mt-6 rounded-[20px] shadow-lg"  >
  
          <Text className="text-center text-xl font-pbold">{applyname}</Text>
          <Box className="h-56 overflow-auto">
          <Text className="">{applydes}</Text>
          </Box>
          <Box className="flex justify-center mt-2">
          <Button colorScheme="green">Confirm</Button>
          </Box>
          
          </Box>}
      </>
    );
  }
  
  export default Application;