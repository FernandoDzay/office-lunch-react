import React from 'react';
import FullScreenShadow from '../FullScreenShadow/FullScreenShadow';
import NextStep from './NextStep';

import './modal.scss';


class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            animationClass: "modalShow",
            nextStep: null
        };
        this.animationRef = React.createRef();
    }

    
    componentDidUpdate(prevProps) {
        const {nextStep, active} = this.props;

        if( active !== prevProps.active && !active ) {
            this.setState({animationClass: "modalHide"});
        }
        else if(active !== prevProps.active  && active) {
            this.setState({active: true, animationClass: "modalShow"});
        }
        if( nextStep !== prevProps.nextStep ) {
            if(nextStep !== null) this.setState({nextStep: nextStep, animationClass: 'modalShow'});
        }
    }

    handleAnimationEnd = () => !this.props.active ? this.setState({active: false, nextStep: null}) : this.setState({animationClass: ""});

    render() {

        const {handleCloseModal, nextStepTitle, nextStepDescription, children, withExit } = this.props;
        const {animationClass, nextStep} = this.state;

        if(this.state.active) {
            return (
                <>
                    <div className={`modal ${animationClass}`} onAnimationEnd={ this.handleAnimationEnd } ref={this.animationRef} >
                        { nextStep === null && 
                            <>
                                {withExit && <div className='exit' onClick={handleCloseModal}><i className={`zmdi zmdi-close`}></i></div>}
                                {children}
                            </>
                        }
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

export default Modal;