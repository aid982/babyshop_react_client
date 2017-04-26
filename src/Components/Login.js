/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import './Login.css';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Login = ({onChange,onSubmit, user,errors}) => (
    <Paper className="loginMain" zDepth={5}>
        <Card className="loginContainer">

            <h2 className="card-heading">Login</h2>
            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Email"
                    name="email"
                    errorText={errors.email}
                    onChange={onChange}
                    value={user.email}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                />
            </div>

            <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary  onTouchTap={onSubmit}/>
            </div>


        </Card>


    </Paper>
);


Login.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Login;