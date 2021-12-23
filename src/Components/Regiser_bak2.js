import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {FormGroup} from '@material-ui/core';
import { useForm,ErrorMessage } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

export default function RegForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input
console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Example</label>
      <input name="example" defaultValue="test" ref={register} />
      <label>ExampleRequired</label>
      <input
        name="exampleRequired"
        ref={
                        register({
                            required : 'First Name Required',
                            maxLength:{
                                value: 50,
                                message : 'First Name must be less than 50 characters',
                            },
                            minLength:{
                                value: 1,
                                message : 'Last Name must be greater than 1 characters',
                            },
                            pattern: {
                                value: /[a-zA-z]/,
                                message: 'First Name must include only letters'
                            }
                        })
                    }
      />
      {errors.exampleRequired && <p>This field is required</p>}

     <ErrorMessage errors={errors} name="exampleRequired">
        {({ message }) => <p>{message}</p>}
      </ErrorMessage>



<Snackbar 
        open={true}
        autoHideDuration={3000} 

    >
        <Alert severity="error">
            <div style={{ 
                display: 'flex', 
                flexFlow: 'column', 
                alignItems: 'center' 
            }}>
                    <ErrorMessage errors={errors} name="exampleRequired">
        {({ message }) => <p>{message}</p>}
      </ErrorMessage>
            </div>
         </Alert>
    </Snackbar>


      <input type="submit" />
    </form>
  );
}
