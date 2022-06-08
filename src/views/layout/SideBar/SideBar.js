import Mid from './Mid';
import Bot from './Bot';
import "../../../styles/layout/side-bar.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { toggleSideBar, setFullScreenShadowActive } from '../../../store/slices/layoutSlice';
import FullScreenShadow from '../../../components/globals/FullScreenShadow/FullScreenShadow';
import usePrevious from '../../../hooks/usePrevious';


const SideBar = () => {
    const active = useSelector(state => state.layout.activeSideBar);
    const { isFullScreenShadowActive } = useSelector(state => state.layout);
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const prevWindowWidth = usePrevious(windowWidth);

    const windowEvent = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        if((windowWidth !== prevWindowWidth) && (windowWidth < 850 && active)) {
            dispatch(toggleSideBar());
        }
    }, [windowWidth, active, prevWindowWidth, dispatch]);

    useEffect(() => {
        window.addEventListener('resize', windowEvent);
        return () => window.removeEventListener('resize', windowEvent);
    }, [windowEvent]);

    useEffect(() => {
        dispatch(setFullScreenShadowActive(active && (window.innerWidth < 800)));
    }, [active, dispatch]);

    const handleCloseSideBarClick = () => {
        if(active) dispatch(toggleSideBar());
    }
    
    
    return (
        <>
            <div className={`side-bar${active ? ' active' : ''}`}>
                <div className="content">
                    <div className="top" onClick={handleCloseSideBarClick}>
                        <h1>COMPANY</h1>
                        <i className='zmdi zmdi-arrow-left'></i>
                    </div>
                    <Mid />
                    <Bot />
                </div>
            </div>

            <div className={`padding-right${active ? ' active' : ''}`}></div>
            <FullScreenShadow active={isFullScreenShadowActive} onClick={handleCloseSideBarClick} />
        </>
    );
}


export default SideBar;