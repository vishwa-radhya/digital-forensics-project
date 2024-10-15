import './App.scss'
import Container from './components/container/container.component'
import { BrowserRouter } from 'react-router-dom'
import { ReportProvider } from './contexts/report-context'

function App() {

  return (
    <>
      <ReportProvider>
          <BrowserRouter>
            <Container/>
          </BrowserRouter>
      </ReportProvider>
    </>
  )
}

export default App
