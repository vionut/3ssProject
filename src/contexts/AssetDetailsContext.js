import React, { useEffect, useReducer } from 'react'

import { getAssetDetails, getAssetVideos } from '../api'
import Spinner from '../components/Spinner'

const Context = React.createContext();

export const AssetDetailsStore = props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      details: [],
      videos: [],
      errorMessage: '',
      loading: false
    }
  )

  const loadDetails = () => {
    setState({ loading: true })
    getAssetDetails(props.assetId).then(data => {
      console.log(data)
      setState({ details: data, loading: false })
    }).catch(err => {
      setState({ errorMessage: err, loading: false }) 
    })
  }

  const loadVideos = () => {
    setState({ loading: true })
    getAssetVideos(props.assetId).then(data => {
      console.log(data)
      setState({ videos: data.results,loading: false })
    }).catch(err => {
      setState({ errorMessage: err, loading: false })
    })
  }

  useEffect(() => loadDetails(),[])

  useEffect(() => loadVideos(), [])

  if (state.loading) return <Spinner />

  if (state.errorMessage) return <div>{state.errorMessage}</div>

  return (
    <Context.Provider value={{ assetDetails: state.details, assetVideos: state.videos }} >
      {props.children}
    </Context.Provider>
  )
}

export default Context