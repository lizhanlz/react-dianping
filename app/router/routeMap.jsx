import React, { Component } from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
import  App  from '../containers/App.jsx'



class RouteMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }
    render() {
        return (<HashRouter   onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}></Route>

            </HashRouter>
        )
    }
}


export default RouteMap
