import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Book extends Component {
  state = {
    className: '',
    currentPath: [this.props.location.pathname]
  }

  getCurrentPath = () => {
    this.setState(state => ({
      currentPath: state.currentPath.concat(this.props.location.pathname)
    }))
  }

  disableSingleAction = () => {
    if (this.state.className) {
      this.setState({ className: '' })
    } else {
      this.setState({ className: 'disabled' })
    }
  }

  updateSearchPage = () => {
    if (this.state.className) {
      this.props.deleteBulkData(this.props.book)
      if (this.props.getArrayForBulkData.length - 1 === 0) {
        this.props.disableBulkActions()
      }
    } else {
      this.props.pushBulkData(this.props.book)
      this.props.enableBulkActions()
    }
  }

  updateMainPage = () => {
    if (this.state.className) {
      if (this.props.currentShelf === 'read') {
        this.props.deleteBulkDataForRead(this.props.book)
        if (this.props.getArrayRead.length - 1 === 0) {
          this.props.disableBulkActionsForRead()
        }
      }
      if (this.props.currentShelf === 'currentlyReading') {
        this.props.deleteBulkDataForReading(this.props.book)
        if (this.props.getArrayReading.length - 1 === 0) {
          this.props.disableBulkActionsForReading()
        }
      }
      if (this.props.currentShelf === 'wantToRead') {
        this.props.deleteBulkDataForWantToRead(this.props.book)
        if (this.props.getArrayWantToRead.length - 1 === 0) {
          this.props.disableBulkActionsForWantToRead()
        }
      }
    } else {
      if (this.props.currentShelf === 'read') {
        this.props.pushBulkDataForRead(this.props.book)
        if (
          this.props.checkBulkClassNameReading &&
          this.props.checkBulkClassNameWantToRead
        ) {
          this.props.enableBulkActionsForRead()
        } else {
          alert(
            'Bulk actions in multiple shelves is not allowed , Please try again!'
          )
        }
      }
      if (this.props.currentShelf === 'currentlyReading') {
        this.props.pushBulkDataForReading(this.props.book)
        if (
          this.props.checkBulkClassNameRead &&
          this.props.checkBulkClassNameWantToRead
        ) {
          this.props.enableBulkActionsForReading()
        } else {
          alert(
            'Bulk actions in multiple shelves is not allowed , Please try again!'
          )
        }
      }
      if (this.props.currentShelf === 'wantToRead') {
        this.props.pushBulkDataForWantToRead(this.props.book)
        if (
          this.props.checkBulkClassNameReading &&
          this.props.checkBulkClassNameRead
        ) {
          this.props.enableBulkActionsForWantToRead()
        } else {
          alert(
            'Bulk actions in multiple shelves is not allowed , Please try again!'
          )
        }
      }
    }
  }

  render() {
    let thumbnailProperty = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : ''

    return (
      <div className="book">
        <div className="book-top">
          <input
            className="books-checkbox"
            type="checkbox"
            name="box1"
            value="1"
            onClick={() => {
              this.disableSingleAction()
              if (this.state.currentPath == '/search') {
                this.updateSearchPage()
              } else {
                this.updateMainPage()
              }
            }}
          />
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${thumbnailProperty}")`
            }}
          />
          <div className={`book-shelf-changer ${this.state.className}`}>
            <select
              onChange={event => {
                this.props.updateShelf(this.props.book, event.target.value)
                  if (this.state.currentPath == '/search') {
                this.props.homePathBook()
              }
              }}
              value={this.props.currentShelf}

            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default withRouter(Book)
