import AppContext from 'Context/AppContext'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody } from 'reactstrap'
import './index.scss'
interface Props {
  name: String
  index: number
}

const Pokemon: React.FC<Props> = ({ name, index }) => {
  const [state] = useContext(AppContext)

  const caught = useMemo(() => {
    return state.myPokemons.filter(item => item.name === name).length
  }, [state.myPokemons, name])

  return (
    <Link to={'/pokemon/' + name} className='Pokemon'>
      <Card className='my-3'>
        <CardBody className='p-2'>
          <span className='Pokemon_index'>#{index + 1}</span>
          <span className='Pokemon_name'>{name}</span>
          {caught > 0 && (
            <span className='Pokemon_caught float-right'>
              <Badge color='primary'>{caught}</Badge>
            </span>
          )}
        </CardBody>
      </Card>
    </Link>
  )
}

export default Pokemon
