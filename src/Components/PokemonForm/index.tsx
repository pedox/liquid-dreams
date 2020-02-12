import AppContext, { SAVE_MY_POKEMON } from 'Context/AppContext'
import { PokemonDetail } from 'Pages/Detail'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

interface Props {
  onClose: Function
  pokemon: PokemonDetail
}

const PokemonForm: React.FC<Props> = ({ onClose, pokemon }) => {
  const [name, setName] = useState('')
  const { push } = useHistory()
  const [, dispatch] = useContext(AppContext)

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onClose()
    dispatch({
      type: SAVE_MY_POKEMON,
      payload: {
        name: pokemon.name,
        nickname: name,
        image: pokemon.sprites.front_default,
      },
    })
    push('/my-pokemons')
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Give your pokemon name !</Label>
        <Input
          type='text'
          name='name'
          onChange={onChangeValue}
          required
          placeholder='Chewbecca'
        />
      </FormGroup>
      <FormGroup>
        <Button color='primary' block>
          Save
        </Button>
      </FormGroup>
    </Form>
  )
}

export default PokemonForm
