/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {ReactImageMagnify} from 'react-image-magnify';
import Paper from 'material-ui/Paper';
import ReactImageZoom from 'react-image-zoom';
import './Product.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
const cartIcon = <FontIcon className="material-icons" >add_shopping_cart</FontIcon>;


const style = {
    margin: 12,
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};


const ProductComponent = ({product,onChangeSizes,onCartTap,snackBarOpen,onSnackBarClose}) => (
    <Paper className="product" zDepth={5}>
        <Card>
            <CardMedia className="productImg"
                overlay={<CardTitle title={product.name}/>}
            >
                <img  src={"../img/__" + product._id + "_large.jpg"}/>
            </CardMedia>
            <CardTitle title="Описание"/>
            <CardText>
                {product.description}
            </CardText>
            <CardActions>
                <RadioButtonGroup name="shipSpeed" onChange={onChangeSizes}>
                {product.productItems && product.productItems.map((item) =>
                    <RadioButton key={item.size}
                        label={item.size}
                        value={item.size}
                        style={styles.checkbox}
                    />)}
                </RadioButtonGroup>


                <RaisedButton
                    label="В корзину"
                    backgroundColor="#a4c639"
                    icon={cartIcon}
                    style={style}
                    onTouchTap={onCartTap}
                />
            </CardActions>
        </Card>
        <Snackbar
            open={snackBarOpen}
            message="Товар добавлен в корзину"
            autoHideDuration={4000}
            onRequestClose={onSnackBarClose}
        />

    </Paper>
);


ProductComponent.propTypes = {
    snackBarOpen:PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    onChangeSizes :PropTypes.func.isRequired,
    onCartTap :PropTypes.func.isRequired,
    onSnackBarClose:PropTypes.func.isRequired

};

export default ProductComponent;