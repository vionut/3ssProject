import React, { useState, useEffect } from 'react'

import { getCategories } from '../api'
import Spinner from '../components/Spinner'

const Context = React.createContext();

export const CategoryStore = (props) => {
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(
    () => { getCategories().then(data => setCategories(data.genres)).catch(err => setErrorMessage(err)) }, []
  )

  if (errorMessage) return <div>{errorMessage}</div>

  if (categories.length > 0) {
    return (
      <Context.Provider value={categories}>
        {props.children}
      </Context.Provider>
    )
  } 
  
  return <Spinner message='Loading categories...' />

}

export default Context;