import { Link } from "react-router-dom";
import SignUp from "../../components/auth/signUp/SignUp"

function pageRegister() {
  return (
    <section className="register">
        <div className="container">
            <SignUp />
            <p>Есть аккаунт? Тогда перейдите по ссылке <Link to="/login">авторизация</Link></p>
        </div>
    </section>
  )
}

export default pageRegister