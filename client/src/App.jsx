
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigation} from './components/Navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './components/pages/Home'
function App() {

  return (
 <div className="App">
<BrowserRouter>
<Navigation>
  <Routes>
<Route index element={<Home/>}/>
  </Routes>
</Navigation>
</BrowserRouter>
 </div>
  )
}

export default App
