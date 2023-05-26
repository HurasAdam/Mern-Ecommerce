
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigation} from './components/Navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './components/pages/Home'
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
function App() {

  return (
 <div className="App">
<BrowserRouter>
<Navigation>
  <Routes>
<Route index element={<Home/>}/>
<Route exact path='/login' element={<Login/>}/>
<Route path='*' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
  </Routes>
</Navigation>
</BrowserRouter>
 </div>
  )
}

export default App
