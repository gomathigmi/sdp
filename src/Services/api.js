import axios from 'axios'
const url="http://localhost:5000"

export const CreateUser=async(data)=>
{
    try
        {
            const res= await axios.post(`${url}/user/create`,data);
            console.log("CreateUser",res);        
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}

export const getUser=async(email)=>
{
    try
        {
            const res= await axios.get(`${url}/user/get`,
                {params:{ email:email}});
            console.log("getUser",res);   
            return res.data;     
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}
export const getUserById=async(id)=>
{
    try
        {
            const res= await axios.get(`${url}/user/getbyid`,
                {params:{ id:id}});
            console.log("getUserbyid",res);   
            return res.data;     
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}
export const CreatePost=async(data)=>
{
    try
        {
            const res= await axios.post(`${url}/post/create`,data);
            console.log("CreatePost",res);   
            return res.data;     
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}
export const GetPost=async(data)=>
{
    try
        {
            const res= await axios.get(`${url}/post/getall`,data);
            console.log("GetPost",res);   
            return res.data;     
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}
export const UpdateProfile=async(data,id)=>
    {
        try
            {
                const res= await axios.put(`${url}/profile/update`,data,
                    {params:{ id:id}}
                );
                console.log("UpdateProfile",res);   
                return res.data;     
            }
            catch(err)
            {
                console.log("UpdateProfile",err)
            }
    
    }

export const SendMessage=async(data)=>
{
    try
        {
            const res= await axios.post(`${url}/chat/sendmessage`,data);
            console.log("msg",res);        
        }
        catch(err)
        {
            console.log("Error while sending message",err)
        }

}
export const GetMessage=async(id)=>
{
          

    try
        {
            const res= await axios.get(`${url}/chat/get/msg`,
                {params:{ conversationid: id }}
            );

            console.log("msg",res);        
            return res.data;
     
        }
        catch(err)
        {
            console.log("Error while geting message",err)
        }

}

export const CreateApplication= async (data) => {
    try {
        const res = await axios.post(`${url}/application/create`,data);
        console.log("CreateApplication", res);   
        // return res.data;     
    } catch (err) {
        console.log("CreateApplication", err);
    }
}

export const GetApplication= async () => {
    try {
        const res = await axios.get(`${url}/application/getall`);
        console.log("GetApplication", res);   
        return res.data;     
    } catch (err) {
        console.log("GetApplication", err);
    }
}