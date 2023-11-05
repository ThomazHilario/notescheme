import { useState } from "react";
import './home.css'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import database from "../../services";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home(){
    // Navegation
    let navigate = useNavigate()
    // states - input
    const [username,setUsername] = useState('')
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
            // Pegando caminho da colecao
            const bancoRef = collection(database,'Login-Users')

            // Pegando os usuarios
            const snapshot = await getDocs(bancoRef)

            // array
            const users_db = []

            // Percorrendo usuarios do banco
            snapshot.forEach(users => {
                users_db.push({
                    id:users.id,
                    name:users.data().name,
                    password:users.data().password,
                })
            })

            if(users_db.length === 0){

                // Adicionando usuario ao banco de dados
                const user = await addDoc(collection(database,'Login-Users'),{
                    name:username,
                    password:password,
                    myNotes:[]
                })

                // navegando ate a pasta
                navigate(`/admin/${user.id}`)

                // Alerta de sucesso
                toast.success('Usuario Cadastrado')

            } else if(!users_db.some((item) => item.name === username)){

                // Adicionando usuario ao banco de dados
                const user = await addDoc(collection(database,'Login-Users'),{
                    name:username,
                    password:password,
                    myNotes:[]
                })

                // navegando ate a pasta
                navigate(`/admin/${user.id}`)

                // Alerta de sucesso
                toast.success('Usuario Cadastrado')

            }else{

                // Alerta de error
                toast.error('Tente outro username!')
            }

        } catch (error) {
            console.log(error)
        }


    }

    // sing in User
    async function singInUser(e){
        // Cacelando formulario
        e.preventDefault()
        
        try {
              // Pegando caminho da colecao
              const bancoRef = collection(database,'Login-Users')

              // Pegando os usuarios
              const snapshot = await getDocs(bancoRef)
  
              // array
              const users_db = []
  
              // Percorrendo usuarios do banco
              snapshot.forEach(users => {
                  users_db.push({
                      id:users.id,
                      name:users.data().name,
                      password:users.data().password,
                  })
              })

              // Pegando usuario do banco
              let usuario = users_db.filter((item) => {
                if(item.name === username && item.password === password){
                    return true
                } else{
                    return false
                }
              })

              // Verifiacndo se o usuario existe
              if(usuario.length !== 0){
                toast.success('usuario encontrado')

                // navegando ate a pasta
                navigate(`/admin/${usuario[0].id}`)
              }else{
                toast.warn('usuario nao encontrado')
              }

        } catch (error) {
            console.log(error)
        }
    }

    // Condição de renderização
    if(pagina === true){
        return(
            <form>
                <legend className="titulo">CADASTRO</legend>
                
                {/* name */}
                <div className="container_input">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                {/* Password */}
                <div className="container_input">
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* Buttons */}
                <div className="container_button">
                    <button onClick={singUpUser}>Sing Up</button>
                    <button onClick={mudarValor}>Sing In</button>
                </div>
            </form>
        )
    }else{
        return(
            <form>
                <legend className="titulo">Login</legend>

                {/* name */}
                <div className="container_input">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                {/* Password */}
                <div className="container_input">
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* Buttons */}
                <div className="container_button">
                    <button onClick={singInUser}>Sing In</button>
                    <button onClick={mudarValor}>Sing Up</button>
                </div>
            </form>
        )
    }
}