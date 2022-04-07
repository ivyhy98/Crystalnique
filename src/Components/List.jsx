import React from 'react'
import SingleProduct from './Product/SingleProduct'
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const ProductContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex: 3;
`;


const emptyList = () => {
  return <p>No products Found</p>
}

const List = ({list, loading, error}) => {

  if(loading || !list) {return  (<ProductContainer><CircularProgress /></ProductContainer>);}
  return (
    <ProductContainer>
      {list.map((items) =>(
          <SingleProduct product={items} loading={loading} error={error} key={items.id} />
        ))}   
    </ProductContainer>
  )
}

export default List