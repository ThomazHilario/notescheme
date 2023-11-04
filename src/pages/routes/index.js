import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../home'
import Error from '../error'
export default function RoutePage(){
    return(
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    

                    <Route path='*' element={<Error/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    )
}