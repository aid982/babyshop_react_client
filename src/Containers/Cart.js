/**
 * Created by osetskiy on 3/15/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import CartComp from '../Components/Cart';

class Cart extends React.Component {

    render() {
        const {cartContent} = this.props
        return (
            <CartComp cart={cartContent}/>
        )

    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        cartContent: state.cart.cartContent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {


    return {

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);






