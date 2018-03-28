import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <span>{this.props.cityName}</span>
                    <i className="fa fa-fw fa-angle-down"></i>
                </div>
                <div className="home-header-right float-right">
                    <i className="fa fa-fw fa-user"></i>
                </div>
                <div className="home-header-middle">
                    <div className="search-container" type="text" placeholder="请输入关键字">
                        <i className="fa fa-fw fa-search"></i>
                        <input type="text" placeholder="请输入关键字"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeHeader
