import './admin.css'
import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import {database } from '../../services'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Header from '../../Components/Header'

export default function Admin(){
    // id
    const {id} =useParams()

    // state - input
    const [title, setTitle] = useState('')
    const [anotation, setAnotation] = useState('')

    // state - lista
    const [lista,setLista] = useState([])

    // state - edit e id
    const [titleNote, setTitleNote] = useState('')
    const [index, setIndex] = useState(null)
    const [editar, setEditar] = useState('')


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

    // Exibindo modal de edição
    function openEditModal(index){
        if(document.getElementById('editModal').style.display === 'flex'){
            document.getElementById('editModal').style.display = 'none'
            document.getElementById('btn-edit').textContent = 'Editar'

            // Limpando states titleNotes e editar
            setTitleNote('')
            setEditar('')

        } else{
            document.getElementById('editModal').style.display = 'flex'
            document.getElementById('btn-edit').textContent = 'Fechar'
            setIndex(index)

            // Buscando nota pelo index
            const value = lista[index]

            // Setando o title na state titleNote
            setTitleNote(value.title)

            // Setando a anotaions na state anotation
            setEditar(value.anotation)
        }
    }

    // Editando nota
    async function editNote(e){
        try {
            // Cancelando envio do formulario
            e.preventDefault()

            if(editar !== ''){
                // Buscando a referencia
                const docRef = doc(database,'Login-Users',id)
                
                // buscando nota no banco de dados do usuario
                let value = lista[index]
                
                // Alterando o valor do anotation
                value.anotation = editar

                // Atualizando a nova lista
                await updateDoc(docRef,{
                    myNotes:[...lista]
                })

                // fechando modal
                document.getElementById('editModal').style.display = 'none'

                // Alterando o conteudo do button btn-edit
                document.getElementById('btn-edit').textContent = 'Editar'

                // Resetando state editar
                setEditar('')
            }
        } catch (error) {
            console.log(error)
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

    return(
        <div id='container_aplication_notes'>

            {/* Componente Header */}
            <Header/>

            {/* Modal addNote*/}
            <ModalForm title={title} setTitle={setTitle} anotation={anotation} setAnotation={setAnotation} id={id} lista={lista}/>

            {/* Modal editNote */}
            <form id='editModal'>
                {/* titulo */}
                <legend>Editando: {titleNote}</legend>

                {/* textarea */}
                <textarea type="text" rows="5" cols="35" value={editar} onChange={(e) => setEditar(e.target.value)}/>

                <button className='btn-style btn-edit' onClick={editNote}>Editar</button>
            </form>

            {/* Container de notas */}
            <div id='container_notes'>

                {/* notas */}
                {lista.length > 0 && lista.map((item,idx) => {
                    return(
                        <div key={idx} className='card'>
                            <h1>{item.title}</h1>
                            <p>{item.anotation}</p>
                            <button className='btn-style' id='btn-delete' onClick={() => deleteNote(idx)}>Delete</button>
                            <button className='btn-style' id='btn-edit' onClick={() => openEditModal(idx)}>Editar</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}


function ModalForm({title,setTitle,anotation,setAnotation,id,lista}){

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

    return(
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
    )
}