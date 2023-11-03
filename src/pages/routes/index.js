import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function RoutePage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}