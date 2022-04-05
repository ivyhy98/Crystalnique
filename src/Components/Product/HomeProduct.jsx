import React, { useEffect } from 'react'
import styled from 'styled-components';
import SingleProduct from './SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';
import LoadingScreen from '../LoadingScreen';
import { Message } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const Container = styled.div`

`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h2`
    color: #6e287c;
`;
const ProductContainer = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;
const HomeProduct = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts({limit: 8}));
    },[dispatch])

  return (
    <Container>
        <TitleContainer>
            <Title>Shop By Product</Title>
        </TitleContainer>
        {loading ? (<CircularProgress />)
        : error ? ( <Message variant="danger">{error}</Message>):
        (<ProductContainer>
            {products.slice(0, 8).map((product) =>(
                <SingleProduct product={product} loading={loading} error={error} key={product.id} />
            ))}
        </ProductContainer>)}
    </Container>
  )
}

export default HomeProduct;