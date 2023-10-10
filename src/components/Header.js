import React from 'react'
import { Video } from 'react-feather'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div >

        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <div className='container'>
        <a class="navbar-brand"> <Link to={''}><Video></Video></Link>  Video App</a>
        
     
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
      
    </div>
  </nav>
    </div>
  )
}

export default Header