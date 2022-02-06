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
      english: PropTypes.string,
    }),
    type:PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func
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
          <div>
            <h1>{selectedItem.name.english}</h1>
          </div>
        )}
        </div>
    </div>
  );
}

export default App;
