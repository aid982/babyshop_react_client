/**
 * Created by osetskiy on 3/15/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import ProductComponent from '../Components/ProductComponent';
import {fetchDataIfNeeded} from '../actions'
import {chooseProduct, addToCart, closeSnackBar} from '../actions/cart'

var productTMP = {}

class Product extends React.Component {

    render() {
        const {product, onChangeSizes, onCartTap, snackBarOpen, onSnackBarClose} = this.props
        return (
            <ProductComponent product={product} onChangeSizes={onChangeSizes} onCartTap={onCartTap}
                              snackBarOpen={snackBarOpen} onSnackBarClose={onSnackBarClose}/>
        )

    }

}

const getProductFromState = (productArray, id) => {
    let product = productArray.find((element) => {
        return element._id === id;
    })
    if (product) {
        productTMP = product;
        return product
    }
    ;
    return {};
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: getProductFromState(state.dataFromAPI['products'].items, ownProps.params.id),
        snackBarOpen: state.cart.snackBarOpen

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(fetchDataIfNeeded('products'));

    return {
        onChangeSizes: (event, value) => {
            dispatch(chooseProduct(ownProps.params.id, value,productTMP.price,productTMP.name))
        },
        onCartTap: () => {
            dispatch(addToCart())

        },
        onSnackBarClose: () => {
            dispatch(closeSnackBar())

        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);






