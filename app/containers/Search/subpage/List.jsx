import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import ListComponent from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'

import { getSearchData } from '../../../fetch/search/search.js'


//初始化一个组件的 state
const initialState = {
    data: [], // 存储列表信息
    hasMore: false, // 判断当前状态下，还有没有更多的数据可供加载
    isLoadingMore: false, // 判断当前状态下，是“加载中...”还是“点击加载更多”
    page: 0, // 下一页的页码
}
class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }
    render() {
        return (
            <div >
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <div>加载中...</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : <div></div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首屏数据
    loadFirstPageData() {
        // 加载首页数据， result
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword)
        // 处理数据
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true,
        })
        // 加载下一页数据， result
        const cityName = this.props.userinfo.cityName
        const page = this.state.page // 下一页的页码
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword)

        // 处理数据
        this.resultHandle(result)
        //更新状态
        this.setState({
            isLoadingMore: false,
        })
    }
    // 数据解析， 更改 state
    resultHandle(result) {
        // 增加 page 计数
        const page = this.state.page
        this.setState({
            page: page + 1
        })

        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore
            const data = json.data
            // 存储
            this.setState ({
                hasMore:hasMore,
                data: this.state.data.concat(data)
            })
        })
    }
    // 处理重新搜索
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，忽略。重要！！！
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return
        }

        // 重置 state
        this.setState(initialState)

        // 重新加载数据
        this.loadFirstPageData()
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)
