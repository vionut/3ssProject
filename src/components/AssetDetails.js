import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

import AssetDetailsContext, { AssetDetailsStore } from '../contexts/AssetDetailsContext'
import Modal from './Modal'


const Genre = styled.div`
  font-size: 15px;
`

const Rating = styled.li`
  border: 4px solid lightblue;
  border-radius: 50% !important;
`

const Trailer = styled.li`
  border: none;
`

const renderAssetDetails = (assetDetails, assetVideos, showModal) => {
  const genres = assetDetails && assetDetails.genres && 
    assetDetails.genres.map(g => <Genre key={g.id}>{g.name}</Genre>)

  return (
    <div className="card m-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img 
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${assetDetails.poster_path}`} 
            alt="not found"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{assetDetails.original_title}</h5>
            <ul className="list-group list-group-horizontal-sm mt-4">
              <Rating className="list-group-item align-middle text-info font-weight-bold">
                {assetDetails.vote_average}
              </Rating>
              {assetVideos && assetVideos.length > 0 ? 
              <Trailer className="list-group-item align-middle">
                <button type="button" className="btn btn-outline btn-info" onClick={showModal}>
                  <i className="fas fa-play"></i> Play Trailer
                </button>
              </Trailer> : null}
            </ul>
            <p className="card-text mt-4 font-italic">Overview</p>
            <p className="card-text text-justify">{assetDetails.overview}</p>
            <p className="card-text mt-4 font-italic">Genres</p>
            <div className="d-flex justify-content-around text-info">
              {genres}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AssetDetails = (props) => {
  const [showModal, setShowModal] = useState(false)
  const { id } = props.match.params

  const show = () => {
    setShowModal(true)
  }

  const hide = () => {
    setShowModal(false)
  }

  return (
    <AssetDetailsStore assetId={id}>
      <AssetDetailsContext.Consumer>
        {({assetDetails, assetVideos}) => {
          return (
            <React.Fragment>
              {renderAssetDetails(assetDetails, assetVideos, show)}
              { assetVideos && assetVideos.length > 0 && assetVideos.find(v => v.type === 'Trailer') ? 
              (<Modal show={showModal} handleClose={hide}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${assetVideos.find(v => v.type === 'Trailer').key}`}
                  width="100%"
                  height="100%"
                  playing={showModal}
                  controls={true}
                />
              </Modal>) : null
              }
            </React.Fragment>
          )}
        }
      </AssetDetailsContext.Consumer>
    </AssetDetailsStore>
  )
}

export default AssetDetails