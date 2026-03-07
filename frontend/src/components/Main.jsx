import '../styles/main.css'
import Content from './Content'
import TitlePage from './TitlePage'

const Main = () => {
  return (
    <div id='main' className="main">
        <TitlePage page="Dashboard" />
        <Content />
    </div>
  )
}

export default Main