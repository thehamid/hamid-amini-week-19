import {Link} from 'react-router-dom'
import logo from '@/assets/logo.png'

export const Navbar = () => {
  return (
    <div className='w-full bg-gray-200'> 
    <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo not-last-of-type:">
            <img src={logo} alt="botoshop" width={50} />
        </div>
        <div className="flex gap-4">
            <Link to={`/login`} className='text-gray-600 hover:text-primary color-transition'>ورود</Link>
            <Link to={`/register`} className='text-gray-600 hover:text-primary color-transition'>ثبت نام</Link>
        </div>

    </div>
       

    </div>
  )
}
