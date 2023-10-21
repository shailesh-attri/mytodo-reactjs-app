import React from 'react'
import { Button } from '@material-tailwind/react'
import { UilLinkedin,UilGithub,UilGlobe,UilClipboardNotes } from '@iconscout/react-unicons'
const Navbar = () => {
  return (
    <div className='Header flex items-center justify-between p-6 py-4 border-b-2 border-fuchsia-400'>
      <label htmlFor="" className='flex items-center justify-center'><UilClipboardNotes/><span>MyToDoList.com</span></label>
      <div className="nav-menu flex items-center justify-around">
        <ul className="nav-menu flex items-center justify-around gap-4">
            <a href="https://shailesh-attri.github.io/" target='_blank' title='MyWebsite'><UilGlobe/></a>
            <a href="https://github.com/shailesh-attri" target='_blank' title='Github'><UilGithub/></a>
            <a href="https://www.linkedin.com/in/shailesh-attri-web/" target='_blank' title='LinkedIn'><UilLinkedin/></a>
            <a href="mailto:shaileshattri83@gmail.com"><Button className='p-2 capitalize py-1' >Email Us</Button></a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
