import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid'
import { addCategory, getAllCategories, getVideo, removeCategory, updateCategory } from '../service/allApis';
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Trash } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';

function Category() {

  const [catInputs, setInputs] = useState(
    {
      id: "",
      name: "",
      allVideos: []

    })

  const [categories, setCategories] = useState([])

  const getAllCat = async () => {
    const result = await getAllCategories()
    setCategories(result.data)
  }
  // console.log(categories);


  const categoryInput = (e) => {
    const { value, name } = e.target
    setInputs({ ...catInputs, [name]: value })



  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCategory = async () => {
    let id = uniqid()
    setInputs({ ...catInputs, ["id"]: id })

    const result = await addCategory(catInputs)
    if (result.status >= 200 && result.status < 300) {


      // toast.success('new category added', {
      //   position: "top-center",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });

      setShow(false);
      getAllCat()

    }

  }

  const deleteCat = async (id) => {
    const result = await removeCategory(id)

    if (result.status >= 200 && result.status < 300) {

      //use getAllCat to refresh category
      getAllCat()

    }

  }

  // console.log(catInputs);

  useEffect(() => {
    getAllCat()
  }, [])

  const draggedOver = (e) => {
    e.preventDefault()
    // console.log("dragged over");

  }

  const dropped = async (e, id) => {
    // console.log(id);
    // access video id from start drag
    let sourceCardId = e.dataTransfer.getData("cardId")
    // console.log(sourceCardId);
    const data = await getVideo(sourceCardId)
    // console.log(data);

    //update category
    //find selected category from all categories using category id
    const selectedCategory = categories.find(i => i.id == id)
    // console.log(selectedCategory.allvideos);

    selectedCategory.allVideos.push(data)
    // console.log(selectedCategory);

    //update in database
    await updateCategory(id, selectedCategory)

    //to access update category
    getAllCat()


  }

  return (
    <div className='text-center'>

      <button className='btn btn-dark w-100' onClick={handleShow} >Add Categories</button>

      {
        categories?.map(item => (
          <div droppable onDragOver={(e) => draggedOver(e)}
            onDrop={(e) => dropped(e, item?.id)}
            className='p-2 bg-danger-subtle mt-1 border border-1 border-black '>
            <h2 ><span className='ms-0'>{item?.name}</span> <span className='float-end me-2'>
              <Trash onClick={() => deleteCat(item?.id)} ></Trash></span > </h2>
            <Row className=''>
              {
                item?.allVideos.map(i => (
                  <Col>
                    <VideoCard inCard={true} video={i.data}></VideoCard>
                  </Col>
                  


                ))
              }
            </Row>
          </div>
        ))
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <FloatingLabel
        controlId="floatingTextarea"
        label="Id"
        className="mb-3"
      >
        <Form.Control name='name' onChange={(e)=>categoryInput(e)} as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel> */}

          <FloatingLabel
            controlId="floatingTextarea"
            label="Category name"
            className="mb-3"
          >
            <Form.Control name='name' onChange={(e) => categoryInput(e)} as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleCategory} variant="primary" >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ToastContainer
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
            /> */}
    </div>
  )
}

export default Category