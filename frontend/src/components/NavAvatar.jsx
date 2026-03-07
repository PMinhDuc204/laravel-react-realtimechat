import React from 'react'
import point from '../assets/img/point.jpg'

const NavAvatar = () => {
  return (
    <li className='nav-item dropdown pe-3'>
      <a 
        href="#"
        className='nav-link nav-profile d-flex align-items-center pe-0'
        data-bs-toggle="dropdown"
      >
        <img src={point} alt="" className='rounded-circle' />
        <span className='d-none d-md-block dropdown-toggle ps-2'>The Cats</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
          <h6>Admin</h6>
          <span>Web Designer</span>
        </li>
        <li>
          <hr className='dropdown-divider'/>
        </li>

        <li>
          <a 
            className='dropdown-item d-flex align-items-center' 
            href="#"
          >
            <i className='bi bi-person'></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className='dropdown-divider'/>
        </li>

        <li>
          <a 
            className='dropdown-item d-flex align-items-center' 
            href="#"
          >
            <i className='bi bi-gear'></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>

        <li>
          <a 
            href="#"
            className='dropdown-item d-flex align-items-center'
          >
            <i className='bi bi-question-circle'></i>
            <span>Need Helps</span>
          </a>
        </li>
      </ul>
    </li>
  )
}

export default NavAvatar