import { useState, useEffect } from "react";
import './home.css'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {auth} from "../../services";
import {signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'

export default function Home(){

    // Navegation
    let navigate = useNavigate()

    // verificando na rota inicial se o usuario já está logado.
    useEffect(() => {

        // Função login - verificando se o usuario ja fez login
        async function login(){
            
            await onAuthStateChanged(auth,(user) => {
                // Caso tenha feito o login
                if(user){
                    navigate(`/admin/${user.uid}`)
                }
            })
        }

        // Executando a função login.
        login()

    },[navigate])

    // states - input
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    // sing in User
    async function singInUser(e){
        // Cacelando formulario
        e.preventDefault()

        try {
            // Encontrado usuario
             const user = await signInWithEmailAndPassword(auth,email,password)
            
             // Navegando ate a pagina deste usuario
             navigate(`/admin/${user.user.uid}`)

             // Mensagem de boas vindas
             toast.info('Bem vindo ao noteScheme')
        } catch (error) {
                toast.warn('Email ou senha Invalido!')
        }
    }

        return(
            <form>
                <legend className="titulo">Login</legend>

                {/* name */}
                <div className="container_input">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                {/* Password */}
                <div className="container_input">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* Buttons */}
                <div className="container_button">
                    <button onClick={singInUser}>Entrar</button>
                </div>
            </form>
        )
}