import React, { useState, useEffect } from 'react'

import { getPopularAssets } from '../api'
import Spinner from '../components/Spinner'

const Context = React.createContext();

export const PopularAssetStore = (props) => {
  const [popularAssets, setPopularAssets] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(
    () => { getPopularAssets().then(data => setPopularAssets(data)).catch(err => setErrorMessage(err)) }, []
  )

  if(errorMessage) return <div>{errorMessage}</div>

  if (popularAssets.length > 0) {
    return (
      <Context.Provider value={popularAssets}>
        {props.children}
      </Context.Provider>
    )
  }

  return <Spinner message='Loading popular videos...' /> 
}

export default Context;