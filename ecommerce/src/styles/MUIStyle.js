import { createTheme, styled } from '@mui/material/styles';
import { TextField, Button, Tab, Paper, Typography, Accordion, Radio } from '@mui/material';

//Keeping styles for MUI components here so they can be used for different functions


//Sets textfield to white
export const StyledTextField = styled(TextField)({
    align:'center',
    background:'white',
    margin: 10,  
    width:400,
  
    input:{
      color:"black"
    },
    "& label": {
      color: "black"
    },
    "&:hover label": {
      fontWeight: 700
    },
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "black",
        borderWidth: 2
      },
      "&.Mui-focused fieldset": {
        borderColor: "black"
      }
    }
  });