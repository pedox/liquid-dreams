import Pokemon from 'Components/Pokemon'
import AppContext, { APPEND_POKEMONS, SET_POKEMONS } from 'Context/AppContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'reactstrap'
import Api from 'Utils/Api'

interface Props {}

const Main: React.FC<Props> = () => {
  const [state, dispatch] = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPokemon = useCallback(
    async (next = null) => {
      setIsLoading(true)
      const { data } = await Api().get(next || '/pokemon')
      if (next !== null) {
        dispatch({ type: APPEND_POKEMONS, payload: data })
      } else {
        dispatch({ type: SET_POKEMONS, payload: data })
      }
      setIsLoading(false)
    },
    [dispatch]
  )

  useEffect(() => {
    if (state.pokemons.results.length === 0) {
      fetchPokemon()
    }
  }, [fetchPokemon, state.pokemons.results.length])

  const fetchNext = () => {
    fetchPokemon(state.pokemons.next)
  }

  return (
    <div className='MainPage'>
      {isLoading && state.pokemons.results.length === 0 ? (
        <div className='m-5 text-center'>
          <Spinner size='lg' />
        </div>
      ) : (
        state.pokemons.results.map((item, index) => (
          <Pokemon {...item} index={index} key={index} />
        ))
      )}

      {state.pokemons.next !== null && (
        <div className='my-3'>
          <Button
            block
            color='primary'
            onClick={fetchNext}
            disabled={isLoading}
          >
            {isLoading && <Spinner size='sm' className='mr-2' />}
            Load More !
          </Button>
        </div>
      )}
    </div>
  )
}

export default Main
