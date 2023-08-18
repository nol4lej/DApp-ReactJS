import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Nav from './components/Nav/Nav'
import { Web3Provider } from './utils/Web3Context'

function App() {
  return (
    <>
      <Web3Provider>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </>
  )
}

export default App
