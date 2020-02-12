import AppContext, { REMOVE_MY_POKEMON } from 'Context/AppContext'
import React, { useContext, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import './index.scss'
interface Props {
  name: string
  nickname: string
  image: string
  index: number
}

const SavedPokemon: React.FC<Props> = ({ name, nickname, image, index }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [, dispatch] = useContext(AppContext)

  const toggleModal = () => setConfirmModalOpen(!confirmModalOpen)

  const deleteItem = () => {
    toggleModal()
    dispatch({ type: REMOVE_MY_POKEMON, payload: index })
  }

  return (
    <Col xs={6} className='p-2'>
      <Card>
        <CardBody className='p-2 text-center'>
          <figure className='Pokemon_image'>
            <img src={image} alt={nickname} />
          </figure>
          <p className='Pokemon_name mb-0 font-weight-bold'>{name}</p>
          <p className='Pokemon_nickname'>({nickname})</p>
          <Button color='danger' block size='sm' onClick={toggleModal}>
            Remove
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={confirmModalOpen} toggle={toggleModal} centered size='sm'>
        <ModalHeader toggle={toggleModal}>Confirm delete</ModalHeader>
        <ModalBody>Confirm delete this from your collection ?</ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>No</Button>
          <Button onClick={deleteItem} color='primary'>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Col>
  )
}

export default SavedPokemon
