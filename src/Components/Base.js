/**
 * Created by osetskiy on 3/3/2017.
 */
import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LoginWithCartComponent from './AppBarLoginWithCartComponent';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import './base.css';

const filterIcon = <FontIcon className="material-icons">filter_list</FontIcon>;


class LeftFlatButtons extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <div className="mainMenuRight">
                    <IconButton>
                        {filterIcon}
                    </IconButton>

                    <a href="/"><FlatButton style={{color: 'white', verticalAlign: 'base'}} label={"Каталог"}/></a>
                    <a href="/"><FlatButton style={{color: 'white', verticalAlign: 'base'}} label={"Доставка"}/></a>
                </div>
            </div>
        );
    }
}


const Base = ({children, qtyInCart, account, onAccountExit, onFilterTap, props}) => (

    <div>
        <AppBar
            iconElementLeft={<LeftFlatButtons/>}
            iconElementRight={<LoginWithCartComponent qtyInCart={qtyInCart} account={account}
                                                      onAccountExit={onAccountExit}/>}
        />

        {console.log(props)
        }
        {children}
    </div>


);


Base.propTypes = {
    children: PropTypes.object.isRequired,
    account: PropTypes.object,
    qtyInCart: PropTypes.number,
    onAccountExit: PropTypes.func.isRequired,
    onFilterTap: PropTypes.func.isRequired
};

export default Base;
