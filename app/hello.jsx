import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import A from './components/A.jsx'
import B from './components/B.jsx'
import C from './components/C.jsx'
import * as userinfoActions from './actions/userinfo.js'
class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>hello world</p>
                <hr/>
                <A userinfo={this.props.userinfo}/>
                <hr/>
                <B userinfo={this.props.userinfo}/>
                <hr/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
    componentDidMount() {
        // 模拟登陆
        this.props.userinfoActions.login({
            userid: 'abc',
            city: 'beijing'
        })
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)

// class Hello extends React.Component {
//     constructor(props, context) {
//         super(props, context)
//         this.state = {
//             //显示当前时间
//             now: Date.now()
//         }
//     }
//     render() {
//         var arr = ['aa', 'bb', 'cc']
//         return (
//             <div>
//                 <p onClick={this.clickHandler.bind(this)}>Hello World!123 {this.state.now}</p>
//                 <ul>
//                     {arr.map(function(item, index) {
//                         return <li key={index}>{item}</li>
//                     })}
//                 </ul>
//             </div>
//         )
//     }
//     clickHandler() {
//         this.setState({
//             now: Date.now()
//         })
//     }
// }
//
// export default Hello
