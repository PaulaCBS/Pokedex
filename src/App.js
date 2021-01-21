import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const App = () => {
  const [pokemons, setPokemons] = useState();

  const[loading, setLoading] = useState(true);

  useEffect( () => {
    getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118");
  }, [] )

  const getPokemons = (url) => {
    fetch(url)
      .then( res => res.json())
      .then( data => {
        const pokemonsList = data.results;
        setPokemons(pokemonsList)
        setLoading(false)
        /*Promise.all(
          pokemonsList.map( pokemon => {
            fetch( pokemon.url )
              .then( res => res.json() )
              .then( singlePokemon => setPokemons(singlePokemon) );
          })
        )*/
      })
  }

  return (
    <Router>
      <div className="App">
        <Navbar pokemons={pokemons} />
        {
          if(loading) return <Spinner />
        }
      </div>
    </Router>
  );
}

export default App;
