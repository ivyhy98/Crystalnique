import React, { useState } from 'react'
import styled from 'styled-components'
import { Close } from '@mui/icons-material';

const Container = styled.div `
    position: relative;
    background: #6e287c;
    width: 100%;
    height: 30px;
    justify-content: center;
    font-size: 22px;
    color: white;
    display: flex;
    font-weight: 700;
    align-items: center;
    
    @media (max-width: 768px) {
        height:100vh;
        font-size: 10px;
        width: 100vw;
        display: none;
        
    }
`;
const Icon = styled.div `
  display: flex;
  justify-content: flex-end;
  background-color: #6e287c;;
 
`
function Announcement() {
  const [announce, setAnnounce] = useState(true)
    return (

        <div style={{
          display: announce ? 'flex' : 'none'
        }}>
          <Icon>
            <Close onClick={()=> setAnnounce((announce) => !announce)} />
          </Icon>
          <Container  >
          'Thank you for shopping with Vals Crystalnique'
          </Container>  
        </div>
    )
}

export default Announcement;