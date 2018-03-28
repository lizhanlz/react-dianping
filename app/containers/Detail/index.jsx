import React from 'react'

class Detail extends React.Component {
    render() {
        return (
            <p>Detail，url参数：{this.props.match.params.userId}</p>
        )
    }
}

export default Detail
