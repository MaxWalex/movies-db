import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import Fade from 'react-reveal/Fade';

import '../form/form.scss';

function ResetPassword() {

    const navigate = useNavigate()

    const handleSubmit = async email => {
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            navigate('/login')
            toast.success('Сообщение было отправлено!')
        } catch(err) {
            toast.error('Не получилось отправить сброс пароля!')
        }
    }

  return (
    <section className='auth'>
        <div className='container'>
            <Fade>
                <Formik initialValues={{email: ''}}
                    validationSchema = {Yup.object({
                        email: Yup.string()
                                .email('Неправильный email адрес')
                                .required('Email обязателен для заполнения!'),
                    })}
                    onSubmit = {values => {
                        JSON.stringify(values, null, 2)
                        handleSubmit(values.email)
                    }}
                >
                    <Form>
                        <h1>Введите почту</h1>
                        <Field name="email" placeholder='Почта' />
                        <ErrorMessage name="email" className='error' component="div" />
                        <button>Сбросить пароль</button>
                    </Form>
                </Formik>
            </Fade>
        </div>
    </section>
  )
}

export default ResetPassword