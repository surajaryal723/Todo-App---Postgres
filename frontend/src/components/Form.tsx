import axios from "axios"
import { useRef } from "react"

export default function Form(){
    const formRef=useRef('')
    async function submitForm(){
    await axios.post('http://localhost:3000/add',{
    title:formRef.current.value
})
alert('Added')
    }
    return(
        <div className="w-[30%] flex gap-4">
            <input ref={formRef} type="text" placeholder="Enter a todo" className="w-[70%] p-2 border-solid border-2 rounded-md" />
            <button onClick={submitForm} className="text-white bg-black p-2 rounded-md">Add a todo</button>
        </div>
    )
}