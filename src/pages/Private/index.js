import {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {auth} from '../../services/index'
import { onAuthStateChanged } from 'firebase/auth'
export default function Private( {children} ){
    // state - usuario
    const [logado,setLogado] = useState(null)

    useEffect(() => {
        // 
        async function loadLogin(){
            await onAuthStateChanged(auth,(user) => {
                if(user){
                    setLogado(true)
                } else{
                    setLogado(false)
                }
            })
        }

        // 
        loadLogin()
    },[])

    if(logado === false){
        return <Navigate to='/' replace={true}/>
    } else{    
        return children
    }

}