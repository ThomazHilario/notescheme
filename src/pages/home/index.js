import { useState } from "react";
import './home.css'

export default function Home(){
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

                {/* buttons */}
                <div className="container_button">
                    <button>Sing Up</button>
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

                <div className="container_button">
                    <button>Sing In</button>
                    <button onClick={mudarValor}>Sing Up</button>
                </div>
            </form>
        )
    }
}