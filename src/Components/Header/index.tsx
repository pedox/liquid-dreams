import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap'

interface Props {}

const Header: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return (
    <Fragment>
      <Navbar color='light' light expand='md' fixed='top'>
        <NavbarBrand tag={Link} to='/'>
          P0keD3x
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem onClick={close}>
              <NavLink tag={Link} to='/'>
                Pokemon Lists
              </NavLink>
            </NavItem>
            <NavItem onClick={close}>
              <NavLink tag={Link} to='/my-pokemons'>
                My Pokemon
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className='mt-5 pt-3'></div>
    </Fragment>
  )
}

export default Header
