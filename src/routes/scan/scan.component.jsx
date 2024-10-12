import './scan.styles.scss';
import Scanner from '../../components/scanner/scanner.component';
import ScanBtn from '../../components/scan-btn/scan-btn.component';
import {  useState } from 'react';
import ScanDialog from '../../components/scan-dialog/scan-dialog.component';

const Scan=()=>{
    const [isScanDialogOpen,setIsScanDialogOpen]=useState(false);
    const [file,setFile]=useState({});
    const [scanResponse,setScanResponse]=useState({});

    // const [isSummaryAvailable,setIsSummaryAvailable]=useState(false);
    // console.log(file)

    const handleSetIsScanDialogOpen=(bool)=>{
        setIsScanDialogOpen(bool);
    }

    const handleSetFile=(fileInfo)=>{
        setFile(fileInfo);
    }

    const handleSetScanResponse =(resp)=>{
        setScanResponse(resp);
    }

    // console.log(file)
    return(
        <div className='scan-page'>
            <p>Unknown Title should embed here</p>
            <Scanner handleSetFile={handleSetFile} >
                <ScanBtn handleSetIsScanDialogOpen={handleSetIsScanDialogOpen} fileForAnalysis={file} handleSetScanResponse={handleSetScanResponse} />
            </Scanner>
            {!isScanDialogOpen && <ScanDialog handleSetIsScanDialogOpen={handleSetIsScanDialogOpen} scanResponse={scanResponse} fileName={file.name} />}
        </div>
    )
}
export default Scan;