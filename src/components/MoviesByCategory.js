import React, { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getMoviesByCategory } from '../api'
import Spinner from './Spinner'


const AssetLink = styled(Link)`
  border-radius: 25px;
  height: 300px;
  transition: 0.5s;
  text-decoration: none !important;
  img {
    height: 80%;
    border-radius: 25px;
  }
  &:hover {
    cursor: pointer;
    transform:scale(1.2)
  }
`

export const renderMovies = (movies) => {
  return movies.map(m => {
    return (
      <div key={m.id} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
        <AssetLink to={`/asset/${m.id}`} className="card m-4 bg-info">
          <img 
            className="card-img-top" 
            alt="not found" 
            src={`https://image.tmdb.org/t/p/original${m.poster_path}`} 
          />
          <div className="card-body">
            <h6 className="text-center text-light">{m.title}</h6>
          </div>
        </AssetLink>
      </div>
    )
  })
}


const MoviesByCategory = (props) => {
  const [element, setElement] = React.useState(null);

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      movies: [],
      errorMessage: '',
      loading: false,
      page: 0,
      hasMore: true
    }
  )

  const { categoryId } = props.match.params

  const loadMore = () => {
    if (state.hasMore) {
      setState({loading: true, errorMessage: ''})
      getMoviesByCategory(categoryId, state.page + 1).then(data => {
        setState({
          loading: false, 
          movies: state.movies.concat(data.results), 
          page: data.page, 
          hasMore: state.movies.length + data.results.length < data.total_results 
        })
        console.log(state)
      }).catch(err => {
        setState({loading: false, errorMessage: err})
      })
    }
  }

  const loader = React.useRef(loadMore)

  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loader.current();
      }
    }, { threshold: 1 }))

    
  useEffect(() => {
    loader.current = loadMore
  }, [loadMore])

  useEffect(
    () => {
      const currentElement = element;
      const currentObserver = observer.current;

      if (currentElement) {
        currentObserver.observe(currentElement)
      }

      return () => {
        if (currentElement) {
          currentObserver.unobserve(currentElement)
        }
      }
    },
    [element]
  )

  return (
    <React.Fragment>
      <h2 className="text-center mt-3 mb-3">Movies</h2>
      <div className="row">
        {renderMovies(state.movies)}
        <div ref={setElement} className="col-lg-4 col-md-4 col-sm-4 col-xs-6 d-flex justify-content-center">
          {state.loading ? <Spinner /> : null}
          {state.errorMessage ? <Spinner message={`${state.errorMessage}. Retrying...`} /> : null}
        </div>
      </div>
    </React.Fragment>
  )

  
}

export default MoviesByCategory