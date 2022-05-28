import './switch.scss';
import { useEffect, useRef } from 'react';


const Switch = ({onClick, active}) => {
    const ref = useRef();

    useEffect(() => {
        ref.current.className = active ? 'switch active' : 'switch';
    }, [active])

    const handleClick = e => {
        const active = ref.current.className === 'switch';
        ref.current.className = active ? 'switch active' : 'switch';

        onClick(e, active);
    }

    return (
        <div ref={ref} className="switch" onClick={handleClick}></div>
    );
}
export default Switch;