/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router'
import './ProductList.css';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FilterComponent from './FilterComponent'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

const forward = <FontIcon className="material-icons">navigate_next</FontIcon>;
const backward = <FontIcon className="material-icons">navigate_before</FontIcon>;
const number = <FontIcon className="material-icons">arrow_drop_down</FontIcon>;



/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */

const filterCloseStyle = {
    margin: 10,
};


const ProductListComponent = ({categories, sizes, productList, onCheckSizes, onCheckCategories, onNext, onPrev, currentPage,openDrawer,onFilterClose}) => (


    <div className="productMain">

        <Paper className="productFilter" zDepth={5}>
            <FilterComponent categories={categories} sizes={sizes} onCheckCategories={onCheckCategories} onCheckSizes={onCheckSizes}/>
        </Paper>

        <Drawer open={openDrawer}>
            <FilterComponent categories={categories} sizes={sizes} onCheckCategories={onCheckCategories} onCheckSizes={onCheckSizes}/>
            <RaisedButton label="Применить" onTouchTap={onFilterClose} style={filterCloseStyle}/>
        </Drawer>

        <div className="productList">
            {productList.map((product) => (
                <Paper className="productListBox" zDepth={2} key={product._id}>
                    <Link to={"/product/" + product._id}>
                        <img className="productListImg" src={"img/_" + product.prodId + "_large.jpg"}/>
                        <span className="productListText">{product.name}</span>
                        <span className="productListPrice">{product.price} грн.</span>
                    </Link>
                </Paper>

            ))}
            <BottomNavigation className="bottomNav" selectedIndex={3}>
                <BottomNavigationItem
                    label=""
                    icon={backward}
                    onTouchTap={onPrev}
                />
                <BottomNavigationItem
                    label={currentPage}
                    icon={number}
                />
                <BottomNavigationItem
                    label=""
                    icon={forward}
                    onTouchTap={onNext}

                />
            </BottomNavigation>


        </div>


    </div>
);


ProductListComponent.propTypes = {
    productList: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    onCheckCategories: PropTypes.func.isRequired,
    onCheckSizes: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onFilterClose: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    openDrawer: PropTypes.bool.isRequired
};

export default ProductListComponent;