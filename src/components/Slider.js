import React, { useState } from "react"
import styled, { css } from 'styled-components'

const SliderWrapper = styled.div`
  width: 100%;
  height: 80vh;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: black;
  i {
    font-size: 2vw;
  }
`

const SliderItem = styled.div`
  min-width: 100%;
  transition: 0.5s;
  transform: ${props => `translateX(${props.x}%)` }
`

export const SliderImage = styled.img`
  width: 100%;
  height: auto;
`

const buttonStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10%;
  height: 80%;
  background: none;
  border: none;
  outline: none;
  transition: 0.5s;
  &:hover {
    background: rgba(0, 0, 0, 0.356);
    cursor: pointer;
    i {
      color: white
    }
  }
`

const LeftButton = styled.button`
  ${buttonStyles}
  left: 0
`

const RightButton = styled.button`
  ${buttonStyles}
  right: 0
`

const Slider = ({ sliderItems }) => {
  const [x, setX] = useState(0)

  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderItems.length - 1)) : setX(x + 100)
  }

  const goRight = () => {
    x === -100 * (sliderItems.length -1) ? setX(0) : setX(x - 100)
  }

  return (
    <SliderWrapper>
      {sliderItems.map((item, index) => {
        return (
          <SliderItem key={index} x={x}>{item}</SliderItem>
        )
      })}
      <LeftButton onClick={goLeft}>
        <i className="fas fa-chevron-left" />
      </LeftButton>
      <RightButton onClick={goRight}>
        <i className="fas fa-chevron-right" />
      </RightButton>
    </SliderWrapper>
  )
}

export default Slider;