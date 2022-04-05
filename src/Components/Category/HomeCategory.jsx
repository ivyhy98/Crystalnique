import React from 'react';
import styled from 'styled-components';
import SingleCategory from './SingleCategory';

const Container = styled.div`
    display: flex; 
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;
const Title = styled.h2`
    color: #6e287c;
`;
const CategoryContainer = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const HomeCategory = ({categories}) => {
  return (
    <Container>
        <TitleContainer>
            <Title>Shop By Category</Title>
        </TitleContainer>
        <CategoryContainer>
            {categories.map((cats) => {
                return(
                    <SingleCategory cats={cats} key={cats.id}/>
                )
            })}        
        </CategoryContainer>
    </Container>
  )
}

export default HomeCategory;