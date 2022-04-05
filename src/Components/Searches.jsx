import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {listProducts }from '../redux/actions/productActions';

const Search = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 75%;
    transition: all 1s;
    z-index: 2;
    margin: 0px;
    &:hover {
        cursor: pointer;
        }
    &::before {
        content: "";
        position: absolute;
        margin: auto;
        top: 22px;
        right: 0;
        bottom: 0;
        left: 22px;
        width: 6px;
        height: 2px;
        background: #6e287c;
        transform: rotate(45deg);
        transition: all .5s;
        }
    &::after {
        content: "";
        position: absolute;
        margin: auto;
        top: -5px;
        right: 0;
        bottom: 0;
        left: -5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid #6e287c;
        transition: all .5s;
        }
`
const ListItem = styled.p`
 width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  color: black;

`
const Card = styled.div`
  background-color: white;
  width: 150px;
  align-items: right;
  margin-top: 30px;
  display: block;
`;
const SearchBar = styled.input`
    align-items: center;
    font-family: 'Inconsolata', monospace;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 45px;
    height: 45px;
    outline: none;
    border: none;
    background: white;
    color: #6e287c;
    border-radius: 30px;
    box-shadow: 0 0 25px 0 #6e287c,
                0 20px 25px 0 rgba(0, 0, 0, 0.2);
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      width: 200px;
      opacity: 1;
      cursor: text;
    }
    &:focus ~ .search {
      right: -250px;
      background: ##6e287c;;
      z-index: 6;
      &::before {
        top: 0;
        left: 0;
        width: 25px;
      }
      &::after {
        top: 0;
        left: 0;
        width: 25px;
        height: 2px;
        border: none;
        background: #6e287c;;
        border-radius: 0%;
        transform: rotate(-45deg);
      }
    }
    &::placeholder {
      color: #6e287c;
      opacity: 0.5;
      font-weight: bold;
    }
    ${Card}:hover & {
      background-color: blue;
    }
  }

`

const Alist = styled.a`
  margin-top: 20px;
  width: 300px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
`;



const Searches = () => {
  const [searchTerm, setSearchTerm]= useState([]);
  const [filter, setFilter] = useState("");

  const productList = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products} = productList;
  const handleSearch = () => {
    dispatch(listProducts({limit: 50}));
  }
  
  

  const handleFilter = (event) => {
    const searched = event.target.value;
    setSearchTerm(searched);
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searched.toLowerCase());
    });
    if (searched === "") {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }
  };

  const clearInput = () => {
    setFilter([]);
    setSearchTerm("")

  }

  return (
    <Search onClick={handleSearch}>
        <SearchBar 
            type="text" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleFilter}
            />
            {filter.length !== 0 && (
              <Card>
                {filter.slice(0, 5).map((value, key) => {
                  return (
                    <Alist onClick={() => navigate(`/details/${value.permalink}`)} >
                      <ListItem onClick={clearInput}>{value.name}</ListItem>
                    </Alist>
                  )
                })}
              </Card>
            )}
              
    </Search>
  )
}

export default Searches;