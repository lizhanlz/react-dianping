import React, { Component } from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import  Home  from '../containers/Home/index.jsx'
import  List  from '../containers/List/index.jsx'
import  Detail  from '../containers/Detail/index.jsx'
import  NotFound  from '../containers/NotFound/index.jsx'
import LocalStore from '../util/LocalStore.js'
import CITYNAME from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
            <div>{
                this.state.initDone
                ? <Switch>
                     <Route path="/" exact component={Home}/>
                     <Route path='/list' component={List}/>
                     <Route path="/detail/:userId" component={Detail}/>
                     <Route path="*" component={NotFound}/>
                 </Switch>
                : <div>加载中...</div>
            }

            </div>
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
