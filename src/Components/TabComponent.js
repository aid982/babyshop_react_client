/**
 * Created by osetskiy on 3/3/2017.
 */
import React, {PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './Tab.css'


const TabComponent = ({children}) => (
    <Tabs className="tabComponent">

        <Tab label="Каталог"  data-route="/ee">
            { /* child component will be rendered here */ }
            {children}
        </Tab>


        <Tab label="Доставка">
            { /* child component will be rendered here */ }

        </Tab>

        <Tab label="Оплата">
            { /* child component will be rendered here */ }

        </Tab>
    </Tabs>
);

TabComponent.propTypes = {
    children: PropTypes.object.isRequired
};


export default TabComponent;
