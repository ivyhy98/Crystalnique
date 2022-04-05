import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';


const ImageContainer = styled.div`
    width: 100%;
    height: 240px;
    border-style: solid solid outset;
    border-color: #6e287c; 
`;
const TextContainer = styled.div`
    width: 100%;
    height: 60px;
    padding: 5px;
    align-items: center;
    display: block;
    justify-content: center;
    display: block;
    flex: wrap;
    align-items: center;
`;

const Image = styled.img`
    object-fit: fill;
    width: 100%;
    height: 100%;
`;
const Text = styled.h3`
    font-size: 16px;
    color: #6e287e;
    
`;

const Overlay = styled.div`
     transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
`;

const CartButton = styled.button`
    color: #6e387c;
    background-color: white;
    padding: 10px 24px;
    border-radius: 12px;
    transition: 0.4s
`;
const Container = styled.div`
    width: 300px;
    height: 400px;
    display: block;
    margin: 5px;
    &:hover ${Image}{
        opacity: 0.3;
    }
    &:hover ${Overlay}{
        opacity: 1;
    }
    &:hover ${CartButton} {
        color: white;
        background-color: #6e287c;
    }
`;
const Name = styled.p`
    color: gray;
    font-size: 14px;

`;

const SingleProduct = ({product, loading, error}) => {
    const image = product.assets[0].url;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleAddToCart = (lineItem) => {
       dispatch(addToCart(product.id))
    }
  return (
    <Container >
        <ImageContainer onClick={()=> navigate(`/details/${product.permalink}`)}>
            <Image src={image} />
                </ImageContainer>
            <TextContainer>
                <Name>{product.name}</Name>
                <Text>{product.price.formatted_with_symbol}</Text>
                <CartButton onClick={handleAddToCart} >Add to Cart</CartButton>
            </TextContainer>
        </Container>
  )
}


export default SingleProduct;