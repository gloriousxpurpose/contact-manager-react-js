import { render } from 'preact'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import App  from './app.jsx'
import store from './store/store.js'

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
