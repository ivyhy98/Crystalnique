import React from "react";
import styled from "styled-components";
import { RemoveTwoTone, Add } from "@mui/icons-material";
import { updateCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
const Container = styled.div`
    display: flex;
    bottom-border: 1px dashed black;
    padding: 1px;
    justify-content: space-between;
    margin-left: 20px;
`;
const First = styled.div`
    display: flex;
    align-items: center;
    top: 0;
`;
const Image = styled.img`
    flex:1;
    height: 150px;
    width: 150px;
    object-fit: contain;
    border: 2px solid black;
    text-align: center;
    @media(max-width: 400px) {
    display: none;
  }
`;

const Text = styled.h2`
    flex:1;
    font-size: 16px;
    margin: 10px;
    color: gray;
    text-align: center;
    vertical-align: baseline;
`;
const Column = styled.div`
    align-items: center;
    display: flex;
    width: 90px;
`;
const IconSpan = styled.span`
    border: 1px solid gray;
    border-top-right-radius: 150px;
    border-bottom-right-radius: 150px;
    height: 30px;
    width: 30px;
    transition: all 0.5s ease-out;
    &:hover {
        border: 2px solid black;
        
    }
    
`;
const IconSpan2 = styled.span`
    border: 1px solid gray;
    border-top-left-radius: 150px;
    border-bottom-left-radius: 150px;
    height: 30px;
    width: 30px;
    transition: all 0.5s ease-out;
    &:hover {
        border: 3px solid black;
        
    }
    
`;
const Qinput = styled.div`
    border: 1px solid gray;
    width: 30px;
    height:30px;
    text-align: center;
    align-items: center;
`;
const CartItem = ({item}) => {
    const dispatch = useDispatch();

    const handleAddItem = () => {
        dispatch(updateCart(item.id, item.quantity + 1))
    }
    const handleRemoveItem = () => {
        dispatch(updateCart(item.id, item.quantity - 1))
    }
  return (
    <Container>
        <First>
            <Image src={item.image.url} />
            <Text>{item.name}</Text>
        </First>
        <Column>
            <Text>{item.price.formatted_with_symbol}</Text>
        </Column>
        <Column>
           <IconSpan2 onClick={handleRemoveItem}><RemoveTwoTone /></IconSpan2>
           <Qinput>{item.quantity}</Qinput>
           <IconSpan onClick={handleAddItem}><Add /></IconSpan>
        </Column>
        <Column>
            <Text>US {item.line_total.formatted_with_symbol}</Text>
        </Column>
    </Container>
  )
}

export default CartItem;