/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import './Product.css';
import {Card,  CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

const FilterComponent = ({ categories,sizes,onCheckCategories,onCheckSizes}) => (
    <div>
        <Card>
            <CardHeader
                title="Категории"
            />
            <CardText >
                {categories.map((element) => (<Checkbox
                        label={element.name}
                        onCheck={onCheckCategories}
                        key={element.name}
                        value={element._id}
                        checked={element.checked}
                    />
                ))}
            </CardText>
        </Card>

        <Card>
            <CardHeader
                title="Размеры"

            />
            <CardText  >
                {sizes.map((element) => (<Checkbox
                        label={element.name} checked={element.checked} value={element._id} key={element._id}
                        onCheck={onCheckSizes}
                    />
                ))}
            </CardText>
        </Card>

    </div>
);


FilterComponent.propTypes = {
    categories: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    onCheckCategories: PropTypes.func.isRequired,
    onCheckSizes: PropTypes.func.isRequired,

};

export default FilterComponent;