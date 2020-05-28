import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { MenuItemStore } from './contexts/MenuItemContext'

ReactDOM.render(<MenuItemStore><App /></MenuItemStore>, document.getElementById('root'))