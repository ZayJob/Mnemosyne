import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


class Activate extends React.Component {

    componentDidMount() {
        const uid = this.props.match.params.uid;
        const token = this.props.match.params.token;
        this.props.onActiv(uid, token)
        this.props.history.push('/');
    }

    render () {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onActiv: (uid, token) => dispatch(actions.authActivation(uid, token)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);