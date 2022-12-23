import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import './form.scss'

function FormCustom({title, handleClick}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

  return (
    <section className='auth'>
        <div className="container">
            <form onSubmit={e => {
                    e.preventDefault()
                    handleClick(email, pass)
                }}>
                <h1>{title}</h1>
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
                <button>{title}</button>
            </form>
        </div>
    </section>
  )
}

export default FormCustom