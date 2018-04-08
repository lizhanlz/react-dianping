import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import history from '../../util/history.js'
import Header from '../../components/Header/index.jsx'
import LoginComponent from '../../components/Login/index.jsx'



import * as userInfoActionsFromOtherFile from '../../actions/userinfo'


class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            checking: true
        }
    }
    render() {
        return (
            <div>

                <Header title="用户登录" backRouter="/"/>

                {
                    // 等待验证之后，再显示登录信息
                    this.state.checking
                    ? <div></div>
                    : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount() {
        // 判断是否已经登录
        this.doCheck()
    }
    //登录成功之后的处理
    loginHandle(username) {
        //保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)

        //跳转链接
        const params = this.props.match.params
        const router = params.router
        if (router) {
            //跳转到指定页面
            history.push(decodeURIComponent(router))
        } else {
            //跳转到用户中心页面
            this.goUserPage()
        }
    }
    doCheck() {
        const userinfo = this.props.userinfo
        if (userinfo.username) {
            //已经登录
            this.goUserPage()
        } else {
            //尚未登录
            this.setState({
                checking: false
            })
        }
    }
    goUserPage() {
        history.push('/User')
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
// export default Login
