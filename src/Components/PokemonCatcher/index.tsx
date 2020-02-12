import PokemonForm from 'Components/PokemonForm'
import { PokemonDetail } from 'Pages/Detail'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import './index.scss'
interface Props {
  pokemon: PokemonDetail
}

const PokemonCatcher: React.FC<Props> = ({ pokemon }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isGot, setIsGot] = useState(true)

  const modalToggle = () => setModalOpen(!modalOpen)

  const catchPokemon = async () => {
    setIsLoading(true)
    setModalOpen(true)

    //Make Fake Loading
    await new Promise(resolve => setTimeout(resolve, 1000))
    const gotcha = Math.random() > 0.5
    setIsGot(gotcha)

    setIsLoading(false)
  }

  const GotPokemon = () => {
    return (
      <div className='text-center'>
        <h2>Congratulations !</h2>
        <figure className='m-2'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </figure>
        <p>
          You Got Pokemon <strong>{pokemon.name}</strong>
        </p>
        <PokemonForm pokemon={pokemon} onClose={modalToggle} />
      </div>
    )
  }

  const Unlucky = () => {
    return (
      <div className='text-center'>
        <h2>Oh no!</h2>
        <p>This is not your lucky time!</p>
        <p>Maybe you want to try again ?</p>
        <Button block color='primary' onClick={catchPokemon}>
          Yes i do !
        </Button>
      </div>
    )
  }

  return (
    <div className='PokemonCatcher px-3 pb-3'>
      <Button color='danger' block size='lg' onClick={catchPokemon}>
        Catch Pokemon !
      </Button>
      <Modal isOpen={modalOpen} toggle={modalToggle} centered>
        <ModalHeader toggle={modalToggle}>Catch my Pokemon!</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <div className='text-center m-5'>
              <Spinner size='lg' />
            </div>
          ) : isGot ? (
            <GotPokemon />
          ) : (
            <Unlucky />
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default PokemonCatcher
