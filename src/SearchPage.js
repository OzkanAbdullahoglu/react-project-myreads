import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  state = {
    // to handle search queries
    query: '',
    // to enable bulk action button
    bulkClassName: 'disabled',
    // to collect search results
    searchResults: [],
    // to collect book data which coming from user clicks
    arrayForBulkData: []
  }

  /**
   * deploy the data inside of the arrayForBulkData state
   * which coming from user clicks
   */
  collectBulkData = data => {
    this.setState(state => ({
      arrayForBulkData: state.arrayForBulkData.concat(data)
    }))
  }

  /**
   * filter the data out of the arrayForBulkData state
   * which coming from user clicks
   */
  clearBulkData = data => {
    this.setState(state => ({
      arrayForBulkData: state.arrayForBulkData.filter(
        book => book.id !== data.id
      )
    }))
  }

  /**
   * replacing the query with updated one
   * cancelling the bulk move actions for a refresh start
   */
  updateQuery = query => {
    this.setState({ query })
    this.getSearchResults(query)
    this.setState({ arrayForBulkData: [] })
    this.removeBulkActions()
  }

  /**
   * to enable bulk move actions button
   */
  addBulkActions = () => {
    this.setState({ bulkClassName: '' })
  }

  /**
   * to disable bulk move actions button
   */
  removeBulkActions = () => {
    this.setState({ bulkClassName: 'disabled' })
  }

  /**
   * If we have query then look for a match from BooksAPI
   * In case of getting an error then we do nothing
   * else we put the results into the searchResults state
   */
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
            {/*
              to get the query from state and assign It as a value
              In case of any change in the search bar
              we update the query with this brand new value
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {/*
          to disable or enable bulk actions with Its class
          we look for the data from the state and implement It
        */}
        <div className={`bulk-actions ${this.state.bulkClassName}`}>
          {/*
            In case of any change in this selection
            we get the book data from arrayForBulkData state
            then we use updateShelf to change all shelves into that array
            lastly redirecting to the homepage with homePath function
          */}
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
            {/*
              assigning a shelf status as 'none'
              to the books which we get in search results
            */}
            {this.state.searchResults.map(searchedBook => {
              let shelfStatus = 'none'
              this.props.books.map(
                book =>
                  book.id === searchedBook.id ? (shelfStatus = book.shelf) : ''
              )
              return (
                <li key={searchedBook.id}>
                  {/* Book component deployment and passing props */}
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
