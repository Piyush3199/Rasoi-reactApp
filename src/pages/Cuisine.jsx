import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Cuisine() {
  
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async(name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const recipes = await data.json();
        setCuisine(recipes.results);
    };
    useEffect(()=>{
        //console.log(params.type);
        getCuisine(params.type);
    },[params.type]);
    return (
    <Grid 
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.1}}
    >
        {cuisine.map((item) => {
            //console.log(item);
            return(
                <Link to={'/recipe/'+ item.id}>
                <Card key={item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                </Card>
                </Link>
            )
        })};
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1.5fr));
    grid-gap: 20px;
 `;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;

    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;
export default Cuisine;