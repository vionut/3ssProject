import React from 'react'
import { Link } from 'react-router-dom'

import MenuItemContext from '../contexts/MenuItemContext'

const renderHeader = (menuItems) => {
  return menuItems.map(item => {
    return <li key={item.id} className="nav-item"><Link to={item.route} className="nav-link text-light">{item.label}</Link></li>
  })
}

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-info px-5">
      <Link to="/" className="navbar-brand text-light">3SS</Link>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <MenuItemContext.Consumer>
            {menuItems => renderHeader(menuItems)}
          </MenuItemContext.Consumer>
        </ul>
      </div>
    </nav>
  )
}

export default Header