import React from 'react'
import { LOGO } from '../utils/constant'

const Header = () => {
  return (
    <div className="absolute w-full px-4 py-2 bg-gradient-to-b from-black z-20">
      <img className="w-32 md:w-44" src={LOGO} alt='logo'/>
    </div>
  )
}

export default Header
