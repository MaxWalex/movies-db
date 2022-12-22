import { useState } from "react";
import { Link } from "react-router-dom";
import './form.scss'

function Form({title, handleClick}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

  return (
    <section className='auth'>
        <div className="container">
            <form>
                <input 
                    placeholder='Почта' 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    placeholder='Пароль' 
                    type="password" 
                    value={pass} 
                    onChange={e => setPass(e.target.value)} 
                />
                <button onClick={e => {
                    e.preventDefault()
                    handleClick(email, pass)
                }}>{title}</button>
            </form>
        </div>
    </section>
  )
}

export default Form