import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 30px;
    width: 100%;
    height: 100vh;
    display: flex;
  align-items: center;
  flex-direction: column;
    
`;
const Text = styled.h2`
    text-align: center;

`
const Text2 = styled.p`
    color: lightgray;

`;
const Button = styled.div`
    background: #8339b0;
    height: 30px;
    padding: 8px 12px;
    border: 0px;
    -webkit-box-shadow: 0 -2px 0 rgba(0,0,0,0.15) inset;
    -moz-box-shadow: 0 -2px 0 rgba(0,0,0,0.15) inset;
    box-shadow: 0 -2px 0 rgba(0,0,0,0.15) inset;
    border-radius: 4px; text-decoration: none;
    display: inline-block;
    text-align: center;
    margin: 30px 50px;
`;

const Alink = styled.a`
    text-decoration: none;
    color: #ffffff;


`;

const Healing = () => {
  return (
    <Container>
        <Text>Crystal Energy Healing is a realignment of energetic frequencies, the removal of emotional blocks, healing and spiritual growth.</Text>
        <Text2></Text2>
        <Text>Learn More and Book your session with Crystalnique Services by clicking the button below</Text>

        <Button> <Alink href="https://app.acuityscheduling.com/schedule.php?owner=21455368"
                    target="_blank" 
                    rel="noreferrer">Schedule Appointment</Alink>
                    <link rel="stylesheet"
                    href="https://embed.acuityscheduling.com/embed/button/21455368.css" 
                    id="acuity-button-styles" />
                    </Button>
    </Container>
  )
}

export default Healing;