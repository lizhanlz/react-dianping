import React, { Component } from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import  Home  from './Home/index.jsx'
import  City  from './City/index.jsx'
import  Login  from './Login/index.jsx'
import  User  from './User/index.jsx'
import  Search  from './Search/index.jsx'
import  Detail  from './Detail/index.jsx'
import  NotFound  from './NotFound/index.jsx'
import LocalStore from '../util/localStore.js'
import CITYNAME from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import history from '../util/history.js'
import * as userInforActionsFormOtherFile from '../actions/userinfo.js'

class App extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <Router history={history}>
                <div>{
                    this.state.initDone
                    ? <Switch>
                         <Route path="/" exact component={Home}/>
                         <Route path='/city' component={City}/>
                         <Route path='/Login/:router?' component={Login}/>
                         <Route path='/User' component={User}/>
                         <Route path='/search/:category/:keyword?' component={Search}/>
                         <Route path="/detail/:id" component={Detail}/>
                         <Route path="*" component={NotFound}/>
                     </Switch>
                    : <div>加载中...</div>
                }
                </div>
            </Router>
        )
    }
    componentDidMount() {
        // 从 localstorerage 里面获取城市
        let cityName = LocalStore.getItem(CITYNAME)
        if (cityName == null) {
            cityName = '北京'
        }

        // 将城市信息存储到 Redux 中
        this.props.userInfoActions.update({
            cityName: cityName
        })
        setTimeout(() => {
            this.setState({
                initDone: true
            })
        }, 1000)
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInforActionsFormOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
