import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { listCategory } from '../redux/actions/productActions';
import List from '../Components/List';

const Container = styled.div`
  display: flex;
`;
const FilterContainer = styled.div`
  flex: 1;
  align-items: center;
  text-align: center;
`;
const ProductContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex: 3;
`;

const DropdownDiv = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownUl = styled.span`
  font-weight: 700;
  margin: 15px;

  &:hover {
    cursor: pointer;
  }
`;
const DropdownLi = styled.div`
color: #6e287c;
  min-width: 160px;
  margin: 5px;
`;
const TitleContainer = styled.div`
  height: 30%;
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 4px solid #6e287c;
  
`;
const Title = styled.h1`
  text-align: left;
  margin: 0px 20px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {slug: categorySlug} = params;
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, list } = categoryList;
  const [sortBy, setSortBy] = useState('name');
  const [sortD, setSortD] = useState('asc');
  useEffect(() =>{
    dispatch(listCategory(categorySlug, sortBy, sortD));
  }, [dispatch, categorySlug, sortBy, sortD]);
  
  return (
    <div>
    <TitleContainer>
      <Title>{categorySlug.toUpperCase()}</Title>
    </TitleContainer>
    <Container>
      <FilterContainer>
          <DropdownDiv>
            <DropdownUl>Filter By:
              <DropdownLi onClick={() => {setSortBy('created_at', setSortD('asc'))}}>Newest</DropdownLi>
              <DropdownLi onClick={() => {setSortBy('created_at', setSortD('desc'))}}>Oldest</DropdownLi>
              <DropdownLi onClick={() => {setSortBy('price', setSortD('asc'))}}>Price: Low</DropdownLi>
              <DropdownLi onClick={() => {setSortBy('price', setSortD('desc'))}}>Price: High</DropdownLi>
              <DropdownLi onClick={() => {setSortBy('name', setSortD('asc'))}}>Name</DropdownLi>
            </DropdownUl>
          </DropdownDiv>
      </FilterContainer>
      <ProductContainer>
        <List list={list} loads={loading} error={error}/>
    </ProductContainer>
    </Container>
  </div>
  )
}

export default ProductList;