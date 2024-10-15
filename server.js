import express from 'express';
import axios from 'axios';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const API_KEY = '2hhhgr53181acfccotgy56be170599c7j2qhvnc73ccefc0eshvjqz871f99a861'; 

const BASE_URL = 'https://hybrid-analysis.com/api/v2'; 


app.get('/api/sample', async (req, res) => {
  const{endPoint}=req.query;
  try {
    console.log(`${BASE_URL}`)
    const response = await axios.get(`${BASE_URL}/${endPoint}`, {
      headers: {
        'User-Agent': 'Falcon',
        'api-key': API_KEY,
      },
    });

    // Forward the API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Error fetching data from Hybrid Analysis API' });
  }
});

//multer for file handling
const upload = multer({dest:'uploads/'});

app.post('/api/submit',upload.single('file'),async (req,res)=>{
  const {scan_type,comment,submit_name}=req.body;
  if(!req.file){
    return res.status(400).json({message:'File is required'});
  }
  try{
    // console.log('file received',req.file)
    const form = new FormData();
    form.append('scan_type',scan_type || 'all');
    form.append('file',fs.createReadStream(req.file.path),req.file.originalname);
    form.append('comment',comment || '');
    form.append('submit_name',submit_name || '');
    // console.log('submitting to hybrid analysis');

    const response = await axios.post(`${BASE_URL}/quick-scan/file`,form,{
      headers:{
        'accept':'application/json',
        'api-key':API_KEY,
        ...form.getHeaders(),
      }
    })

    fs.unlinkSync(req.file.path)

    res.json(response.data);

  }catch(e){
    console.error('Error Submitting file:',e.message);
    res.status(500).json({message:'Error Submitting file to hybrid analysis api'})
  }
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
