import SavedPokemon from 'Components/SavedPokemon'
import AppContext from 'Context/AppContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'reactstrap'

interface Props {}

const MyPokemon: React.FC<Props> = () => {
  const [state] = useContext(AppContext)
  return (
    <div className='MyPokemon'>
      <h2>My Pokemon's</h2>
      {state.myPokemons.length === 0 ? (
        <div className='text-center m-5'>
          <h2>No Pokemon has been caught</h2>
          <p>
            Try to <Link to='/'>catch pokemon !</Link>
          </p>
        </div>
      ) : (
        <Row className='mx-n2'>
          {state.myPokemons.map((item, index) => (
            <SavedPokemon {...item} index={index} key={index} />
          ))}
        </Row>
      )}
    </div>
  )
}

export default MyPokemon
