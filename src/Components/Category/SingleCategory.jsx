import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Overlay = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #6e287c;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
`;

const Container = styled.div`
    width: 300px;
    height: 300px;
    position: relative;
    border: 1px solid #6e287c;
    margin: 5px;
    &:hover {
        opacity: 75%
    }
    &:hover ${Overlay} {
    bottom: 0;
    height: 100%;
    opacity: 0.5
    }

`;
const Image = styled.img`
  display: block;
  width: 100%;
  height: 80%;
`;


const Text = styled.div`
  white-space: nowrap; 
  color: white;
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const TextsC = styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
  color: #6e287c;
  font-size: 18px;
  padding: 15px;
  text-align: center;
`;
const SingleCategory = ({cats}) => {
  const image = cats.assets[0].url
  return (
    <Container>
      <Link to={`lists/${cats.slug}`} style={{textDecoration: 'none'}}></Link>
      <Image src={image} />
      <Overlay>
        <Text>{cats.name}</Text>
        <Text>{cats.desc}</Text>
      </Overlay>
      <TextsC>Shop {cats.name}</TextsC>
    </Container>
  )
}

export default SingleCategory;