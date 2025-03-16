import { useEffect, useState } from "react"
import Todo from "./components/Todo"
import axios from "axios"
import Form from "./components/Form"


function App() {
  const [todos,setTodos]=useState([])

  useEffect(()=>{
    async function getData(){
      const res=await axios.get('http://localhost:3000/todos')
      
      setTodos(res.data.todos)
      
    }
    getData()
  },[])

  return (
    <>
    <div className="bg-[#FBF5F3] w-full h-screen overflow-y-scroll flex flex-col gap-5 items-center py-10">
      
      {
        todos.map((todo)=><Todo title={todo.title} key={todo.id}/>)
      }
      <Form/>
    </div>
    
    </>
  )
}

export default App
