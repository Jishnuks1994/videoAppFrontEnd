import React from 'react'
import { PlusSquare } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import { addVideo } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({updateData}) {
    //set state to store data

    const [uploadData, setUploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    //function to take input data
    const setInput = (e) => {
        // console.log(e.target.value);
        let { name, value } = e.target
        //upload the key values with existing object
        setUploadData({ ...uploadData, [name]: value })



    }

    const extractUrl = (e) => {
        let videoUrl = e.target.value

        //https://www.youtube.com/embed/9XgYSQfnzLU
        //check url contain v=
        if (videoUrl.includes("v=")) {
            let index = videoUrl.indexOf("v=")
            let extractUrl = videoUrl.substring(index + 2, index + 13)
            // console.log(extractUrl);
            // console.log(index);

            //make full url
            let fullUrl = `https://www.youtube.com/embed/${extractUrl}`

            //update with uploadData
            setUploadData({ ...uploadData, [e.target.name]: fullUrl })

        }
    }
    //function to add data
    const handleAdd = async () => {
        let id = uniqid()
        setUploadData({ ...uploadData, ["id"]: id })

        const { caption, thumbnail, url } = uploadData
        if (!caption) {
           
            toast.error('please add caption', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if (!thumbnail) {
            

            toast.error('please add thumbnnail', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if (!url) {
       

            toast.error('please add url', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else {
            //api calling
            const result = await addVideo(uploadData)
            if (result.status >= 200 && result.status < 300) {
                updateData(result.data)
                toast.success('video added', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

                setShow(false);

            }
        }




    }

    // console.log(uploadData);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <button className='btn' onClick={handleShow}><PlusSquare></PlusSquare></button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload A Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel
                        controlId="1"
                        label="Video Caption"
                        className="mb-3">
                        <Form.Control name='caption' onChange={setInput} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="2"
                        label="Video Cover Image URL"
                        className="mb-3">
                        <Form.Control name='thumbnail' onChange={setInput} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="3"
                        label="Youtube URL"
                        className="mb-3">
                        <Form.Control name='url' onChange={extractUrl} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>


                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="primary">
                        Add
                    </Button>
                </Modal.Footer>
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

export default Add