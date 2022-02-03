import {Component} from 'react';
import FullScreenShadow from '../FullScreenShadow/FullScreenShadow';
import Button from '../Button/Button';

import './modal.scss';


class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            animationClass: "modalShow"
        }
    }

    
    componentDidUpdate(prevProps) {
        if( this.props.active !== prevProps.active && !this.props.active ) {
            this.setState({animationClass: "modalHide"});
        }
        else if(this.props.active !== prevProps.active  && this.props.active) {
            this.setState({active: true})
            this.setState({animationClass: "modalShow"});
        }
    }

    handleAnimationEnd = () => !this.props.active ? this.setState({active: false}) : null;

    render() {

        const {handleCloseModal, nextStep, nextStepTitle, nextStepDescription } = this.props;
        const {animationClass} = this.state;

        if(this.state.active) {
            return (
                <>
                    <div className={`modal ${animationClass}`} onAnimationEnd={ this.handleAnimationEnd } >
                        {this.props.children}
                        <NextStep 
                            nextStep={nextStep}
                            title={nextStepTitle}
                            description={nextStepDescription}
                            onClick={handleCloseModal}
                            />
                    </div>
                    <FullScreenShadow active={this.state.active} onClick={handleCloseModal} />
                </>
            ); 
        }
        else return null;
    }
}

const NextStep = ({nextStep, nextStepTitle, nextStepDescription, onClick}) => {

    if(nextStep !== 'success' && nextStep !== 'fail') return null;

    return (
        <div className="next-step">
            <div className={"top " + nextStep}>
                {
                    nextStep === 'success' ?
                    <>
                        <span className="short"></span>
                        <span className="long"></span>
                        <div className='circle'></div>
                        <span className="fix"></span>
                    </>
                    :
                    <>
                        <div className="lines-container">
                            <span className="left-line"></span>
                            <span className="right-line"></span>
                        </div>
                    </>
                }
            </div>
            <p className="title">{nextStepTitle}</p>
            <p className="description">{nextStepDescription}</p>
            <Button color="blue" icon="check" text="OK" onClick={onClick} />
        </div>
    );
}


export default Modal;