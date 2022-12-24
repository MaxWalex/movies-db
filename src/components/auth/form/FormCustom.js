import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Fade from 'react-reveal/Fade';

import './form.scss';

function FormCustom({title, handleClick}) {

  return (
    <section className='auth'>
        <div className="container">
            <Fade big>
                <Formik initialValues = {{email: '', password: ''}}
                    validationSchema = {Yup.object({
                        password: Yup.string()
                                .min(6, 'Минимум 6 символа для заполнения')
                                .required('Пароль обязателен для заполнения!'),
                        email: Yup.string()
                                .email('Неправильный email адрес')
                                .required('Email обязателен для заполнения!'),
                    })}
                    onSubmit = {values => {
                        JSON.stringify(values, null, 2)
                        handleClick(values.email, values.password)
                    }}
                >
                    <Form>
                        <h1>{title}</h1>
                        <Field name="email" placeholder='Почта' type="email" />
                        <ErrorMessage className="error" name="email" component="div" />
                        <Field name="password" placeholder='Пароль' type="password" />
                        <ErrorMessage className="error" name="password" component="div" />
                        <button>{title}</button>
                    </Form>
                </Formik>
            </Fade>
        </div>
    </section>
  )
}

export default FormCustom