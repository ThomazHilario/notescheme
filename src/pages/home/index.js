import { useState, useEffect } from "react";
import './home.css'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {database, auth} from "../../services";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";

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

    // states - rederização
    const [pagina,setPagina] = useState(true)

    // Mudando o valor da state para false
    function mudarValor(e){
        // cancelando formulario
        e.preventDefault()

        // Mudando o valor da state para false
        if(pagina === true){
            setPagina(false)
        } else{
            setPagina(true)
        }
    }

    // sing Up User
    async function singUpUser(e){
        // cancelando formulario
        e.preventDefault()
        try {
            // Criando usuario
            const users = await createUserWithEmailAndPassword(auth,email,password)

            // Criando banco de dados deste usuario
            await setDoc(doc(database, "Login-Users", users.user.uid), {
                myNotes:[]
            });

            // navegando ate a pasta
            navigate(`/admin/${users.user.uid}`)

            // Alerta de sucesso
            toast.success('Usuario Cadastrado')

        } catch (error) {
            // Caso o email ja esteja registrado.
            if(error.code === 'auth/email-already-in-use'){
                toast.error('Este email ja foi registrado!')
            } else{
                // Caso a senha tenha menos de 6 caracteres.
                toast.warn('A sua senha deve conter ate 6 caracteres!!')
            }
        }


    }

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

    // Condição de renderização
    if(pagina === true){
        return(
            <form>
                <legend className="titulo">CADASTRO</legend>
                
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
                    <button onClick={singUpUser}>Cadastrar</button>
                    <button onClick={mudarValor}>Fazer login</button>
                </div>
            </form>
        )
    }else{
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
                    <button onClick={mudarValor}>Fazer Cadastro</button>
                </div>
            </form>
        )
    }
}