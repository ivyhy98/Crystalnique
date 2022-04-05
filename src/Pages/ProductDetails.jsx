import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { detailsProduct } from '../redux/actions/productActions';
import { commerce } from '../lib/commerce';
import { CircularProgress, Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  margin: 10px;
`;
const InfoContainer = styled.div`
    flex: 1;
    margin: 30px;
`;

const ImagesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 2;
`;
const SmImage = styled.img`
  display: flex;
  flex-direction: column;
  margin: 2px;
  width: 10%;
  height:10%;
  transition: all .2s ease-in-out; 
  left: 0;
  border: 2px solid black;
  $:hover {
    transform: scale(1.1);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const LgIMage = styled.img`
  width: 65%;
  height: 60%;
  object-fit: contain;

`;
const TitleName = styled.h1`
  color: #6e287c;
  font-size: 28px;
`;
const Inventory = styled.h3`
  color: gray;
  font-size: 14px;
`;
const Price = styled.h3`
  color: black;
  font-size: 32px;
`;
const CartButton = styled.button`
  color: white;
  width: 50%;
  height: 60px;
  background-color: #6e287c
`;


const ProductDetails = () => {
  const dispatch = useDispatch();  
  const params = useParams();
  const {permalink: productPerm} = params;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  const [cart, setCart] = useState([])
  useEffect(() =>{
    dispatch(detailsProduct(productPerm));
  }, [dispatch, productPerm]);

  const handleAddToCart = () => {
    setCart(commerce.cart.add(product.id));
  }

  if(loading) {return  <CircularProgress />;}
    return (
      <div>
        <Container>
          <ImagesContainer>
            <SmImage src={product.image.url}/>
            <LgIMage src = {product.image.url}/>
          </ImagesContainer>
          <InfoContainer>
            <TitleName>{product.name}</TitleName>
            <Inventory>Inventory: {product.inventory.available}</Inventory>
            <Price>Price: {product.price.formatted_with_symbol}</Price>
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
            <CartButton onClick={handleAddToCart}>Add to Cart</CartButton>
          </InfoContainer>
    </Container>
  </div>
  )
}

export default ProductDetails;