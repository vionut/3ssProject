import React, { useContext } from 'react'

import { renderMovies } from './MoviesByCategory'
import PopularAssetContext from '../contexts/PopularAssetContext'

const Popular = () => {
  const popularAssets = useContext(PopularAssetContext)

  return (
    <React.Fragment>
      <h2 className="text-center mt-3 mb-3">Popular</h2>
      <div className="row">
        {renderMovies(popularAssets)}
      </div>
    </React.Fragment>
  )
}

export default Popular