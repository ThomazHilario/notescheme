import './admin.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import database from '../../services'
import { doc, getDoc } from 'firebase/firestore'

export default function Admin(){
    // id
    const {id} =useParams()

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
    async function addNote(){

    }

    // Exibindo modal
    function openModal(){
        if(document.getElementById('modalFormulario').style.display === 'block'){
            document.getElementById('modalFormulario').style.display = 'none'
        } else{
            document.getElementById('modalFormulario').style.display = 'block'
        }
    }

    return(
        <div id='container_aplication_notes'>

            {/* button */}
            <button id='btn-note' onClick={openModal}>Add note</button>

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
                        <div key={idx}>
                            <h1>{item.title}</h1>
                            <p>{item.note}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}