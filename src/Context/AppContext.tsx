import React from 'react'

export const SET_POKEMONS = 'SET_POKEMONS'
export const APPEND_POKEMONS = 'APPEND_POKEMON'

export const SAVE_MY_POKEMON = 'SAVE_MY_POKEMON'
export const REMOVE_MY_POKEMON = 'REMOVE_MY_POKEMON'

interface PokemonItem {
  name: string
  url: string
}

interface ContextProps {
  pokemons: {
    count: Number
    next: string | null
    previous: string | null
    results: PokemonItem[]
  }
  myPokemons: {
    name: string
    nickname: string
    image: string
  }[]
}

const initialValue: ContextProps = {
  pokemons: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  myPokemons: JSON.parse(localStorage.getItem('_myPokemons') || '[]'),
}

interface ReducerAction {
  type: string
  payload: any
}

type InitialContext = [ContextProps, React.Dispatch<ReducerAction>]

const reducer = (
  state: ContextProps,
  { type, payload }: ReducerAction
): ContextProps => {
  let myPokemons
  switch (type) {
    case SET_POKEMONS:
      return { ...state, pokemons: payload }
    case APPEND_POKEMONS:
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          ...payload,
          results: [...state.pokemons.results, ...payload.results],
        },
      }
    case SAVE_MY_POKEMON:
      myPokemons = [...state.myPokemons, payload]
      localStorage.setItem('_myPokemons', JSON.stringify(myPokemons))
      return {
        ...state,
        myPokemons,
      }
    case REMOVE_MY_POKEMON:
      myPokemons = state.myPokemons.filter((item, index) => index !== payload)
      localStorage.setItem('_myPokemons', JSON.stringify(myPokemons))
      return {
        ...state,
        myPokemons,
      }
    default:
      throw new Error()
  }
}

const AppContext = React.createContext<InitialContext | undefined>(undefined)

interface Props {
  children: React.ReactElement
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const dispatcher = React.useReducer(reducer, initialValue)
  return (
    <AppContext.Provider value={dispatcher}>{children}</AppContext.Provider>
  )
}

export default AppContext
