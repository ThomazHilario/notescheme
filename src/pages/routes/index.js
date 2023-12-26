import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../home'
import Admin from '../admin'
import Private from '../Private'
import Error from '../error'
import Register from '../Register'
export default function RoutePage(){
    return(
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin/:id' element={<Private> <Admin/> </Private>}/>

                    <Route path='*' element={<Error/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}