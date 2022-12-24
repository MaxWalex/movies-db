import { Link } from 'react-router-dom';
import Login from "../../components/auth/login/Login";

function pageLogin() {

  return (
    <section className='login'>
        <div className="container">
            <Login />
            <p>Не зарегистрированы? Тогда кликните на ссылку <Link to="/register">регистрация</Link></p>
            <p style={{marginTop: '10px'}}><Link to="/reset-password">Забыли пароль?</Link></p>
        </div>
    </section>
  )
}

export default pageLogin