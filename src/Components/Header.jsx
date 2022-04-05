import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Badge,MenuItem, Menu, Button } from '@mui/material';
import{MenuOutlined, ShoppingCartOutlined} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../redux/actions/cartActions';
import { listProducts } from '../redux/actions/productActions';
import Searches from './Searches';

const Container = styled.div `
    width: 100%;
    height: 110px;
    text-decoration: none;
    font-family: Lato;
`;

const Wrapper = styled.div `
    justify-content: space-around;
    display: flex;
    align-items: center;
    height: 50px;
    background-color: white;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    
`;
const Left = styled.div `
    display: flex;
    align-items: center;
    margin-left: 24px;
    @media (max-width: 768px) {
        top:0;
    }
`;
const Center = styled.div `

    @media (max-width: 768px) {
        float: center;
        justify-content: center;
        align-items: center;
        padding-left: 150px;
    }
`;
const Right =styled.div `
    display: flex;
    justify-content: space-around;
    margin-right: 24px;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-around;
        align-items: center;
        
    }
`;

const Title = styled.h1 `
    font-weight: bold;
    flex: 1;
    color: #6e287c;  
    @media (max-width: 768px) {
        font-size: 20px;
    } 
`;

const Words = styled.div `
    padding: 10px;
    margin: 0px 20px 0px 20px;
    font-weight: bold;
    transition: all .2s ease-in-out; 
    &:hover {
        transform: scale(1.1)
    }
    p {
        @media (max-width: 400px) {
            display: none;
        }
    }

`;
const WordsButton = styled.div `
    padding: 10px;
    margin: 0px 20px 0px 20px;
    font-weight: bold;
    transition: all .2s ease-in-out; 
    &:hover {
        transform: scale(1.1)
    }
    display: none;
        @media (max-width: 800px) {
            display: flex;
        }

`;
const MenuWrapper = styled.div ` 
    align-items: center;
    height: 50px;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    color: white;
    background: #6e287c;
    text-decoration: none;
    @media(max-width: 800px) {
        display: none;
    }
`

const Cats = styled.li `
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: all .2s ease-in-out; 
  color: white;
  &:hover {
        transform: scale(1.1)
    }
  @media(max-width: 800px) {
    display: none;
  }
`;



const TopWords = styled.h2 `
font-size: 16px;
text-decoration: none!important;
color: #6e287c;
margin-top: 10px;
`

const Hello = styled.h2`

`;



const Header = ({categories}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.getCart);

    const {cart, error} = carts;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    }; 
    
    
        
    useEffect(() =>{
        dispatch( getCart() );
        dispatch(listProducts({limit: 50}));
      }, [dispatch]);

    if(error) {return error.message}
    
    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Link style={{'textDecoration':'none'}} to={'/'}> <Title>Crystalnique</Title></Link>
                    </Left>
                    <Center></Center>
                    <Right>
                        <Words>
                            <Link style={{'textDecoration':'none'}}to={'/about'}>
                                <TopWords></TopWords>
                            </Link>
                        </Words>
                        <Words>
                            <Badge badgeContent={cart.total_items} color="secondary">
                                <Link style={{'textDecoration':'none'}} to={'/cart'}><ShoppingCartOutlined fontSize='medium' color='#6e287c;' /> </Link>
                            </Badge>
                        </Words>
                        <WordsButton>
                            <Badge color="secondary">
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                style={{'backgroundColor':'#6e287c', 'color':'#6e287c'}}
                                endIcon={<MenuOutlined />}
                            >   
                            </Button>
                            <Menu
                                id="demo-customized-menu"
                                MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >{categories.map((category) =>
                                <MenuItem onClick={handleClose} key={category.id} disableRipple>
                                    <Hello onClick={() => navigate(`/lists/${category.slug}`)}>{category.name}</Hello>
                                </MenuItem>
                            )}
                                <MenuItem onClick={handleClose} disableRipple>
                                    <Hello onClick={() => navigate(`/healing`)}>Crystal Healing</Hello>
                                </MenuItem>
                            </Menu>
                            </Badge>
                        </WordsButton>
                        <Searches />
                    </Right>
                </Wrapper>           
                <MenuWrapper>
                    {categories.map((category) =>
                            <Cats key={category.id} onClick={() => navigate(`/lists/${category.slug}`)} disableRipple>
                                {category.name}
                            </Cats>
                            )} 
                            <Cats onClick={() => navigate(`/healing`)} disableRipple>
                                Crystal Healing
                            </Cats>
                </MenuWrapper>  
            </Container>
        </div>
    )
}

export default Header;