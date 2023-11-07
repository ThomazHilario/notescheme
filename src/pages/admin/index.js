import './admin.css'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {database, auth} from '../../services'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {signOut} from 'firebase/auth'

export default function Admin(){
    // id
    const {id} =useParams()

    // navigate
    const navigate = useNavigate()

    // state - input
    const [title, setTitle] = useState('')
    const [anotation, setAnotation] = useState('')

    // state - lista
    const [lista,setLista] = useState([])

    // Pegando minha lista
    useEffect(() => {
        async function loadLista(){
            try{
                // Buscando a referência do banco de dacos
                const docRef = doc(database,"Login-Users",id)
                
                // Pegando a coleção
                const snapshot = await getDoc(docRef)
                
                // Setando no state Lista
                setLista(snapshot.data().myNotes)
            }catch(e){
                console.log(e)
            }
        }
        // Chamando loadLista
        loadLista()
    },[id,lista])

    // Adicionando notas 
    async function addNote(e){
        try {
            // cancelando formulario
            e.preventDefault()

           if(title !== '' && anotation !== ''){
             // Fechando modal
             document.getElementById('modalFormulario').style.display = 'none'
            
             // Buscando a referencia
             const docRef = doc(database,'Login-Users',id)
 
             // Atualizando notas
             await updateDoc(docRef,{
                 myNotes:[...lista,{title:title,anotation:anotation}]
             })
 
             
 
             // Zerando inputs
             setTitle('')
             setAnotation('')
           }

        } catch (error) {
            console.log(error)
        }
    }

    // Exibindo modal
    function openModal(){
        if(document.getElementById('modalFormulario').style.display === 'block'){
            document.getElementById('modalFormulario').style.display = 'none'
        } else{
            document.getElementById('modalFormulario').style.display = 'block'
        }
    }

    // Excluindo nota
    async function deleteNote(index){
        try {
            // Tirando item da lista
            lista.splice(index,1)

            // Buscando o banco de referencia
            const docRef = doc(database,'Login-Users',id)

            // Alterando a nova lista
            await updateDoc(docRef, {
                myNotes:[...lista]
            })
            
        } catch (error) {
            console.log(error)
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
        <div id='container_aplication_notes'>

            <div id='container_buttons'>
                {/* button openModal*/}
                <button id='btn-note' onClick={openModal}>Add note</button>

                {/* button logOut */}
                <button id='btn-singOut' onClick={logOut}>Sair</button>
            </div>

            {/* Modal */}
            <form id='modalFormulario'>

                {/* title */}
                <div>
                    <label>Title:</label>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                {/* anotation */}
                <div>
                    <label>Anotation:</label>
                    <textarea type='text' rows='5' cols='35' value={anotation} onChange={(e) => setAnotation(e.target.value)}/>
                </div>

                {/* button */}
                <div>
                    <button onClick={addNote} id='btn-addNote'>Add</button>
                </div>
            </form>

            {/* Container de notas */}
            <div id='container_notes'>

                {/* notas */}
                {lista.map((item,idx) => {
                    return(
                        <div key={idx} className='card'>
                            <h1>{item.title}</h1>
                            <p>{item.anotation}</p>
                            <button id='btn-delete' onClick={() => deleteNote(idx)}>Delete</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}