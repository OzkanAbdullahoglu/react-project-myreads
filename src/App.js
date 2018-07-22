import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {

    return (
      <div className="app">

          <Route exact path='/' render={() => (
            <MainPage
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
          )}/>
        <Route path='/search' render={() => (
            <SearchPage
            updateShelf={this.updateShelf}
            books={this.state.books}
            />
          )}/>
        </div>

    )
  }
}

export default BooksApp
