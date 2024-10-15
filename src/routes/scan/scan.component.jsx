import './scan.styles.scss';
import Scanner from '../../components/scanner/scanner.component';
import ScanBtn from '../../components/scan-btn/scan-btn.component';
import {  useState } from 'react';
import ScanDialog from '../../components/scan-dialog/scan-dialog.component';
import PropTypes from 'prop-types';

const Scan=({file,setFile})=>{
    const [isScanDialogOpen,setIsScanDialogOpen]=useState(false);
    // const [file,setFile]=useState({});
    const [scanResponse,setScanResponse]=useState({});


    const handleSetIsScanDialogOpen=(bool)=>{
        setIsScanDialogOpen(bool);
    }

    const handleSetFile=(fileInfo)=>{
        setFile(fileInfo);
    }

    const handleSetScanResponse =(resp)=>{
        setScanResponse(resp);
    }

    return(
        <div className='scan-page'>
            <p>Upload file for analysis</p>
            <Scanner handleSetFile={handleSetFile} >
                <ScanBtn handleSetIsScanDialogOpen={handleSetIsScanDialogOpen} fileForAnalysis={file} handleSetScanResponse={handleSetScanResponse} />
            </Scanner>
            {isScanDialogOpen && <ScanDialog handleSetIsScanDialogOpen={handleSetIsScanDialogOpen} scanResponse={scanResponse} fileName={file.name} />}
        </div>
    )
}
Scan.propTypes={
    file:PropTypes.object,
    setFile:PropTypes.func,
}
export default Scan;