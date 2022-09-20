import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'

import logoIgnite from '../../assets/logo-ignite.png'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to={'/'} title={'Timer'} end>
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/history'} title={'History'}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
