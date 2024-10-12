// import Loader from "../loader/loader.component";
import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/navbar.component";
import HeroSection from "../hero-section/hero-section.component";
import Scan from "../../routes/scan/scan.component";

const Container=()=>{

    // const endPoint = 'system/environments'
    // const endPoint2='system/version'

    // function onclickHandle(){
    //     console.log('hit');

    //     fetch(`http://localhost:5000/api/sample?endPoint=${endPoint2}`)
    //     .then(resp=>resp.json())
    //     .then(data=>console.log(data))
    //     .catch(e=>console.error('Error:',e))
        
    // }

    return(
        <div className="container">
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<HeroSection/>} />
                    <Route path="scan" element={<Scan/>} />
                </Route>

            </Routes>
            {/* <button onClick={onclickHandle}>click</button> */}
            {/* <Loader loaderWidth={200}/> */}
        </div>
    )
}
export default Container;