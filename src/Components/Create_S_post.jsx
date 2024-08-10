import { Avatar, Box, Input, Spinner, Text, Textarea } from "@chakra-ui/react"
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { UsedbContext } from "../Services/UseContext";
function Create_S_Post({onCreate_s_post}) {
   
    const[text,settext]=useState('');
    const [file,setfile]=useState(null);
    const {upload_firbase,isPostSending}=UsedbContext();
    const handleTextChange=(event)=>
    {
        settext(event.target.value);
        console.log(text);
    }
    const Documentinput=(e)=>
    { 
        setfile(e.target.files[0]);
        
    }
    const onSend=async()=>
    {
       console.log("kl");
       const type=file.type.startsWith("image")?"image":"video";
       const name=file.name+Date.now();
       await upload_firbase(file,type,name,text,onCreate_s_post);      
    }
    
  return (
    <>
    <Box className="w-full h-full p-8" >
            
         
          {!isPostSending&&
          <Box>
          <Box className="flex items-center gap-2 ">
                    <Avatar size={'md'}/>
                    <Box>
                            <Text className="text-2xl font-pextralight">Gomathi</Text>
                            <Text className="text-xl font-pextralight">Post to any one</Text>
                    </Box>
            </Box>
        {/* --------------------body---------------------- */}
                <Box >
                    <Textarea  height={'60vh'}
                    className="mt-4" 
                    onChange={handleTextChange}
                    />
                </Box>
                {/* -----footer---- */}
                <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="imageinput"
                            accept="image/*"
                            />
                   <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="videoinput"
                            accept="video/*"
                            />          
                <Box className="w-full flex gap-7 mt-4">
                        <Box className="flex  items-center gap-7 w-full">
                                <label htmlFor="imageinput">
                                <FaImage size={'20px'} className="text-custompink"/>
                                </label>
                         
                               <label htmlFor="videoinput">
                                <FaPhotoVideo  size={'20px'} className="text-custompink"/></label>

                                <IoSend size={'20px'} className="text-custompink
                                ml-auto" onClick={()=>onSend()}/>
                               
                        </Box>
                 </Box>
                </Box>}
                
                {isPostSending&&
                <Box className="flex justify-center mt-64">
                        <Spinner size={'xl'}/>
                </Box>        
                }
                    
          
    </Box>
    </>
  )
}

export default Create_S_Post