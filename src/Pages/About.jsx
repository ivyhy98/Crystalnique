import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;
const LeftContainer = styled.div`
  display: flex;
  height: ;
  width: 50%;
  align-self: flex-end;
  flex-grow: 2;
`;
const Image = styled.img`
  height: 75%;
  width: 100%;
  object-fit: fill;
  border: 3px solid black;
  
`;
const Text = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 50px;
`;
const RightContainer = styled.div`
  height: 20vh;
  width: 100%;
`;
const TitleContainer = styled.div`
display: flex;
justify-content: center;
`;
const Title = styled.h1`
  color: #6e287c;
  font-weight: bold;
  align-self: flex-start;
  opacity: 0.5;
  font-family: Apple Chancery;
  font-style: italic;
  font-size: 30px;
`;
const Title2 = styled.h1`
  align-self: flex-end;
  color: #6e287c;
  font-size: 32px;
`;
const Abouts = styled.div`
  display: flex;
`;
const HTitle = styled.h1`
  align-items: center;
  text-align: center;
  font-size: 28px;
  color: -webkit-linear-gradient(#c266fc, black); 
`;
const About = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>I am </Title>
        <Title2>Crystalnique</Title2>
      </TitleContainer>
      <Abouts>
        <LeftContainer>
          <Image src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Bpcml0dWFsfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
        </LeftContainer>
        <RightContainer>
        <HTitle>Our Story</HTitle>
          <Text>Join CrystalNique group "Crystals, Mind, Body, and Soul" for open discussion on crystals, what they can be used for and how to use them!</Text>
        </RightContainer>
      </Abouts>
    </Container>
  )
}

export default About;