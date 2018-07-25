import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* Bookshelf component deployment and passing props */}
          <BookShelf
            books={this.props.books}
            updateShelf={this.props.updateShelf}
          />
        </div>
        <div className="open-search">
          {/* Create a link to search page */}
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage
