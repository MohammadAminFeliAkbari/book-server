import "./signUpCss.css";
import FormSection from "./FormSection";
import TextSection from "./TextSection";

export default function SignUp() {
  return (
    <div className="p-8 gap-5 mx-auto md:mx-5 lg:mx-40 mb-20 ">
      <TextSection />
      <FormSection />
    </div>
  );
}
