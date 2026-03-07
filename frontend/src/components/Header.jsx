import '../styles/header.css'
import Logo from './Logo'
import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        <Logo />
        <SearchBar />
        <Navbar />
    </header>
  )
}

export default Header