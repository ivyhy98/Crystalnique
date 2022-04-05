import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, getCart } from '../redux/actions/cartActions';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import{ ShoppingCartOutlined} from '@mui/icons-material';
import CartItem from '../Components/CartItem';

const Container = styled.div `
width: 100%;
height: 100%;
margin-bottom: 60px;
margin-top: 120px;
@media(max-width: 1000px) {
        margin-top: 50px;
        overflow-x: hidden;
        margin-left: 0px;
    }
`
const Title = styled.div `
font-size: 40px;
align-items: center;
justify-content: center;
color: #6e287c;
display: flex;
font-family: Cormorant Unicase;
border-bottom: 5px solid #64287c;
@media(max-width: 600px) {
    border: none;
  }
`;
const InfoTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 50px;
  @media(max-width: 400px) {
    display: none;
  }

`;
const InfoText1 = styled.h2`
  font-weight: 700;
  flex: 2;
`;
const InfoText = styled.h2`
  font-weight: 700;
  flex: 1;
`;
const Empty = styled.div `
  text-decoration: none;
  align-items: center;
  position: absolute;
  font-size: 16px;
  justify-content: center!important;
  display: flex;
  flex: 1;
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  
  `
const Div = styled.div `
  justify-content: center;
  align-items: center;
  margin: 50px;
  display: flex;
  flex: 1;
  width: 75%;
  padding: 50px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media(max-width: 800px){
  flex-direction: column}
`;
const CheckoutButton = styled.button`
  background-color: #63287c;
  color: white;
  textDecoration: none;
  width: 50%;
  height: 10%;
  font-size: 1em;
  border-top-right-radius: 150px;
  border-bottom-right-radius: 150px;
  
`;
const Info = styled.div`
  flex: 2;
  @media(max-width: 800px) {
    flex-direction: column
  }
`;

const Summary = styled.div`
  flex: 1;
  border-left: 0.5px solid lightgray;
  align-items: center;
  justify-content: center;
  @media(max-width: 800px) {
    flexDirection: "column"
  }
  
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  background-color: #6e287c;
  color: white;
  border: 1px solid black;
  border-top-right-radius: 150px;
  border-bottom-right-radius: 150px;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  @media(max-width: 600px) {
    marginBottom: "20px"
  }
`;
const EmptyButton = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 50px;
  border: 150px;
  
`;
const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.getCart);
  const { cart } = carts;
  const navigate = useNavigate();
   useEffect(() =>{
    dispatch(getCart());
  }, [dispatch]);

    const handleEmptyCart = () => {
      dispatch(emptyCart());
    }
    const renderEmptyCart = () => (
      <>
      <Empty>
        <Div>
        <ShoppingCartOutlined fontSize='large' />
          You have no items in your shopping cart,
            <Link to="/"> start adding some</Link>!
        </Div>
      </Empty>
      </>
    );

    if (!cart.line_items) return 'Loading';

    const renderCart = () => (
      <>
      
          <Bottom>
          <Info>
          <InfoTitle>
            <InfoText1>Item</InfoText1>
            <InfoText>Price</InfoText>
            <InfoText>QTY</InfoText>
            <InfoText>Total</InfoText>
          </InfoTitle>
          {cart.line_items.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
          <EmptyButton onClick={handleEmptyCart}>Empty Cart</EmptyButton>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>{cart.subtotal.formatted_with_symbol}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Taxes and shipping calculated at checkout</SummaryItemText>
            </SummaryItem>
            <CheckoutButton onClick={() => navigate("/checkout", { state: { cart: cart }})}> CHECKOUT NOW</CheckoutButton>
          </Summary>
          </Bottom>
      </>
    );

  return (
    <>

    <Container>
      <Title>Your Shopping Cart</Title>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
    
    </>
  );

};

export default Cart;