import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { database, auth } from '../../services'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function Register(){

    const navigate = useNavigate()

    // states - input
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


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
                </div>
            </form>
    )
}