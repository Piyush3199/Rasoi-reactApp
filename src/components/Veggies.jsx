import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veggies() {

  const [veggies, setVeggies] = useState([]);
  // only run whn component is mounted
  useEffect(() => {
    getVeggies();
  },[]);

  const getVeggies = async () => {

    const check = localStorage.getItem('veggies');

    if(check){
      setVeggies(JSON.parse(check));
    }
    else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        // getting the data from API in json
       const data = await api.json();
        //console.log(data);
        
        localStorage.setItem('veggies',JSON.stringify(data.recipes));
        setVeggies(data.recipes);
        console.log(data.recipe);
    }

    
  
   
  };

  return (
    <div>
      <Wrapper>
          <h3>Veg dishes</h3>

            <Splide options={{
              perPage:3,
              arrows: false,
              pagination:false,
              drag:'free',
              gap: "5rem"
            }}>
            {veggies.map((recipe) => {
              return(
                <SplideSlide key={recipe.id}>

                <Card>
                  <Link to={'/recipe/'+recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}></img>
                <Gradient />
                </Link>
                </Card>
                </SplideSlide>
              );
              
            })}
            </Splide>
          </Wrapper>
        
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 4rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 0%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height:40%;
    display: flex;
    align-items: center;
    justify-content: center;


  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(0,0,0,0),rgba(0,0,0,0.5));

`;
 
export default Veggies