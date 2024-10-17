import './summary-report.styles.scss';
import SummaryReportImg from '../../assets/summary-report-img.svg';
import { TbReportAnalytics } from 'react-icons/tb';
import { useContext, useState } from 'react';
import { MdOutlineMonitor } from 'react-icons/md';
import { environmentCodes } from '../../env-codes';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReportTile from '../../components/report-tile/report-tile.component';
import { ReportContext } from '../../contexts/report-context';

const SummaryReport =({file})=>{

    const [envId,setEnvId]=useState(100);
    const [isEnvDialogOpen,setIsEnvDialogOpen]=useState(false);
    const [jobId,setJobId]=useState(null);
    const {handleSetSummaryReport}=useContext(ReportContext);

    const handleSubmitFile=async()=>{
        if(!file){
            return;
        }
        console.log("getting job id")
        const formData = new FormData();
        formData.append('file',file);
        formData.append('envId',envId);
        try{
            const response = await axios.post('http://localhost:5000/api/report-submit',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            console.log("success in getting job Id")
            setJobId(response.data.job_id)
            handleGetSummaryReport(response.data.job_id)
        }catch(e){
            console.error('Error submitting file for report:', e);
        }
    }

    const handleGetSummaryReport=async(jobId)=>{
        if(!jobId){
            console.log("no jobId returning from function")
            return;
        } 
        const endPoint = `report/${jobId}/summary`
        try{
            console.log('getting report with jobID',jobId)
            const response = await fetch(`http://localhost:5000/api/sample?endPoint=${endPoint}`)
            const data = await response.json()
            console.log("summary report json")
            handleSetSummaryReport(data)

        }catch(e){
            console.error('error fetching report with jobId',e)
        }
    }


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
                handleSubmitFile()
                }
                }>Next</button>
            </div>}     
                <ReportTile jobId={jobId} />
        </div>
    )
}
SummaryReport.propTypes={
    file:PropTypes.object,
}
export default SummaryReport;