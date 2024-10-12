import './App.scss'
import Container from './components/container/container.component'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <>
    <BrowserRouter>
      <Container/>
      </BrowserRouter>
    </>
  )
}

export default App
