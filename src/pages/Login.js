import CommonCodeTemplate from "../components/commonCodeandPage/CommonCodeTemplate";
import loginImage from "../assets/Images/kj.jpg";
function Login() {
  return (
    <CommonCodeTemplate
      title="Welcome Back"
      discrip1="Build skills for today, tomorrow and beyond."
      discrip2="Education to future-proof your career."
      image={loginImage}
      formType="login"
    />
  );
}
export default Login;
