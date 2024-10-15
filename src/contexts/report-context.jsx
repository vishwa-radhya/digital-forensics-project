import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ReportContext = createContext()

export const ReportProvider=({children})=>{

    const [summaryReport,setSummaryReport]=useState({});

    const handleSetSummaryReport=(summary)=>{
        setSummaryReport(summary);
    }

    return(
        <ReportContext.Provider  value={{summaryReport,handleSetSummaryReport}} >
            {children}
        </ReportContext.Provider>
    )
}
ReportProvider.propTypes={
    children:PropTypes.node,
}