import React from 'react';
import ReactDom from 'react-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../context/AuthContext"


//Puts component in center
const MODAL_STYLES = {
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(250, 250, 250, 1)',
  padding: '50px',
  borderRadius:'25px',
  borderColor:'black',
  border:'.5px solid',
  background: 'linear-gradient(145deg, rgba(219,209,219,.99),rgba(219,209,219,1),rgba(255,255,255,1),rgba(255,255,255,1), rgba(255,255,255,.99))',
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
    top: 5,
    left: 5,
    color: 'black',
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
            <div style={MODAL_STYLES} id ="Modal">
            
            <IconButton aria-label="close" style={CLOSE_STYLE} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            
            {children}
            </div>
        </>,
        document.getElementById('portal')
  )
}