import Header from 'Components/Header'
import { AppContextProvider } from 'Context/AppContext'
import Detail from 'Pages/Detail'
import Main from 'Pages/Main'
import MyPokemon from 'Pages/MyPokemon'
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

const App = () => {
  return (
    <AppContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Container>
          <Header />
          <Switch>
            <Route path='/' exact>
              <Main />
            </Route>
            <Route path='/pokemon/:id' exact>
              <Detail />
            </Route>
            <Route path='/my-pokemons' exact>
              <MyPokemon />
            </Route>
            <Route path='*'>
              <div className='text-center mt-5'>
                <h2>Page Not Found !</h2>
                <p>
                  Let's go back to <Link to='/'>home</Link>
                </p>
              </div>
            </Route>
          </Switch>
        </Container>
      </Router>
    </AppContextProvider>
  )
}

export default App
