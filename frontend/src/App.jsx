import Header from './components/Header'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import LeftSideBar from './components/LeftSideBar'
import Main from './components/Main'

function App() {
  return(
    <>
      <Header />
      <LeftSideBar />
      <Main />
    </>
  )
}

export default App
