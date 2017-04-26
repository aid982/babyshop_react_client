/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import './Cart.css';
import { Card, CardText } from 'material-ui/Card';
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Cart = ({cart}) => (
    <Paper className="cartMain" zDepth={5}>
        <Card className="cartContainer">
            {cart.map((product) => (
                <Paper className="productCartList" zDepth={2} key={product._id}>
                    <Link to={"/product/" + product._id}>
                        <img className="productCartImg" src={"img/_" + product._id + "_large.jpg"}/>
                        <span className="productCartText">{product.name}</span>
                        <span className="productCartPrice">{product.price} грн.</span>
                        <span className="productCartQty">{product.qty} грн.</span>
                    </Link>
                </Paper>

            ))}


        </Card>


    </Paper>
);


Cart.propTypes = {
    cart: PropTypes.array.isRequired
};

export default Cart;