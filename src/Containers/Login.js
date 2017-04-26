/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import LoginForm from '../Components/Login';
import {changeLoginPswrd,submit} from '../actions/login'
import {fetchDataIfNeeded} from '../actions'


class Login extends React.Component {
    render() {

        const {errors,onChange,user,onSubmit} = this.props
        return (
            <LoginForm errors={errors} onChange={onChange} user={user} onSubmit={onSubmit}/>
        )

    }

}



const mapStateToProps = (state) => {
    return {
        errors: state.login.errors,
        user  : state.login.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(fetchDataIfNeeded('products'));
    return {
        onSubmit: () => {
            dispatch(submit())
        },
        onChange: (event) => {
            dispatch(changeLoginPswrd(event))
        }
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);






