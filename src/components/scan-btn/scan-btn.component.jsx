import axios from 'axios';
import { FaPlay } from 'react-icons/fa6';

const ScanBtn = ({handleSetIsScanDialogOpen,fileForAnalysis,handleSetScanResponse})=>{



    const handleFileSubmission=async()=>{
        if(!fileForAnalysis) return;

        const formData = new FormData();
        formData.append('file',fileForAnalysis);

        try{
            const response = await axios.post('http://localhost:5000/api/submit',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            handleSetScanResponse(response.data);
        }catch(e){
            console.error('Error submitting file:', e);
        }

    }

    return (
        <button onClick={()=>{
            handleFileSubmission()
            handleSetIsScanDialogOpen(true)
            }}><FaPlay/> Start Scan</button>
    )
}
export default ScanBtn;