import React from 'react'
import styled from 'styled-components'
import { Facebook, Instagram } from '@mui/icons-material'
const Container = styled.div `
    margin: 60px;
    justify-content: space-between;
    display: flex;
    bottom: 0;
`

const Center = styled.div `
    flex: 1;
    
`
const Right = styled.div `
    flex: 1;
`
const UlHead = styled.div `
    color: #c266fc;
    font-size: 20px;
    text-decoration: none;
`

const ListItem = styled.li `
list-style-type: none;
font-size: 16px;
text-decoration: none;
padding: 5px;
`
function Footer() {
    return (
        <div>
            <Container> 
                <Center>
                    <UlHead>We Accept</UlHead>
                    <ListItem>Credit Cards</ListItem>
                    <ListItem>Debit Cards</ListItem>
                    <ListItem>Prepaid Cards</ListItem>
                </Center>
                <Right>
                    <UlHead>Follow us</UlHead>
                    <ListItem><a href="https://www.facebook.com/valscrystalnique"><Facebook /></a></ListItem>
                    <ListItem><a href="httpinstagram.com/valscrystalnique"><Instagram /></a></ListItem>
                </Right>
            </Container>
        </div>
    )
}

export default Footer;