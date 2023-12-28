import { auth } from "../../services"
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Header(){

    // navigate
    const navigate = useNavigate() 

    // Exibindo modal
    function openModal(){
        if(document.getElementById('modalFormulario').style.display === 'block'){
            document.getElementById('modalFormulario').style.display = 'none'
        } else{
            document.getElementById('modalFormulario').style.display = 'block'
        }
    }

     // Saindo da conta
     async function logOut(){
        
        try{
            await signOut(auth)
            navigate('/')  

        }catch(error){
            console.log(error)
        }
    }

    return(
        <div id='container_buttons'>
                {/* button openModal*/}
                <button id='btn-note' onClick={openModal}>Add note</button>

                {/* button logOut */}
                <button id='btn-singOut' onClick={logOut}>Sair</button>
            </div>
    )
}