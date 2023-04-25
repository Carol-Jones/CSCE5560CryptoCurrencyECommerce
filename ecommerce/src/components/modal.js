import React from 'react';
import ReactDom from 'react-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../context/AuthContext"


//Puts component in center
const MODAL_STYLES = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(30, 30, 30, .80)',
  padding: '75px',
  zIndex: 1000,
}

//Makes everything that can't be clicked grey
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0)'
}

//Puts the X in the corner
const CLOSE_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'white',
}


export default function Modal({ open, children, onClose }) {
  const {currentUser} = useAuth();

  if (!open) return null
  else if(currentUser){
    onClose();
  }

  return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
            
            <IconButton aria-label="close" style={CLOSE_STYLE} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            
            {children}
            </div>
        </>,
        document.getElementById('portal')
  )
}