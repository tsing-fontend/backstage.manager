import React, { Component } from 'react';
import { connect } from 'react-redux';

class Index extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
               11
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Index)