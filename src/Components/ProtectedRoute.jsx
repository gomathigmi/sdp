import { UsedbContext } from "../Services/UseContext";
import Layout from "./Layout";
import LandingPage from "../Pages/LandingPage";

function ProtectedRoute() {

    // ----------------------firebase setup----------------
    const {user}=UsedbContext();
    console.log(user)
  

    return user?<Layout/>:<LandingPage/>
}
export default ProtectedRoute