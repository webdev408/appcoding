import React from 'react';
import "./App.css";
import pokemon from './pokemon.json';
import PropTypes from 'prop-types';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
      <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(',')}</td>
    <td>
      <button onClick={()=> onSelect(pokemon)}>Select!</button>
    </td>
  </tr> 
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type:PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Atttack: PropTypes.number.isRequired,
    Defence: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp.Defenses": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}
  


function App() {
  const [filter, setFilter] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState(null)
  return (
    <div style={{ margin: "auto", width: 800, paddingTop: "1rem" }}>
      <h1 className="title">Pokemon Search</h1>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gridColumnGap: '1rem' }}>
        <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
            {pokemon.filter((pokemon)=>pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .map(pokemon => (
            <PokemonRow pokemon = {pokemon} key={pokemon.id} onSelect={(pokemon)=>setSelectedItem(pokemon)}/>
          ))}
        </tbody>
        </table>
        </div>
        {selectedItem && (
          <PokemonInfo {...selectedItem} />
        )}
        </div>
    </div>
  );
}

export default App;
