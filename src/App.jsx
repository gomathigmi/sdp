import { Route, Routes } from "react-router-dom"
import { UsedbContextProvider } from "./Services/UseContext"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Auth from "./Pages/Auth";
import ProtectedRoute from "./Components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
// import ProtectedRoute from "./Components/ProtectedRoute";


function App() {

  return (
    <>
    <UsedbContextProvider>
       {/* <ProtectedRoute> */}
    <Routes>
                  <Route path="/" element={<ProtectedRoute/>} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/*"  element={<PageNotFound/>}/>
                </Routes>

       {/* </ProtectedRoute> */}
    </UsedbContextProvider>
    </>
  )
}

export default App
