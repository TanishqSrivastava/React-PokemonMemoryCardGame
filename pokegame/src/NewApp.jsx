

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

export default function NewApp() {
  const [pokemon, setPokemon] = useState([]);
  const [randomizedPokemon, setRandomizedPokemon] = useState([]);
  const [shortPokemon, setShortPokemon] = useState([]);
  const [clickedonPokemon, setClickedonPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      const results = data.results;

      const newPokemon = await Promise.all(results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          name: pokemon.name,
          imageUrl: data.sprites.front_default
        };
      }));

      setPokemon(newPokemon);
      setShortPokemon(newPokemon.sort(()=> 0.5 - Math.random()).slice(0,9));
      setRandomizedPokemon(newPokemon); // Initially set to the same list
    } catch (error) {
      console.log(error);
    }
  };

  const randomizePokemon = () => {
    const shuffledPokemon = [...shortPokemon]; 
    for (let i = shuffledPokemon.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPokemon[i], shuffledPokemon[j]] = [shuffledPokemon[j], shuffledPokemon[i]]; // Swap elements to shuffle
    }
    setRandomizedPokemon([...shuffledPokemon]); // Ensure React detects the change
  };


  const checkClicked = (name, imageUrl) =>{
    console.log(name + " " + imageUrl + " clicked");
    if (clickedonPokemon.includes(name)){
        console.log("You lose!");
        setGameOver(true);
    }else{
    setCount(count+1);
    randomizePokemon();
    setClickedonPokemon([...clickedonPokemon, name]);
    console.log(clickedonPokemon);
    setWin(false);
    }
  }
  useEffect(()=>{
    if (count == 9){
        setWin(true);
    }else{
        setWin(false);
    }
    if(gameOver==true || win == true){
        document.querySelectorAll('.card').forEach((card)=>{
            card.style.pointerEvents = 'none';
        });
    }else{
        document.querySelectorAll('.card').forEach((card)=>{
            card.style.pointerEvents = 'auto';
        });
    }
  },[gameOver,count]);
  const btnClick = () =>
  {
    setGameOver(false);
    setCount(0);
    setClickedonPokemon([]);
    randomizePokemon();
  }
  return (
    <div>
        <h1>Pokemon Memory Card Game</h1>
        <p>Score</p>
        
        <p>{count}</p>
      <button class="button-56" onClick={btnClick}>Start</button>
      {gameOver && (
        <div className="game-over">
            <h1>Game Over</h1>
            <p>Your score is {count}</p>
            <button class="button-56" onClick={btnClick}>Start Over</button>
        </div>
      )}
      {win && (
        <div className="game-over">
            <h1>You Win!</h1>
            <p>Your score is {count}</p>
            <button class="button-56" onClick={btnClick}>Start Over</button>
        </div>
      
      )}
      <div className="grid">
        {randomizedPokemon.map((p, index) => (
          <Card  key={index} name={p.name} imageUrl={p.imageUrl} afterClick={checkClicked}/>
        ))}
      </div>
    </div>
  );
}
