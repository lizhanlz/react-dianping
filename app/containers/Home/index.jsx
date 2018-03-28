import React from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader/index.jsx'
import { connect } from 'react-redux'
import Category from '../../components/Category/index.jsx'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List.jsx'

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height: '15px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
