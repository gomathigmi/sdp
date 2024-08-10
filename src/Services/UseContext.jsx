import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleprovider, storage } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CreatePost } from "./api";

const dbContext = createContext();
export const UsedbContext = () => {return useContext(dbContext)};
export function UsedbContextProvider({children})
{
    const [isVolunteer,setisVolunteer] = useState(true);
    const [isLogin,setIsLogin] = useState(false);
    const [user,setuser]=useState(null);
    const [dbUser,setdbUser]=useState(null);
    const [credentials,setcredentials]=useState(null);
    const [isLoading,setisLoading]=useState(false);

    useEffect(()=>
      {
        dbUser?.role==='volunteer'?setisVolunteer(true):setisVolunteer(false);
      },[dbUser])

    const navigate=useNavigate();


    useEffect(()=>
        {
            const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>
                {
                    setuser(currentUser);
                    
                })
                return ()=>
                    {
                        unsubscribe();
                    }
                    
                },[])

                function setuprecaptcha(number)
                {
                    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
                    recaptcha.render();
                    return signInWithPhoneNumber(auth,number,recaptcha);
                
                } 

  async function upload_firbase(file,type,name,text,onCreate_s_post)
     { 
     
      
         const storageRef1 = ref(storage, `files/${type}`);
         const storageRef2 = ref(storageRef1, name);
 
         const uploadTask = uploadBytesResumable(storageRef2, file);
 
 // Listen for state changes, errors, and completion of the upload.
 uploadTask.on('state_changed',
   (snapshot) => {
     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // A full list of error codes is available at
     // https://firebase.google.com/docs/storage/web/handle-errors
     switch (error.code) {
       case 'storage/unauthorized':
         // User doesn't have permission to access the object
         break;
       case 'storage/canceled':
         // User canceled the upload
         break;
 
       // ...
 
       case 'storage/unknown':
         // Unknown error occurred, inspect error.serverResponse
         break;
     }
   }, 
   () => {
     // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
       console.log('File available at', downloadURL);

       await CreatePost({userid:dbUser.id,url:downloadURL,type:type,msg:text,firbasename:name,time:Date.now()});

       onCreate_s_post();


       });
   }
 );


     }

    async function google()
     {
      signInWithPopup(auth, googleprovider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    setcredentials(credential);

    const user = result.user;
    setuser(user);
    navigate('/')
    console.log("user: "+user);

 

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log('errorCode :'+errorCode )

    const errorMessage = error.message;
    console.log('errormessge'+errorMessage) 

    // The email of the user's account used.
    const email = error.customData.email;
    console.log(' email'+ email)

    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('credential'+credential)

  });
     } 

     async function SignIn(email,password)
     {
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setuser(user);
    navigate('/')
    setisLoading(false);

    // ...
  })
  .catch((error) => {
      console.log(error);
  });
     }

     async function SignUp(email,password) {
         setisLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setuser(user);
    logout();
    navigate('/auth');setIsLogin(true);
    setisLoading(false);

  })
  .catch((error) => {
    console.log(error);

    // ..
  });
        
     }

    async function logout()
    {
        try {
            await auth.signOut();
            console.log('User signed out successfully!');
            // Optionally, redirect or perform other actions after logout
          } catch (error) {
            console.error('Error signing out:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
          }
        
    }

    async function upload_brouche_firbase(file, name,type) {
      return new Promise((resolve, reject) => {
        const storageRef1 = ref(storage, `files/${type}`);
        const storageRef2 = ref(storageRef1, name);
    
        const uploadTask = uploadBytesResumable(storageRef2, file);
    
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
              case 'storage/canceled':
              case 'storage/unknown':
                reject(error);
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);  
              resolve(downloadURL); // Return the download URL here
            }).catch(reject);
          }
        );
      });
    }

    return <dbContext.Provider value={{
        isVolunteer,setisVolunteer,isLogin,setIsLogin,user,setuser,google,logout,credentials,SignIn,SignUp,isLoading,setisLoading,setuprecaptcha,dbUser,setdbUser
        ,upload_firbase,upload_brouche_firbase}}>
        {children}
    </dbContext.Provider>
}