import React from 'react'

const Spinner = props => {
  return (
    <div className='text-center m-4'>
      <strong>{props.message}</strong>
      <div className='spinner-border' role='status'></div>
    </div>
  )
}

Spinner.defaultProps = {
  message: 'Loading...'
}

export default Spinner