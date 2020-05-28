import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import CategoryContext, { CategoryStore } from '../contexts/CategoryContext'


const CategoryLink = styled(Link)`
  border-radius: 25px;
  height: 100px;
  transition: 0.5s;
  text-decoration: none !important;
  &:hover {
    background-color: black !important;
    cursor: pointer;
    transform:scale(1.2)
  }
`


const renderCategories = (categories) => {
  return categories.map(cat => {
    return (
      <div key={cat.id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <CategoryLink to={`/movies/${cat.id}`} className="card m-4 bg-info">
          <div className="card-body">
            <h5 className="text-center text-light">
              <strong>{cat.name}</strong>
            </h5>
          </div>
        </CategoryLink>
      </div>
    )
  })
}

const Categories = () => {
  return (
    <CategoryStore>
      <CategoryContext.Consumer>
        {categories => {
          return (
            <React.Fragment>
              <h2 className="text-center mt-3 mb-3">Categories</h2>
              <div className="row">
                {renderCategories(categories)}
              </div>
            </React.Fragment>
          )
        }}
      </CategoryContext.Consumer>
    </CategoryStore>
  )
}

export default Categories