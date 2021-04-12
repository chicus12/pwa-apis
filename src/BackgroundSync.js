/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

async function fetchPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()

  return {
    ...data,
    image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
  }
}
export default function BackgroundSync() {
  const sw = navigator.serviceWorker
  const [pokemons] = React.useState([
    'pikachu',
    'charmander',
    'squirtle',
    'bulbasaur',
  ])
  const [pokemon, setPokemon] = React.useState('')
  const [pokemonName, setPokemonName] = React.useState('')
  const [online, isOnline] = React.useState(navigator.onLine)

  const onPokemonSelected = React.useCallback(
    async evt => {
      const name = evt.target.value

      if (name.length) {
        if (online) {
          const pokemonData = await fetchPokemon(evt.target.value)
          setPokemon(pokemonData)
        } else {
          setPokemonName(name)
          sw.controller.postMessage({ type: 'sync', name })
        }
      } else {
        setPokemon('')
      }
    },
    [online]
  )

  React.useEffect(() => {
    if (sw) {
      window.addEventListener('load', () => {
        sw.register('./sw.js')
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener('message', ({ data }) => {
              if (data?.name) {
                setPokemon(data)
              }
            })
          })
          .catch(error => {
            console.log('[SW] Service Worker register error: ', error)
          })
      })
    }
  }, [sw])

  const setOnline = () => {
    isOnline(true)
  }

  const setOffline = () => {
    isOnline(false)
  }

  React.useEffect(() => {
    window.addEventListener('offline', setOffline)
    window.addEventListener('online', setOnline)

    return () => {
      window.removeEventListener('offline', setOffline)
      window.removeEventListener('online', setOnline)
    }
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Background Sync & Offline Demo</h1>
      <label htmlFor="pokemon">
        Seleccione un pokemon:
        <br />
        <select
          id="pokemon"
          onChange={onPokemonSelected}
          value={pokemon?.name ?? null}
          style={{ margin: '20px 0' }}
        >
          <option value="">Ninguno</option>
          {pokemons.map(poke => (
            <option key={poke} value={poke}>
              {poke}
            </option>
          ))}
        </select>
      </label>
      <button type="button" value="charmander" onClick={onPokemonSelected}>
        Charmander
      </button>
      {online ? (
        <h1 style={{ color: 'green' }}>Online</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Offline</h1>
      )}

      {pokemonName && !online ? (
        <h1>
          La información de <span style={{ color: 'blue' }}>{pokemonName}</span>{' '}
          no se puede obtener de momento porque no tiene internet, en el momento
          que vuelva a tener internet se desplegará la información solicitada
        </h1>
      ) : null}

      {pokemon?.id ? (
        <div style={{ marginTop: 20 }}>
          <div>
            <img
              style={{ width: 200 }}
              src={pokemon.image}
              alt={pokemon.name}
            />
          </div>
          <div>
            <b>Nombre: </b> {pokemon.name}
          </div>
          <div>
            <b>Habilidades: </b>
            {pokemon?.abilities?.map(({ ability }) => ability.name).join(', ')}
          </div>
          <div>
            <b>Tipo: </b>
            {pokemon?.types?.map(({ type }) => type.name).join(', ')}
          </div>
        </div>
      ) : null}
    </div>
  )
}
