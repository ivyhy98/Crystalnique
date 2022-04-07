import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Client, Environment } from 'square';
import { useForm } from 'react-hook-form';
import {commerce} from '../../lib/commerce';
import { useNavigate } from 'react-router-dom';

import {payments} from 'https://sandbox.web.squarecdn.com/v1/square.js'


const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
})
const paymentsApi = client.paymentsApi;

const Container = styled.div`
    background-color: #6e287c;
    height: 100vh;
`
const DivContainer = styled.div`
    margin: 20px;
    background-color: white;
    position: relative;
`;
const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 10px;
    background-color: lightgray;
    border-radius: 15px;
    height: 70vh;
`;
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute; 
    bottom: 0;
`;


const BillingContainer = styled.div`
    margin: 5px;
`;

const MenuItem = styled.option`

`;
const CardButton = styled.button`
    background-color: #6e287c;;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 50px;
    border: 150px;
    
`;

const Title = styled.h2`
     color: white;
     text-align: center;
`;

const Select = styled.select`
    border: 1px solid #c266fc;
    height: 40px;
    border-radius: 15px;
`;
const Input = styled.input`
    border: 1px solid #c266fc;
    margin: 5px;
    border-radius: 15px;
    height: 40px;

`;
const Div = styled.div`
    line-height: 1;
`;
const Label = styled.h4`
    font-size: 12px;
    color: #6e287c;
    padding: 0;
    margin: 0;
`;
const PaymentForm = ({checkout, nextStep, backStep, shippingData, onCaptureCheckout}) => {
  console.log('Shipping Sub Division', shippingData.shippingSubdivision)

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const locationId = process.env.REACT_APP_SQUARE_LOCATION_ID;
  const appId = process.env.REACT_APP_SQUARE_PUBLIC_KEY;
  const [isLoad, setLoad] = useState(false)
  const [cardToken, setCardToken] = useState({});

  useEffect(() => {
    
  }, [])

    
  //Initialize a card field
  const payments = window.Square.payments(appId, locationId);
  const initializeCard = async() => {
      const card = await payments.card();
      await card.attach('#card-container');
      setCardToken(card);
      console.log('Hello')
      return card;
  }

  useEffect(() => {
    initializeCard();
  }, []) 


  
  const billingDetails = () => {
    // Format and pass in the billing key values for the verification details
        return {
          addressLines: [shippingData.address1, shippingData.address2],
          givenName: shippingData.firstName,
          familyName: shippingData.lastName,
          email: shippingData.email,
          country: shippingData.shippingCountry,
          region: shippingData.shippingSubdivision,
          city: shippingData.city,
        }
      }
    
  
      //verifyBuyer with Square
  const verifyBuyerDetails = async(token) => {

    const verificationDetails = {
      amount: checkout.live.total_with_tax.formatted,
      currencyCode: 'USD',
      intent: 'CHARGE',
      billingContact: billingDetails(),
      };
    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails
    );
    console.log('verifying Details')
    return verificationResults.token;
    }

  //handle Card submission in Square and Order Capture with Commercejs
  const pay = async() => {
    const paymentMethodResponse = await cardToken.tokenize();
    let token;
    if(paymentMethodResponse.status === 'OK') {
      token = paymentMethodResponse.token
      console.log('Token Made')
    } else {
      const errorBody = await paymentMethodResponse.text();
      console.log('Token Error')
      throw new Error(errorBody);
    }
    CardButton.disabled = true;

    const verificationToken = await verifyBuyerDetails(token);
      
    try {
      const newOrder = await commerce.checkout.capture(checkout.id, {
        line_items: checkout.line_items,
        customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
        shipping: {name: shippingData.firstName, street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zipcode: shippingData.zip, country: shippingData.shippingCountry,},
        fulfillment:{shipping_method: shippingData.shippingOption['id']},
        payment: {
          gateway: 'square',
          square: {
            token: token,
            verification_token: verificationToken,
          }
        }
      })
      console.log('Order was successfully captured', newOrder);
    
    }catch(error){
      CardButton.disabled = false;
      console.log(error.message);
      console.log("You're a failure")
      navigate('/')
      alert('Order failed')

    }
    nextStep();
  }

  
  
return (
  <>
    <Container>
      <Title>Payment Details</Title>
        <DivContainer>
          <Form onSubmit={()=>pay()}>
          <ButtonDiv>
              <Div id="card-container"></Div>
              <div id="payment-status-container"></div>
              <CardButton id="card-button" type="button" onClick={() => pay()}>Pay {checkout.live.total_with_tax.formatted}</CardButton>
          </ButtonDiv>
        </Form>
        </DivContainer>
      <ButtonDiv>
      </ButtonDiv>
    </Container>
      
  </>
  )
}

export default PaymentForm;