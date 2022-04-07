import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCheckoutToken } from '../../redux/actions/checkoutActions';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Button } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import styled from 'styled-components';

const Main = styled.main`
    margin: 20px;
    padding: 20px;
`;

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ order, onCaptureCheckout, error}) => {
    //set variables
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const location = useLocation();
    const cart = location.state.cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkoutToken = useSelector((state) => state.checkoutToken);
    const { checkout } = checkoutToken;

    //Step counters
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    useEffect(() => {
      try{
        dispatch(getCheckoutToken(cart))
      }catch(error) {
        console.log('Cant get checkout', error)
        navigate("/")
        
      }
    }, [dispatch, cart, navigate])

    const test = (data) => {
        setShippingData(data);

        nextStep();
    }
    let Confirmation = () => (order.customer_reference ? (
      <>
        <div>
          <h5>Thank you for your purchase,{order.customer.firstname}!</h5>
          <p>Order ref: {order.customer_reference}</p>
        </div>
        <br />
            
        <button type="button" to="/"><Link to="/"> Back to home</Link></button>
      </>
    ) : (
      <div >
        <CircularProgress />
      </div>
    ));
  
    if (error) {
      Confirmation = () => (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      );
    }

    const Form = () => (activeStep === 0
        ? <AddressForm checkout={checkout} nextStep={nextStep} setShippingData test={test} /> 
        : <PaymentForm checkout={checkout} nextStep={nextStep} backStep={backStep}  shippingData={shippingData} onCaptureCheckout={onCaptureCheckout}  />
        )
  return (
    <>
      <CssBaseline />
    <div  />
    <Main >
      <Paper >
        <Typography variant="h4" align="center">Checkout</Typography>
        <Stepper activeStep={activeStep} >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
      </Paper>
    </Main>
  </>
  )
}

export default Checkout