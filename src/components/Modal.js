import React from 'react'
import styled from 'styled-components'

const WrapperDiv = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

const MainSection = styled.section`
  position:fixed;
  background: white;
  width: 60%;
  height: 50vh;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`

const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: white;
  top: -2px;
  right: -2px;
`


const Modal = ({ handleClose, show, children }) => {
  return (
    <WrapperDiv show={show}>
      <MainSection>
        <CloseButton onClick={handleClose}>
          <i className="far fa-window-close"></i>
        </CloseButton>
        {children}
      </MainSection>
    </WrapperDiv>
  );
};

export default Modal