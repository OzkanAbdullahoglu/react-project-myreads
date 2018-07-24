import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  state = {
    bulkActionRead: '-disabled',
    bulkActionWantToRead: '-disabled',
    bulkActionReading: '-disabled',
    arrayRead: [],
    arrayReading: [],
    arrayWantToRead: []
  }

  collectBulkDataForRead = data => {
    this.setState(state => ({
      arrayRead: state.arrayRead.concat(data)
    }))
  }

  collectBulkDataForReading = data => {
    this.setState(state => ({
      arrayReading: state.arrayReading.concat(data)
    }))
  }

  collectBulkDataForWantToRead = data => {
    this.setState(state => ({
      arrayWantToRead: state.arrayWantToRead.concat(data)
    }))
  }

  clearBulkDataForRead = data => {
    this.setState(state => ({
      arrayRead: state.arrayRead.filter(book => book.id !== data.id)
    }))
  }

  clearBulkDataForReading = data => {
    this.setState(state => ({
      arrayReading: state.arrayReading.filter(book => book.id !== data.id)
    }))
  }

  clearBulkDataForWantToRead = data => {
    this.setState(state => ({
      arrayWantToRead: state.arrayWantToRead.filter(book => book.id !== data.id)
    }))
  }

  addBulkActionsForRead = () => {
    this.setState({ bulkActionRead: '' })
  }

  removeBulkActionsForRead = () => {
    this.setState({ bulkActionRead: '-disabled' })
  }

  addBulkActionsForReading = () => {
    this.setState({ bulkActionReading: '' })
  }

  removeBulkActionsForReading = () => {
    this.setState({ bulkActionReading: '-disabled' })
  }

  addBulkActionsForWantToRead = () => {
    this.setState({ bulkActionWantToRead: '' })
  }

  removeBulkActionsForWantToRead = () => {
    this.setState({ bulkActionWantToRead: '-disabled' })
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div
            className={`bulk-actions-currently-reading${
              this.state.bulkActionReading
            }`}
          >
            <select
              onChange={event => {
                this.state.arrayReading.map(book =>
                  this.props.updateShelf(book, event.target.value)
                )
                this.removeBulkActionsForReading()
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
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books
                .filter(book => book.shelf === 'currentlyReading')
                .map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateShelf={this.props.updateShelf}
                      currentShelf="currentlyReading"
                      enableBulkActionsForReading={
                        this.addBulkActionsForReading
                      }
                      pushBulkDataForReading={this.collectBulkDataForReading}
                      deleteBulkDataForReading={this.clearBulkDataForReading}
                      getArrayReading={this.state.arrayReading}
                      disableBulkActionsForReading={
                        this.removeBulkActionsForReading
                      }
                      checkBulkClassNameRead={this.state.bulkActionRead}
                      checkBulkClassNameWantToRead={
                        this.state.bulkActionWantToRead
                      }
                    />
                  </li>
                ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div
            className={`bulk-actions-want-to-read${
              this.state.bulkActionWantToRead
            }`}
          >
            <select
              onChange={event => {
                this.state.arrayWantToRead.map(book =>
                  this.props.updateShelf(book, event.target.value)
                )
                this.removeBulkActionsForWantToRead()
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
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books
                .filter(book => book.shelf === 'wantToRead')
                .map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateShelf={this.props.updateShelf}
                      currentShelf="wantToRead"
                      enableBulkActionsForWantToRead={
                        this.addBulkActionsForWantToRead
                      }
                      pushBulkDataForWantToRead={
                        this.collectBulkDataForWantToRead
                      }
                      deleteBulkDataForWantToRead={
                        this.clearBulkDataForWantToRead
                      }
                      getArrayWantToRead={this.state.arrayWantToRead}
                      disableBulkActionsForWantToRead={
                        this.removeBulkActionsForWantToRead
                      }
                      checkBulkClassNameRead={this.state.bulkActionRead}
                      checkBulkClassNameReading={
                        this.state.bulkActionReading
                      }
                    />
                  </li>
                ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className={`bulk-actions-read${this.state.bulkActionRead}`}>
            <select
              onChange={event => {
                this.state.arrayRead.map(book =>
                  this.props.updateShelf(book, event.target.value)
                )
                this.removeBulkActionsForRead()
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
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books
                .filter(book => book.shelf === 'read')
                .map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateShelf={this.props.updateShelf}
                      currentShelf="read"
                      enableBulkActionsForRead={this.addBulkActionsForRead}
                      pushBulkDataForRead={this.collectBulkDataForRead}
                      deleteBulkDataForRead={this.clearBulkDataForRead}
                      getArrayRead={this.state.arrayRead}
                      disableBulkActionsForRead={this.removeBulkActionsForRead}
                      checkBulkClassNameWantToRead={
                        this.state.bulkActionWantToRead
                      }
                      checkBulkClassNameReading={
                        this.state.bulkActionReading
                      }
                    />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf
