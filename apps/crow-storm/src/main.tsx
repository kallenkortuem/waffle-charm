import CssBaseline from '@material-ui/core/CssBaseline'
import 'fontsource-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
)
