import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  state = {
    query: '',
    bulkClassName: 'disabled',
    searchResults: [],
    arrayForBulkData: []
  }

  collectBulkData = data => {
    this.setState(state => ({
      arrayForBulkData: state.arrayForBulkData.concat(data)
    }))
  }

  clearBulkData = data => {
    this.setState(state => ({
      arrayForBulkData: state.arrayForBulkData.filter(book => book.id !== data.id)
    }))
  }

  updateQuery = query => {
    this.setState({ query })
    this.getSearchResults(query)
    this.setState({ arrayForBulkData: [] })
    this.removeBulkActions()
  }

  addBulkActions = () => {
    this.setState({ bulkClassName: '' })
  }

  removeBulkActions = () => {
    this.setState({ bulkClassName: 'disabled' })
  }

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
        <div className={`bulk-actions ${this.state.bulkClassName}`}>
          <select
            onChange={event => {
              this.state.arrayForBulkData.map(book =>
                this.props.updateShelf(book, event.target.value)
              )
              this.props.homePath()
            }}
          >
            <option value="move">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
          Bulk Actions
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
                    enableBulkActions={this.addBulkActions}
                    disableBulkActions={this.removeBulkActions}
                    pushBulkData={this.collectBulkData}
                    deleteBulkData={this.clearBulkData}
                    homePathBook={this.props.homePath}
                    getArrayForBulkData={this.state.arrayForBulkData}
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

export default withRouter(SearchPage)
