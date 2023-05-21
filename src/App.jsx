import { useState } from 'react'
import {Box, Typography, Button, TextField} from '@mui/material';
import axios from "axios";
import {useForm} from "react-hook-form";

function App() {
  const [result, setResult] = useState("No parameters were sent.");
  const {register, handleSubmit} = useForm();
  
  const handleRequest = async (data) => {

    axios.post('https://aii82jjpml.execute-api.us-east-1.amazonaws.com/middle-function', data, {headers: {'Content-Type': 'application/json'}} )
      .then(response => {
        setResult(`Prediction: $${response.data.prediction}.`);
      })
      .catch(error => {
          console.log(error);
      });

}

  return (
      <Box sx={{paddingTop: "3%", paddingLeft: "20%", paddingRight: "20%"}}>
        <Box sx={{paddingBottom: "3%"}}>
          <Typography variant="h3" sx={{textAlign: "center"}}>HOUSE PRICE PREDICTOR</Typography>
          <Typography variant="h6" sx={{textAlign: "center"}}>All parameters must be positive integers.</Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleRequest)}>
        <Box sx={{paddingBottom: "4%"}}>
          <TextField
            {...register('bedrooms', {required: 'Data required', valueAsNumber: true })}
            label="Bedrooms"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              step: 1,
              min: 0,
            }}
          />
          <TextField
            {...register('bathrooms', {required: 'Data required', valueAsNumber: true })}
            label="Bathrooms"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              step: 1,
              min: 0,
            }}
          />
          <TextField
            {...register('sqft_living', {required: 'Data required', valueAsNumber: true })}
            label="Square foot living"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              step: 1,
              min: 0,
            }}
          />
          <TextField
            {...register('sqft_above', {required: 'Data required', valueAsNumber: true })}
            label="Square foot above"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              step: 1,
              min: 0,
            }}
          />
        </Box>
        <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button variant="contained" type="submit">Submit parameters</Button>
        </Box>
        </form>
        <Typography variant="h6" sx={{textAlign: "center", paddingTop: "35px"}}>{result}</Typography>
      </Box>
  )
}

export default App
