/**
 * Created by osetskiy on 3/15/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {updateFilterAndProductList,updatePagination,updateCurrentPage,fetchDataIfNeeded,drawerChange} from '../actions'
import ProductListComponent from '../Components/ProductListComponent';


class ProductList extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        productList: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        sizes: PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,

    }


    componentDidMount() {
        console.log('ppr');
        console.log(this.props);

    }


    render() {
        const {productList, categories, sizes, currentPage, onFilterClose,onCheckedSizes, onCheckedCategories,onNext,onPrev,openDrawer} = this.props
        return (
            <ProductListComponent productList={productList} categories={categories} sizes={sizes}
                                  onCheckSizes={onCheckedSizes} onCheckCategories={onCheckedCategories} onNext={onNext} onPrev={onPrev} currentPage={currentPage} openDrawer={openDrawer} onFilterClose={onFilterClose}/>
        )

    }

}
const mapStateToProps = state => {
    return {
        productList: state.dataFromAPI.visibleProducts,
        categories: state.dataFromAPI['categories'].items,
        sizes: state.dataFromAPI['sizes'].items,
        currentPage: state.dataFromAPI.currentPage,
        openDrawer: state.dataFromAPI.openDrawer,
    }
}
const mapDispatchToProps = (dispatch) => {
    dispatch(fetchDataIfNeeded('sizes'));
    dispatch(fetchDataIfNeeded('products'));
    dispatch(fetchDataIfNeeded('categories'));

    return {
        onCheckedSizes: (event, isChecked) => {
            dispatch(updateFilterAndProductList(event.target.value, isChecked, 'sizes'))
        },
        onCheckedCategories: (event, isChecked) => {
            dispatch(updateFilterAndProductList(event.target.value, isChecked, 'categories'))
        },
        onNext: () => {
            dispatch(updateCurrentPage('+'))
            dispatch(updatePagination())

        },
        onPrev: () => {
            dispatch(updateCurrentPage('-'))
            dispatch(updatePagination())

        },
        onFilterClose: () => {
            dispatch(drawerChange())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);





