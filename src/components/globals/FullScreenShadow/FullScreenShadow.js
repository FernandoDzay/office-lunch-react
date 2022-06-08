import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FullScreenShadow.scss";


const FullScreenShadow = ({active, onClick}) => {
    const [styles, setStyles] = useState({display: 'none'});
    const className = active ? " active" : "";
    const handleAnimationEnd = () => !active ? setStyles({display: 'none'}) : null;
    const { isFullScreenShadowActive } = useSelector(state => state.layout);


    useEffect(() => {
        if(active) setStyles({display: "block"});
    }, [active]);

    useEffect(() => {
        if(active) document.querySelector('body').style = 'overflow: hidden;';
        else { if(!isFullScreenShadowActive) document.querySelector('body').removeAttribute('style'); }
        return () => { if(!isFullScreenShadowActive) document.querySelector('body').removeAttribute('style'); }
    }, [active, isFullScreenShadowActive]);


    return (
        <div onAnimationEnd={handleAnimationEnd}
            className={"full-screen-shadow" + className}
            style={styles}
            onClick={onClick} >
        </div>
    );
}


export default FullScreenShadow;