import React from 'react'

import Slider from './Slider'
import { SliderImage } from './Slider'
import PopularVideoContext from '../contexts/PopularAssetContext'

const renderSlider = popularItems => {
  const sliderImages = popularItems.map(
    i => <SliderImage src={`https://image.tmdb.org/t/p/original${i.poster_path}`} alt="not found" />
  )

  return <Slider sliderItems={sliderImages} />
}

const Home = () => {
  return (
    <React.Fragment>
      <PopularVideoContext.Consumer>
        {popularItems => renderSlider(popularItems)}
      </PopularVideoContext.Consumer>
    </React.Fragment>
  )
}

export default Home