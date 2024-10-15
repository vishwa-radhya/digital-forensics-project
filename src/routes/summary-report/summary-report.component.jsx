import './summary-report.styles.scss';
import SummaryReportImg from '../../assets/summary-report-img.svg';
import { TbReportAnalytics } from 'react-icons/tb';
import { useState } from 'react';
import { MdOutlineMonitor } from 'react-icons/md';
import { environmentCodes } from '../../env-codes';

const SummaryReport =()=>{

    const [envId,setEnvId]=useState(100);
    const [isEnvDialogOpen,setIsEnvDialogOpen]=useState(false);

    return(
        <div className='summary-report-div'>
            <img src={SummaryReportImg} />  
            <button onClick={()=>setIsEnvDialogOpen(true)}> <TbReportAnalytics/> Generate Report</button>    
            {isEnvDialogOpen &&  <div className='env-div'>
                <p>Select Environment</p>
                <div className='env-div-main'>
                    <div onClick={()=>setEnvId(400)} >
                        <MdOutlineMonitor/>
                        <span>Mac Catalina 64 bit (x86)</span>
                    </div>
                    <div onClick={()=>setEnvId(310)}>
                        <MdOutlineMonitor/>
                        <span>Linux (Ubuntu 20.04, 64 bit)</span>
                    </div>
                    <div onClick={()=>setEnvId(200)}>
                        <MdOutlineMonitor/>
                        <span>Android Static Analysis</span>
                    </div>
                    <div onClick={()=>setEnvId(160)}>
                        <MdOutlineMonitor/>
                        <span>Windows 10 64 bit</span>
                    </div>
                    <div onClick={()=>setEnvId(140)}>
                        <MdOutlineMonitor/>
                        <span>Windows 11 64 bit</span>
                    </div>
                    <div onClick={()=>setEnvId(120)}>
                        <MdOutlineMonitor/>
                        <span>Windows 7 64 bit</span>
                    </div>
                    <div onClick={()=>setEnvId(110)}>
                        <MdOutlineMonitor/>
                        <span>Windows 7 32 bit (HWP Support)</span>
                    </div>
                    <div onClick={()=>setEnvId(100)}>
                        <MdOutlineMonitor/>
                        <span>Windows 7 32 bit</span>
                    </div>
                </div>
                <span>Selected Environment : {environmentCodes[envId]} </span>
                <button onClick={()=>{
                setIsEnvDialogOpen(false)
                }
                }>Next</button>
            </div>}      
        </div>
    )
}
export default SummaryReport;