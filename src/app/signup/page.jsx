import './signUpCss.css'
import FormSection from './FormSection'
import TextSection from './TextSection'

export default function SignUp () {
  return (
    <div className='app p-8 gap-5 max-w-[1400px] lg:mr-[15%] mb-20 '>
      <TextSection />
      <FormSection />
    </div>
  )
}
