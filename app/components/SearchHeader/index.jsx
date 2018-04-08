import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import history from '../../util/history.js'
import SearchInput from '../SearchInput/index.jsx'

import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="search-header" className="clear-fix">
            <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                <i className="fa fa-fw fa-angle-left"></i>
            </span>
            <div className="input-container">
                <i className="fa fa-fw fa-search"></i>
                &nbsp;
                <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
            </div>
        </div>
        )
    }
    clickHandle() {
        window.history.back()
    }
    enterHandle(value) {
        history.push('/search/all/' + encodeURIComponent(value))
    }
}

export default SearchHeader
