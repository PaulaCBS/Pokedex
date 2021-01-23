import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import AllPokemons from './components/AllPokemons/AllPokemons';
import MyPokemons from './components/MyPokemons/MyPokemons'
import Spinner from './components/Spinner/Spinner'
import Pagination from '../src/components/Paginacao/Pagination';

const App = () => {
  const [ pokemons, setPokemons ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  const [captured, setCaptured] = useState([]);

  const capturedPokemon = { captured, setCaptured };

  const [ search, setSearch ] = useState(false);

  const [ searchResults, setSearchResults ] = useState([]);

  const [ page, setPage ] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118");

  const [ pageOffset, setPageOffset ] = useState(0);

  const [pageLimit, setPageLimit ] = useState(20)
  //const [nextPageUrl, setNextPageUrl] = useState();
  //const [prevPageUrl, setPrevPageUrl] = useState();
  //const [ page, setPage ] = useState("https://pokeapi.co/api/v2/pokemon");

  const getData = (page) => {
    fetch(page)
      .then( res => res.json())
      .then(data => {
        //setNextPageUrl(data.next);
        //setPrevPageUrl(data.previous);
        const { results } = data;
        const newPokemonData = [];
        results.forEach((pokemon, index) => {
          newPokemonData[index] = {
            id: index + 1,
            name: pokemon.name,
            url: pokemon.url
          };
        });
        setPokemons(newPokemonData);
        setLoading(false)
      });
  }
  
  function gotoNextPage() {
    const newOffset = pageOffset + 20;
    const newLimit = pageLimit + 20;
    setPageOffset(newOffset)
    setPageOffset(newLimit)
  }

  function gotoPrevPage() {
    const newOffset = pageOffset - 20;
    const newLimit = pageLimit - 20;
    setPageOffset(newOffset)
    setPageOffset(newLimit)
  }

  const searchFilter = (e) => {
    setSearch(true)
    const pattern = e.target.value;
    const searchResults = pokemons.filter(pokemon => pokemon.name.match(pattern));

    searchResults.forEach( result => setSearchResults(
      searchResults.filter( (item, index) => {
        const noDuplicates = searchResults.indexOf(item) === index;
        return searchResults.concat(noDuplicates)
      }))  
    )
  }

  //const capturedContext = createContext({
    //language: "en",
    //setLanguage: () => {}
  //});

  useEffect( () => {
      getData(page)
  }, [page]);

  useEffect( () => {
  }, [search, searchFilter])

  return (
    <Router>
      <div className="App">
        <Navbar pokemons={ pokemons } search={ searchFilter }/>
        <Switch>
          <Route exact path="/">
            {
              loading ? <Spinner /> : <AllPokemons pokemons={ pokemons } loading={ loading } search={ search } searchResults={ searchResults } pageOffset={ pageOffset } pageLimit={ pageLimit }/>
            }
          </Route>
          <Route exact path="/meus-pokemons">
            {     
              loading ? <Spinner /> : <MyPokemons />
            }
          </Route>
        </Switch>
        <Pagination prev={ gotoPrevPage } next={ gotoNextPage }/>
      </div>
    </Router>
  );
}

export default App;