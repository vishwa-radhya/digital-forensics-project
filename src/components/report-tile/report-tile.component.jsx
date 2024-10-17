import { useContext, useEffect } from 'react';
import './report-tile.styles.scss';
import { ReportContext } from '../../contexts/report-context';
import ReportTileImg from '../../assets/report-document-file-svgrepo-com.svg';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

const ReportTile=({jobId})=>{

    const {summaryReport,handleSetSummaryReport}=useContext(ReportContext);
    console.log("summaryReport:",summaryReport)

    const fetchUnFinishedReport=async()=>{
        console.log("unfinished report fetching")
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
            if(data?.state === "SUCCESS"){
                handleSetSummaryReport(data)
            }else{
                console.log("refetching summary report in 10s");
                setTimeout(()=>{
                    fetchUnFinishedReport();
                },10000)
            }

        }catch(e){
            console.error('error fetching report with jobId',e)
        }
    }

    useEffect(()=>{
      if(summaryReport.state === "IN_PROGRESS"){
        fetchUnFinishedReport()
      }
    })


    return(
      <ErrorBoundary fallback={<p>Something Went Wrong Cant Display Report</p>}>
        <div className='report-tile-div'>
        <h3>Summary Report</h3>
            {!Object.keys(summaryReport).length ? <div className='no-report'>
                <img src={ReportTileImg} />
                <p>Nothing Yet!</p>
            </div> : <div className='report'>
                 <div className='summary-report-main'>
        <table>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Classification Tags</td>
            <td>{summaryReport?.classification_tags[0] ?? "empty"}</td>
          </tr>
          <tr>
            <td>File Name</td>
            <td>{summaryReport?.submissions[0]?.filename ?? "unknown"}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{summaryReport?.submissions[0]?.created_at ?? "unknown"}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{summaryReport?.type}</td>
          </tr>
          <tr>
            <td>SubSystem</td>
            <td>{summaryReport?.subsystem ?? "empty"}</td>
          </tr>
          <tr>
            <td>Av Detect</td>
            <td>{summaryReport?.av_detect ?? "empty"}</td>
          </tr>
          <tr>
            <td>Vx Family</td>
            <td>{summaryReport?.vx_family ?? "empty"}</td>
          </tr>
          <tr>
            <td>Threat Score</td>
            <td>{summaryReport?.threat_score ?? "empty"}</td>
          </tr>
          <tr>
            <td>Verdict</td>
            <td>{summaryReport?.verdict}</td>
          </tr>
          <tr>
            <td>Total Signatures</td>
            <td>{summaryReport?.total_signatures}
            </td>
          </tr>
          <tr>
            <td>File Analysis</td>
            <td className='f1'> {summaryReport?.file_metadata?.file_analysis?.map((e,i)=>{
              return <tr key={i}><td>{e}</td></tr>
            })} </td>
          </tr>
          <tr>
            <td>Mitre Attacks</td>
            <td className='m1'>
              {summaryReport?.mitre_attcks?.slice(0,10).map((c,i)=>{
                return <tr key={`${c.tactic}-${i}`}>
                  <tr>
                    <td>Tactic</td>
                    <td>{c.tactic}</td>
                  </tr>
                  <tr>
                    <td>Technique</td>
                    <td>{c.technique}</td>
                  </tr>
                  <tr>
                    <td>Attack Id</td>
                    <td>{c.attck_id}</td>
                  </tr>
                  <tr>
                    <td>Attack Id Wiki</td>
                    <td>{c.attck_id_wiki}</td>
                  </tr>
                  <tr>
                    <td>Malicious Identifiers Count</td>
                    <td>{c.malicious_identifiers_count}</td>
                  </tr>
                  <tr>
                    <td>Suspicious Identifiers Count</td>
                    <td>{c.suspicious_identifiers_count}</td>
                  </tr>
                  <tr>
                    <td>Informative Identifiers Count</td>
                    <td>{c.informative_identifiers_count}</td>
                  </tr>
                </tr>
              })}
            </td>
          </tr>
          <tr>
            <td>Signatures</td>
            <td className='s1'>
              {summaryReport?.signatures?.slice(0,15).map((c,i)=>{
                return <tr key={`${c.name}-${i}`}>
                  <tr>
                    <td>Threat Level</td>
                    <td>{c.threat_level}</td>
                  </tr>
                  <tr>
                    <td>Threat Level Human</td>
                    <td>{c.threat_level_human}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{c.category}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{c.name}</td>
                  </tr>
                </tr>
              })}
            </td>
          </tr>
        </table>
                </div> 
            </div>}
        </div>
        </ErrorBoundary>
    )
}
ReportTile.propTypes={
    jobId:PropTypes.string,
}
export default ReportTile;