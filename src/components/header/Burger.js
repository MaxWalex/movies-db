import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileMenu } from '../../reduxSlice/main';
import { useHref } from 'react-router-dom';
import { useEffect } from 'react';

function Burger() {
    const dispatch = useDispatch()
    const href = useHref()
    const { showMobileMenu } = useSelector(state => state.main)

    const handleBurger = () => {
        dispatch(toggleMobileMenu(showMobileMenu))
    }

    useEffect(() => {
        dispatch(toggleMobileMenu(true))
    }, [href])

  return (
    <div className={`burger ${showMobileMenu ? 'active' : ''}`} onClick={() => handleBurger()}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export default Burger