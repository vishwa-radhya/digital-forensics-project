import './scan-dialog.styles.scss';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { FaXmark } from 'react-icons/fa6';
import { MdOutlineAdfScanner } from 'react-icons/md';
import Loader from '../loader/loader.component';
import { useEffect, useState } from 'react';
import InProgress from '../../assets/progress.svg';
import CleanSvg from '../../assets/safe.svg';
import UnSafeSvg from '../../assets/unsafe.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ScanDialog = ({handleSetIsScanDialogOpen,scanResponse,fileName})=>{

    const [progress,setProgress]=useState({cml:null,mtd:null});
    const [status,setStatus]=useState('');
    const [id,setId]=useState(null);
    const [showLoader,setShowLoader]=useState(false);
    const [isAnalyzeFinished,setIsAnalyzeFinished]=useState(false);
    const navigateRouter = useNavigate();


    const handleUnfinishedScanning=async()=>{
        if(id){
            console.log('function for unfinished scanning:',id)
            const endPoint = `quick-scan/${id}`
            try{
                const response = await fetch(`http://localhost:5000/api/sample?endPoint=${endPoint}`)
                const data = await response.json()
                if(data){
                    const scannerProgress=data["scanners_v2"];        
                    if(scannerProgress){
                        setProgress({cml:scannerProgress["crowdstrike_ml"].progress || '0',mtd:scannerProgress["metadefender"].progress || "0"})
                        setStatus(scannerProgress["metadefender"].status)
                    }
                    if(data?.finished){
                        console.log('finish')
                        setIsAnalyzeFinished(true)
                        return;
                    }else{
                        setTimeout(()=>{
                            handleUnfinishedScanning()
                        },5000)
                    }
                }
            }catch(e){
                console.error('error refecthing scanning data',e)
            }
            
        }
    }

    useEffect(()=>{
        // console.log(scanResponse)
        const handleScanResponse =async()=>{
            setShowLoader(true);
        if(scanResponse){
            try{
            setId(scanResponse?.id)
            const scannerProgress=scanResponse["scanners_v2"];
                if(scannerProgress){
            setProgress({cml:scannerProgress["crowdstrike_ml"].progress || '0',mtd:scannerProgress["metadefender"].progress || "0"})
            setStatus(scannerProgress["metadefender"].status)
                }
            if(scanResponse?.finished){
                setIsAnalyzeFinished(true)
            }else{
                setIsAnalyzeFinished(false);
                handleUnfinishedScanning()
            }
            }catch(e){
                console.error("error setting ui",e)
            }finally{
                setShowLoader(false);
            }
        }
    }

    handleScanResponse()

    },[scanResponse])

    return(
        <div className='overlaying'>
        <div className="scan-dialog">
        <div className='top-div'>
            <FaXmark onClick={()=>handleSetIsScanDialogOpen(false)} />
        </div>
        <div className='file-div'>
            <BsFileEarmarkArrowUp/>
            <p>{fileName ?? "Unknownfile"}</p>
        </div>
        <div className='scanner-wrapper'>
            <div>
                <MdOutlineAdfScanner/>
                <p>CrowdStrike Falcon</p>
                <span>Progress : {progress.cml}%</span>
                <span>Status</span>
                <div>
                    <img src={status === "" ? InProgress : status === "clean" ? CleanSvg : UnSafeSvg} />
                </div>
            </div>
            <div>
                <MdOutlineAdfScanner/>
                <p>Metadefender</p>
                <span>Progress : {progress.mtd}% </span>
                <span>Status</span>
                <div>
                <img src={status === "clean" ? CleanSvg : status === "harmful" ? UnSafeSvg : InProgress} />
                </div>
            </div>
            
        </div>
        <div className='progress-div'>
           {!isAnalyzeFinished && <Loader loaderWidth={25} bdColor='gray' />}
            {!showLoader ? "Analyzing File" : 'Processing'}
        </div>
        <button disabled={!isAnalyzeFinished} onClick={()=>navigateRouter('summary-report')} >Scan Summary</button>
        {isAnalyzeFinished &&  <span className='final-span'>*File Analysis is completed and it is a {status === "clean" ? "CLEAN" :'HARMFUL'} file </span>}
        </div>
        </div>
    )
}
ScanDialog.propTypes={
    scanResponse:PropTypes.object,
    handleSetIsScanDialogOpen:PropTypes.func,
    fileName:PropTypes.string,

}
export default ScanDialog;