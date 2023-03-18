import React, { useEffect } from 'react';
import './styles.scss';
import {
  resetSnackbarState,
  snackbarMessageSelector,
  isSnackbarVisibleSelector,
} from 'store/app/appSlice';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from 'helpers/utils';

const Snackbar = () => {
  const dispatch = useAppDispatch();
  let TIMER: NodeJS.Timeout;

  // select the UI states from the redux store
  const SHOW = useSelector(isSnackbarVisibleSelector);
  const MESSAGE = useSelector(snackbarMessageSelector);

  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(resetSnackbarState());
    }, 2500);
  }

  function handleClose() {
    clearTimeout(TIMER);
    dispatch(resetSnackbarState());
  }

  useEffect(() => {
    if (SHOW) {
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [SHOW, handleTimeout]);

  return (
    <>
      {SHOW && (
        <div className={'snackbar-container'}>
          <p>{capitalizeFirstLetter(MESSAGE)}</p>
          <button className={'close-btn'} onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Snackbar;
