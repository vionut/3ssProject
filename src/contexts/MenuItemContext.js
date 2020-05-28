import React, { useState, useEffect } from 'react';

import { getMenuItems } from '../api'
import Spinner from '../components/Spinner'

const Context = React.createContext()

export const MenuItemStore = (props) => {
  const [menuItems, setMenuItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(
    () => {
      getMenuItems().then(data =>{
        console.log(data)
        setMenuItems(data)
      }).catch(err => setErrorMessage(err))
    },
    []
  )

  if (errorMessage) return <div>{errorMessage}</div>

  if (!menuItems || menuItems.length === 0) return <Spinner message="Loading menu..." />

  return (
    <Context.Provider value={menuItems}>
      {props.children}
    </Context.Provider>
  )

}

export default Context;

