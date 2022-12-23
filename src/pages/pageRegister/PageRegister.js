import { Link } from "react-router-dom";
import SignUp from "../../components/auth/signUp/SignUp"

function pageRegister() {
  return (
    <section className="register">
        <div className="container">
            <SignUp />
            <p>Не авторизированный? Тогда кликните на ссылку <Link to="/login">авторизация</Link></p>
        </div>
    </section>
  )
}

export default pageRegister