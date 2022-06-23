import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import loginStyles from "../styles/Login.module.css";

export default function Login() {
  return (
    <div className={loginStyles.loginContainer}>
      <LoginForm />
    </div>
  );
}
