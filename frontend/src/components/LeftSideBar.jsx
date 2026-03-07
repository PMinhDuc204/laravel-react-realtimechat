import navList from '../utils/navItem'
import '../styles/leftsidebar.css'
import NavItem from './NavItem'

const LeftSideBar = () => {
  return (
    <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className='nav-item'>
                <a href="#" className='nav-link'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li className='nav-item'>
                <a 
                    href="#"
                    className='nav-link collapsed'
                    data-bs-toggle='collapse'
                    data-bs-target='#users-nav'
                >
                    <i className='bi bi-menu-button-wide'></i>
                    <span>Users</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>
                <ul
                    className='nav-content collapse'
                    id='users-nav'
                    data-bs-parent='#sidebar-nav'
                >
                    <li>
                        <a href="#">
                            <i className='bi bi-circle'></i>
                            <span>Customers</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bi bi-circle'></i>
                            <span>Suppliers</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bi bi-circle'></i>
                            <span>Calendar</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li className='nav-item'>
                <a 
                    href="#"
                    className='nav-link collapsed'
                    data-bs-toggle='collapse'
                    data-bs-target='#reports-nav'
                >
                    <i className='bi bi-layout-text-window-reverse'></i>
                    <span>Tables</span>
                    <i className='bi bi-chevron-down ms-auto'></i>
                </a>
                <ul
                    className='nav-content collapse'
                    id='reports-nav'
                    data-bs-parent='#sidebar-nav'
                >
                    <li>
                        <a href="#">
                            <i className='bi bi-circle'></i>
                            <span>General Tables</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bi bi-circle'></i>
                            <span>Data Tables</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li className='nav-heading'>Pages</li>
            {navList.map(nav => (
                <NavItem key={nav._id} nav={nav} />
            ))}
        </ul>
    </aside>
  )
}

export default LeftSideBar