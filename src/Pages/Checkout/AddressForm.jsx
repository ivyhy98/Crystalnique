import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Container = styled.div`
    background-color: #6e287c;
    height: 100vh;
`
const DivContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 10px;
    background-color: lightgray;
    height: 80vh;
    width: 100%;
`;
const Form = styled.form`
    margin: 20px;
    background-color: white;
    
    
`;
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #6e287c;
`;

const Input = styled.input`
    border: 1px solid #c266fc;
    margin: 5px;
    border-radius: 15px;
    height: 40px;

`;
const Div = styled.div`
    line-height: 1;
`;
const Label = styled.h4`
    font-size: 12px;
    color: #6e287c;
    padding: 0;
    margin: 0;
`;

const MenuItem = styled.option`

`;
const CartButton = styled.button`
    background-color: #6e287c;
    text-align: center;
    padding: 15px 32px;
    margin: 5px;
    color: white;
`;
const Select = styled.select`
    border: 1px solid #c266fc;
    height: 40px;
    border-radius: 15px;
`;
const Title = styled.h2`
     color: white;
     text-align: center;
`;

const AddressForm = ({checkout, test}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const { register, handleSubmit } = useForm();
    const fetchShippingCountries = async(tokenId) => {
        const { countries } = await commerce.services.localeListCountries(tokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };
    const fetchSubdivisions = async(countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
    const fetchShippingOptions = async(tokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(tokenId, {country: country, region: stateProvince})
        setShippingOptions(options);
        setShippingOption(options[0])
    }

    useEffect(() => {
        if(checkout) {fetchShippingCountries(checkout.id)}else{console.log('no checkout')};
    }, [checkout]);
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
        
    }, [shippingCountry]);
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkout.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision, checkout, shippingCountry]);


  return (
    <Container>
        <Title>Shipping Address</Title>
        <Form onSubmit={handleSubmit((data) => test({...data, shippingCountry, shippingSubdivision, shippingOption }))}>
        <DivContainer>

            <Div>
                <Label>First Name:</Label>
                <Input {...register("firstName", { required: true, maxLength: 20 })} label="First Name" placeholder='First Name' />
            </Div>
            <Div>
                <Label>Last Name:</Label>
                <Input {...register("lastName", { required: true, })} label="Last Name" placeholder='Last Name'/>
            </Div>
            <Div>
                <Label>Email: </Label>
                <Input {...register("email", { required: true, })} label="Email" placeholder='Email'/>
            </Div>
            <Div>
                <Label>Address: </Label>
                <Input {...register("address1", { required: true, maxLength: 20 })} label="Address 1" placeholder='Address 1'/>
                <Input {...register("address2", { required: false, maxLength: 20 })} label="Address 2" placeholder='Address 2'/>
            </Div>
            <Div>
                <Label>City: </Label>
                <Input {...register("city", { required: true, maxLength: 20 })} label="City" placeholder='City'/>
            </Div>
            <Div>
                <Label>Zip/Postal Code: </Label>
                <Input {...register("zip", { required: true, maxLength: 20 })} label="Zip/Postal Code" placeholder='ZIP/PostalCode' />
            </Div>
            <Div>
                <Label>Shipping Country</Label>
                <Select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                    {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </Div>
            <Div>
                <Label>Shipping Subdivisions: </Label>
                <Select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                
                    {Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.label}
                        </MenuItem>
                    ))}
                
                </Select>
            </Div>
            <Div>
                <Label>Shipping Methods: </Label>
                <Select value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                { !shippingOption ? <MenuItem>No Shipping Methods Found</MenuItem> :
                    shippingOptions.map((s0) => ({id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})`})).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.label}
                        </MenuItem>
                    ))
                }
                </Select>     
            </Div>
        <Div>
        </Div>
        </DivContainer>
        <ButtonDiv>
            <Link to="/cart"><CartButton>Back To Cart</CartButton></Link>
            <CartButton type="submit">Next</CartButton>
        </ButtonDiv>
        </Form>
        
    </Container>
  )
}

export default AddressForm