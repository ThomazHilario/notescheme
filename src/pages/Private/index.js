import {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {auth} from '../../services/index'
import { onAuthStateChanged } from 'firebase/auth'
export default function Private( {children} ){
    // state - usuario
    const [logado,setLogado] = useState(null)

    useEffect(() => {
        // loadLogin - Verificando se o usuario já fez o login
        async function loadLogin(){
            await onAuthStateChanged(auth,(user) => {
                // Caso tenha feito
                if(user){
                    setLogado(true)
                } else{
                    setLogado(false)
                }
            })
        }

        // Executando a função loadLogin.
        loadLogin()
    },[])

    // Redirecionando a pagina de destino de acordo com a condição
    if(logado === false){
        return <Navigate to='/' replace={true}/>
    } else{    
        return children
    }

}