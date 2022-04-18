import Button from '../Button/Button';

const NextStep = ({nextStep, title, description, onClick}) => {

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
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            <Button color="blue" icon="check" onClick={onClick}>OK</Button>
        </div>
    );

}

export default NextStep;