import { Box} from "@chakra-ui/react"
import LoginPage from "../Components/Login"
import Signup from "../Components/Signup"
import { UsedbContext } from "../Services/UseContext";

function AuthPage() {

  const {isLogin} = UsedbContext();

  return (
    <>

    <Box className="w-full h-screen ">
           
           {isLogin&&<LoginPage/>}
           {!isLogin&&<Signup/>}
           

    </Box>


    </>
  )
}

export default AuthPage