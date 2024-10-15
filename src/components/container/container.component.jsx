import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/navbar.component";
import HeroSection from "../hero-section/hero-section.component";
import Scan from "../../routes/scan/scan.component";
import SummaryReport from "../../routes/summary-report/summary-report.component";
import { useState } from "react";

const Container=()=>{

    const [file,setFile]=useState({});
    
    return(
        <div className="container">
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<HeroSection/>} />
                    <Route path="scan" element={<Scan file={file} setFile={setFile} />} />
                    <Route path="summary-report" element={<SummaryReport file={file} />} />
                </Route>
            </Routes>
        </div>
    )
}
export default Container;