import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  state = {
    //to handle bulk action button in read shelf
    bulkActionRead: '-disabled',
    //to handle bulk action button in want to read shelf
    bulkActionWantToRead: '-disabled',
    //to handle bulk action button in currently reading shelf
    bulkActionReading: '-disabled',
    //collecting data for read shelf which coming from user clicks
    arrayRead: [],
    //collecting data for currently reading shelf which coming from user clicks
    arrayReading: [],
    //collecting data for want to read shelf which coming from user clicks
    arrayWantToRead: []
  }

  /**
   * deploy the data inside of the arrayRead state
   * which coming from user clicks
   */
  collectBulkDataForRead = data => {
    this.setState(state => ({
      arrayRead: state.arrayRead.concat(data)
    }))
  }

  /**
   * deploy the data inside of the arrayReading state
   * which coming from user clicks
   */
  collectBulkDataForReading = data => {
    this.setState(state => ({
      arrayReading: state.arrayReading.concat(data)
    }))
  }

  /**
   * deploy the data inside of the arrayWantToRead state
   * which coming from user clicks
   */
  collectBulkDataForWantToRead = data => {
    this.setState(state => ({
      arrayWantToRead: state.arrayWantToRead.concat(data)
    }))
  }

  /**
   * filter the data out of the arrayRead state
   * which coming from user clicks
   */
  clearBulkDataForRead = data => {
    this.setState(state => ({
      arrayRead: state.arrayRead.filter(book => book.id !== data.id)
    }))
  }

  /**
   * filter the data out of the arrayReading state
   * which coming from user clicks
   */
  clearBulkDataForReading = data => {
    this.setState(state => ({
      arrayReading: state.arrayReading.filter(book => book.id !== data.id)
    }))
  }

  /**
   * filter the data out of the arrayWantToRead state
   * which coming from user clicks
   */
  clearBulkDataForWantToRead = data => {
    this.setState(state => ({
      arrayWantToRead: state.arrayWantToRead.filter(book => book.id !== data.id)
    }))
  }

  /**
   * to enable bulk move actions button in read shelf
   */
  addBulkActionsForRead = () => {
    this.setState({ bulkActionRead: '' })
  }

  /**
   * to disable bulk move actions button in read shelf
   */
  removeBulkActionsForRead = () => {
    this.setState({ bulkActionRead: '-disabled' })
  }

  /**
   * to enable bulk move actions button in currently reading shelf
   */
  addBulkActionsForReading = () => {
    this.setState({ bulkActionReading: '' })
  }

  /**
   * to disable bulk move actions button in currently reading shelf
   */
  removeBulkActionsForReading = () => {
    this.setState({ bulkActionReading: '-disabled' })
  }

  /**
   * to enable bulk move actions button in want to read shelf
   */
  addBulkActionsForWantToRead = () => {
    this.setState({ bulkActionWantToRead: '' })
  }

  /**
   * to disable bulk move actions button in want to read shelf
   */
  removeBulkActionsForWantToRead = () => {
    this.setState({ bulkActionWantToRead: '-disabled' })
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          {/*
              to disable or enable bulk actions in currently reading shelf with Its class
              we look for the data from the state and implement It
            */}
          <div
            className={`bulk-actions-currently-reading${
              this.state.bulkActionReading
            }`}
          >
            {/*
            In case of any change in this selection
            we get the book data from arrayReading state
            then we use updateShelf to change all shelves into that array
            lastly we remove bulk action button for a refresh start
          */}
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
                    {/* Book component deployed in currently reading shelf and passing props and states */}
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
          {/*
              to disable or enable bulk actions in want to read shelf with Its class
              we look for the data from the state and implement It
            */}
          <div
            className={`bulk-actions-want-to-read${
              this.state.bulkActionWantToRead
            }`}
          >
            {/*
            In case of any change in this selection
            we get the book data from arrayWantToRead state
            then we use updateShelf to change all shelves into that array
            lastly we remove bulk action button for a refresh start
          */}
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
                    {/* Book component deployed in want to read shelf and passing props and states */}
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
                      checkBulkClassNameReading={this.state.bulkActionReading}
                    />
                  </li>
                ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          {/*
              to disable or enable bulk actions in read shelf with Its class
              we look for the data from the state and implement It
            */}
          <div className={`bulk-actions-read${this.state.bulkActionRead}`}>
            {/*
              In case of any change in this selection
              we get the book data from arrayRead state
              then we use updateShelf to change all shelves into that array
              lastly we remove bulk action button for a refresh start
            */}
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
                    {/* Book component deployed in read shelf and passing props and states */}
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
                      checkBulkClassNameReading={this.state.bulkActionReading}
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
