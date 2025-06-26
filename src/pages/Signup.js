import CommonCodeTemplate from "../components/commonCodeandPage/CommonCodeTemplate";
import signImage from "../assets/Images/signu.jpg"
function Signup() {
    return (
      <CommonCodeTemplate
      title="Join the millions learning to code with StudyAdda for free"
      discrip1="Build skills for today, tomorrow and beyond."
      discrip2="Education to future-proof your career."
      image={signImage}
      formType="signup"
    />
    );
  }
  export default Signup;
  