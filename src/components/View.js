import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';

import VideoCard from './VideoCard';
import { getAllVideo } from '../service/allApis';



function View({data}) {

  const [videos,setVideos]=useState([])
  const [deleteStatus,setDeleteStatus]=useState(false)

  const getAllVideos=async()=>{
    const result=await getAllVideo()
    setVideos(result.data);
  }
  // console.log(videos);

  useEffect(()=>{
    getAllVideos()
  },[data,deleteStatus])

  return (
    <div
    className='border p-3 rounded border-2 ' >

        <Row>
          {videos?.map(video=>(
            <Col sm={12} md={6}>
                <VideoCard deleteUpdate={setDeleteStatus} video={video}></VideoCard>
            
            
            </Col>
          ))

          }
            
        </Row>
        
        

    </div>
  )
}

export default View