import PokemonCatcher from 'Components/PokemonCatcher'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Badge, Card, CardBody, Col, Row, Spinner } from 'reactstrap'
import Api from 'Utils/Api'
import './index.scss'
interface Props {}

export interface PokemonDetail {
  name: string
  moves: {
    move: { name: string }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
  }
}

const Detail: React.FC<Props> = () => {
  const { params } = useRouteMatch()
  const [data, setData] = useState<PokemonDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchDetail = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await Api().get(`/pokemon/${params.id}`)
      setData(data)
    } catch (e) {
      //...
    }
    setIsLoading(false)
  }, [params.id])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  return (
    <div className='Detail my-3'>
      {isLoading ? (
        <div className='Detail_loading text-center mt-5'>
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : data !== null ? (
        <Fragment>
          <div className='text-center'>
            <img
              src={data.sprites.front_default}
              className='Detail_sprites'
              alt={data.name}
            />
            <h1 className='Detail_name'>{params.id}</h1>
            <div className='Detail_types mb-3'>
              {data.types.map((item, index) => (
                <Badge key={index} color='primary' className='mr-2'>
                  {item.type.name}
                </Badge>
              ))}
            </div>
          </div>
          <h2>Moves</h2>
          <div className='Detail_moves'>
            <Row className='mx-n1'>
              {data.moves.map((item, index) => (
                <Col xs={6} key={index} className='p-1'>
                  <Card>
                    <CardBody className='p-2'>{item.move.name}</CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <PokemonCatcher pokemon={data} />
          <div className='mb-5'>&nbsp;</div>
        </Fragment>
      ) : (
        <div>
          <h1>No Pokemon founds</h1>
        </div>
      )}
    </div>
  )
}

export default Detail
