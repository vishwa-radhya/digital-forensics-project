import './scanner.styles.scss';
import dropImage from '../../assets/3411083-removebg-preview (1).png'
import { FaFile } from 'react-icons/fa6';
import { useState } from 'react';
import Loader from '../loader/loader.component';
import { FaFileUpload } from 'react-icons/fa';
import { CgFileRemove } from 'react-icons/cg';
import PropTypes from 'prop-types';

const Scanner=({children,handleSetFile})=>{

    const [isFileUploaded,setIsFileUploaded]=useState(false);
    const [fileName,setFileName]=useState('');
    const [showLoader,setShowLoader]=useState(false);

    const inputChangeHandler=(e)=>{
        const file = e.target.files[0];
        // console.log(file)
        if(file){
            setFileName(file.name);
            handleSetFile(file);
            setShowLoader(true);

            simulateFileUploadDelay().then(()=>{
                setIsFileUploaded(true);
                setShowLoader(false);
            })
        }
    }

    const simulateFileUploadDelay=()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve();
            },1500)
        })
    }

    const fileRemoval=()=>{
        setIsFileUploaded(false);
        setFileName("");
        handleSetFile({});
    }

    return(
        <div className='scanner'>
            <div className='file-upload-wrapper'>
            <img src={dropImage} />
            <span> {isFileUploaded ? <div className='file-name'> <FaFile/> <div>  {fileName} <CgFileRemove className='file-remove' onClick={fileRemoval} /></div></div> : (showLoader && <Loader loaderWidth={22} /> )} </span>
            {!isFileUploaded ? <label htmlFor='file-input'> <FaFileUpload/> Upload File</label> : <>{children}</>}
            <input type='file' className='file-input' id='file-input' onChange={inputChangeHandler} />
            </div>
        </div>
    )
}
Scanner.propTypes={
    children:PropTypes.node,
    handleSetFile:PropTypes.func,
}
export default Scanner;