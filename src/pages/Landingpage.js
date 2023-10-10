import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landingpage() {
  return (
    <div>
      <Row>
        <Col lg='6' md='6' sm='6' className='my-5 p-5'>
          <Container>
            <h1 style={{ fontFamily: 'Anton' }} >Welcome</h1>
            <p style={{ fontFamily: 'Anton' }}>Transform your video sharing experience with our cutting-edge app. Effortlessly upload, edit,
              and share your content with a global audience. From stunning visuals to engaging storytelling,
              our user-friendly platform empowers your creativity. Join our thriving community of creators today
              and redefine how the world watches, one video at a time.</p>
          </Container>
          <div className='text-center mt-5'>
            <Link to={'/home'}>
              <button className='btn' style={{ background: "#f25a5a", color: 'white', width: '75%' }}>Cick Here To Know More</button>

            </Link>          </div>

        </Col>
        <Col lg='6' md='6' sm='6' className='my-5 p-5'>


          <img style={{ width: '100%' }} src="https://i.postimg.cc/brL00J4m/72c0b2-6f7b807406974d1eb27e456d66b045f7-mv2.jpg" alt="image" />


        </Col>
      </Row>
    </div>
  )
}

export default Landingpage