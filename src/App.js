import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    //to handle all books data
    books: []
  }

/**
 * we get all book's data and pass It to the books state
 * with help of getAll method in BooksAPI
 */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  /**
   * First we use updateShelf method to change the shelf of any books
   * then we use getALl again to see the results instantly on the page
   */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/* MainPage component as a primary route and passing It props */}
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} updateShelf={this.updateShelf} />
          )}
        />
      {/* 
        SearchPage component as a secondary route with /search path
        passing It props
        redirecting to home page with help of history
      */}
        <Route
          path="/search"
          render={({ history }) => (
            <SearchPage
              books={this.state.books}
              updateShelf={this.updateShelf}
              homePath={() => {
                history.push('/')
              }}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
