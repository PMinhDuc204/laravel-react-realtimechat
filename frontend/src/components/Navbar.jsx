import '../styles/navbar.css'
import NavAvatar from './NavAvatar'
import NavMess from './NavMess'
import NavNotice from './NavNotice'

const Navbar = () => {
  return (
    <nav className="header-nav ms-auto">
        <ul className='d-flex align-items-center'>
            <NavNotice />
            <NavMess />
            <NavAvatar />
        </ul>
    </nav>
  )
}

export default Navbar