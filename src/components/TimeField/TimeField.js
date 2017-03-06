import React from 'react'
import {withFormValue, ErrorList} from 'react-forms'
import 'material-design-lite/src/textfield/textfield';

import './TimeField.css';

class Field extends React.Component {

    constructor(props) {
        super(props);
        let {formValue} = this.props;

        this.state = {
            isError: formValue.errorList.length > 0
        };
    }

    render() {
        const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label '+ (this.state.isError ? 'is-invalid' : '');

        return (
            <div className={classes}>
                <input className="mdl-textfield__input" type="text" id={this.props.select} value={this.props.formValue.value} onChange={this.onChange.bind(this)} placeholder="HH:mm"/>
                <label className="mdl-textfield__label">{this.props.label}</label>
                <ErrorList className="mdl-textfield__error" formValue={this.state.value} />
            </div>
        )
    }

    onChange = (e) => this.props.formValue.update(e.target.value)
}

export default withFormValue(Field);