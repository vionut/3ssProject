import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
 
import MenuItemContext from '../contexts/MenuItemContext'
import { PopularAssetStore } from '../contexts/PopularAssetContext'
import Header from './Header'
import Home from './Home'
import Categories from './Categories'
import MoviesByCategory from './MoviesByCategory'
import AssetDetails from './AssetDetails'
import Popular from './Popular'
import NotFound from './NotFound'

const renderRoutes = (menuItems) => {
  return menuItems.map(item => {
    if (['Home', 'Popular', 'Categories'].includes(item.label)) {
      return (
        <Route 
          key={item.id} 
          path={item.route} 
          exact 
          label={item.label}
          component={item.label === 'Home' ? Home : item.label === 'Popular' ? Popular : Categories} />
      )
    }
    return null;
  });
}

const App = () => {
  const menuItems = useContext(MenuItemContext)

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <PopularAssetStore>
          <Switch>
            {renderRoutes(menuItems)}
            <Route path='/movies/:categoryId' exact component={MoviesByCategory} />
            <Route path='/asset/:id' exact component={AssetDetails} />
            <Route component={NotFound} />
          </Switch>
        </PopularAssetStore>
      </div>
    </BrowserRouter>
  )
}


export default App