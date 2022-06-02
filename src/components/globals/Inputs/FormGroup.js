import React from 'react';
import './form-group.scss';


class FormGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            isEmpty: true,
        }
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
    handleChange = (e) => {
        this.getInputChildFunction()(e);
        if(e.target.value.length > 0) this.setState({ isEmpty: false });
        else this.setState({ isEmpty: true });
    };

    componentDidMount() {
        const {children, forceNotEmpty} = this.props;
        const numberOfChildren = React.Children.count(children);
        
        if(forceNotEmpty) return this.setState({isEmpty: false});
        if(numberOfChildren === 0) return null;
        if(numberOfChildren === 1) {
            if(this.childIsInputType(children) && children.props.value.length > 0) {
                this.setState({isEmpty: false});
            }
        }
        React.Children.forEach(children, (child) => {
            if(this.childIsInputType(child) && child.props.value.length > 0) {
                this.setState({isEmpty: false});
            }
            if(this.childIsInputType(child) && child.props.displayName === 'InputFile' && child.value && child.value.name.length > 0) {
                this.setState({isEmpty: false});
            }
        });
    }

    renderChildren = () => {
        const {children} = this.props;
        const numberOfChildren = React.Children.count(children);
        if(numberOfChildren === 0) return null;
        if(numberOfChildren === 1) {
            return this.childIsInputType(children) ?
            <children.type {...children.props} onFocus={this.handleFocus} onBlur={this.handleBlur} onChangeHandler={this.handleChange} /> :
            children;
        }
        return React.Children.map(children, (child) => {
            return this.childIsInputType(child) ?
            <child.type {...child.props} onFocus={this.handleFocus} onBlur={this.handleBlur} onChangeHandler={this.handleChange} /> :
            child;
        });
    }

    childIsInputType = (child) => {
        const componentName = child.props.displayName;
        return (componentName === 'Input' || componentName === 'Select' || componentName === 'InputFile');
    }

    getInputChildFunction = () => {
        const {children} = this.props;
        const numberOfChildren = React.Children.count(children);
        let childFunction = null;

        if(numberOfChildren === 0) return null;
        if(numberOfChildren === 1) {
            return this.childIsInputType(children) ? children.props.onChangeHandler: null;
        } 
        React.Children.forEach(children, (child) => {
            if(this.childIsInputType(child)) childFunction = child.props.onChangeHandler;
        });
        return childFunction;
    }

    render() {
        const {isFocused, isEmpty} = this.state;
        const {error, message, noBorderBottom} = this.props;

        let classes = [
            'form-group',
            isFocused ? ' focused' : '',
            isEmpty ? ' empty' : '',
            noBorderBottom ? ' no-border-bottom' : '',
            error !== undefined && error.length > 0 ? ' has-errors' : '',
        ];

        return (
            <div className={classes.join('')}>
                {this.renderChildren()}
                <p className={"message"}>{ error ? error : message }</p>
            </div>
        );
    }
}

export default FormGroup;