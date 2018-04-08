import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="userinfo-container">
                <p>
                    <i className="fa fa-fw fa-user"></i>
                    &nbsp;
                    <span>{this.props.username}</span>
                </p>
                <p>
                    <i className="fa fa-fw fa-map-marker"></i>
                    &nbsp;
                    <span>{this.props.city}</span>
                </p>
            </div>
        )
    }
}

export default UserInfo
