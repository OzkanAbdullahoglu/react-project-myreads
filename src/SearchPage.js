import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  /*  static propTypes = {
    getSearchResults: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired

  }*/

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = query => {
    this.setState({ query })
    this.getSearchResults(query)
  }

  /*clearQuery = () => {
    this.setState({ query: '' })
  }*/

  getSearchResults = query => {
    if (query) {
      BooksAPI.search(query).then(searchResults => {
        if (searchResults.error) {
          this.setState({ searchResults: [] })
        } else {
          this.setState({ searchResults })
        }
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    /*let filteredBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredBooks = books.filter(book => match.test(book.title))
    } else {
      filteredBooks = books
    }*/

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(searchedBook => {
              let shelfStatus = 'none'
              this.props.books.map(
                book =>
                  book.id === searchedBook.id ? (shelfStatus = book.shelf) : ''
              )
              return (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    updateShelf={this.props.updateShelf}
                    currentShelf={shelfStatus}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
