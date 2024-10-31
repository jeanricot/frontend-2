
import { useEffect, useState, useRef } from "react";
import Trash from "../../assets/trash.svg";
import "./style.css";
import api from "../../services/api";

function Home() {
 const [users,setUsers] = useState([])
const inputName = useRef()
const inputEmail = useRef()
const inputAge = useRef()


  async function getUsers(){
 const usersFromApi = await api.get('/usuarios')
  setUsers(usersFromApi.data) 

  }

  async function criarUsers(){
     await api.post('/usuarios',{
        name : inputName.current.value,
        email : inputEmail.current.value,
        age : inputAge.current.value,
     })
     getUsers() 
  }
    async function deletarUsers (id){
    await api.delete(`/usuarios/${id}`)
    getUsers() 
    }
  
   useEffect(() => {
    getUsers() 
   }, [])
   
  
  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuarios</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="idade" type="number" ref={inputAge}/>
        <input placeholder="E-mail" name="nome" type="email" ref={inputEmail}/>
        <button type="button" onClick={criarUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome:{user.name}</p>
            <p>Idade:{user.age} </p>
            <p>Email:{user.email}</p>
          </div>
          <button className="btn" onClick={ () =>deletarUsers(user.id)} >
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
