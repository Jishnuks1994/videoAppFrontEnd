import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, removeVideo } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import {format} from 'date-fns'


function VideoCard({video,deleteUpdate,inCard}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
      //  id,date,url,title
      let id=uniqid()
      let date=format( new Date(),'d MMMM yyyy,h:mm:ss a')
      const{caption,url}=video
      if(id!="" && date!="" && caption!="" && url!="")
      {
      const body={
        id,
        cardName:caption,
        url,
        date
      }
     
        await addHistory(body)
      }


    }
    const  handleDelete=async (id)=>{
      const response= await  removeVideo(id)
      if(response.status>=200 && response.status<300){
        toast.success('video Deleted', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

          deleteUpdate(true)
      }
    }

    const dragStarted=(e,id)=>{
      // console.log(id);
      //to store dragged data
      e.dataTransfer.setData("cardId",id)
    }
      return (
    <div>
        <Card draggable onDragStart={(e)=>dragStarted(e,video?.id)}
         style={{ padding:'2px' }}>
      <Card.Img onClick={handleShow}  variant="top" style={{height:'200px',width:'100%'}} 
      src={video?.thumbnail}
      />
      <Card.Body>
        <Card.Title >
            <div className='d-flex'>
                <h4 className='me-auto'>{video.caption}</h4> 
{ inCard?"":          ( <Button onClick={()=>handleDelete(video?.id)} className='btn-sm' variant="primary" ><Trash2></Trash2></Button>)
}            </div>
        </Card.Title>
        <Card.Text>
          
        </Card.Text>
        
      </Card.Body>  
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="400px"  
        src={video?.url+"?autoplay=1"}
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
      </Modal>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

    </div>
  )
}

export default VideoCard