import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Hello from './hello.jsx'
import RouteMap from './router/routeMap.jsx'
//import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './static/css/common.less'
import './static/css/font-awesome.css'
//引用并执行 redux-demo
// import fn from './redux-demo.js'
// fn()

//
// const render = (Hello) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Hello />
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }
// render(Hello)



const store = configureStore()
//
// render(
//     <Provider store={store}>
//         <Hello/>
//     </Provider>,
//     document.getElementById('app')
// )



const render = (RouteMap) => {
    ReactDOM.render(
        <Provider store={store}>
            <RouteMap/>
        </Provider>,
    document.getElementById('app')
  )
}
render(RouteMap)


if (module.hot) {
  module.hot.accept(render(RouteMap))
}
