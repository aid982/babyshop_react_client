/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
const cartIcon = <FontIcon className="material-icons">shopping_cart</FontIcon>;
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



const Logged = (props) => (

    <IconMenu style={props.style}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >

        <MenuItem primaryText="Заказы" />
        <MenuItem primaryText="Выйти"  onTouchTap={props.onAccountExit}/>
    </IconMenu>
);


class LoginWithCartComponent extends React.Component {
    static PropTypes = {
        qtyInCart: PropTypes.number.isRequired,
        account: PropTypes.object,
        onAccountExit:PropTypes.func.isRequired

    }
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <a href="/cart"><FlatButton  style={this.props.style} icon={cartIcon} label={"Корзина (" + this.props.qtyInCart + ")"}/></a>
                {this.props.account ?
                   <Logged   onAccountExit ={this.props.onAccountExit}/> : <a href="/login"><FlatButton
                        style={this.props.style} label="Войти"/>
                    </a>
                }

            </div>


        );
    }
}


export default LoginWithCartComponent;

