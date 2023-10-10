import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'
import { Link } from 'react-router-dom'



function Home() {

  const [addUpdate, setAddUpdate] = useState({})
  return (
    <>

      <h1 className='my-2 p-2' style={{ fontFamily: 'Anton' }}>All Video Cards</h1>

      <Link to={"/watch-History"} className='link link-dark link-underline-opacity-0'>
        <h3 style={{ fontFamily: 'Anton' }} className='p-2' >Check Watch History
          
        </h3>
      </Link>

      <hr />

      <Container>
        <Row>
          <Col lg={1} md={2} sm={3}>
            <Add updateData={setAddUpdate}></Add>
          </Col>
          <Col g={7} md={6} sm={9}>
            <View data={addUpdate}></View>
          </Col>
          <Col lg={4} md={4} >
            <Category></Category>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default Home