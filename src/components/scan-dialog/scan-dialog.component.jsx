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

const ScanDialog = ({handleSetIsScanDialogOpen,scanResponse,fileName})=>{

    const [progress,setProgress]=useState({cml:null,mtd:null});
    const [status,setStatus]=useState('');
    const [id,setId]=useState(null);
    const [showLoader,setShowLoader]=useState(false);
    const [isAnalyzeFinished,setIsAnalyzeFinished]=useState(false);

    // console.log(scanResponse)
    // (function(){
    //     console.log(scanResponse)
    // })()

    useEffect(()=>{
        console.log(scanResponse)
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
           {isAnalyzeFinished && <Loader loaderWidth={25} bdColor='gray' />}
            {!showLoader ? "Analyzing File" : 'Processing'}
        </div>
        <button disabled={!isAnalyzeFinished} >Scan Summary</button>
        {!isAnalyzeFinished &&  <span>*File Analysis is completed and it is a {status === "clean" ? "CLEAN" :'HARMFUL'} file </span>}
        </div>
        </div>
    )
}
ScanDialog.propTypes={
    scanResponse:PropTypes.object,
}
export default ScanDialog;