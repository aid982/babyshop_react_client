/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import BaseComponent from '../Components/Base';
import {accountExit} from '../actions/login'
import {drawerChange} from '../actions'

class Base extends React.Component {
    render() {
        const {qtyInCart, children,onAccountExit,account,onFilterTap} = this.props
        return (
            <BaseComponent children={children} qtyInCart={qtyInCart} account={account}
                           onAccountExit={onAccountExit} onFilterTap={onFilterTap}/>
        )

    }

}


const mapStateToProps = (state) => {
    return {
        qtyInCart: state.cart.cartContent.length,
        account: state.login.account
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAccountExit: () => {
            dispatch(accountExit())
        },
        onFilterTap: () => {
            dispatch(drawerChange())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Base);






