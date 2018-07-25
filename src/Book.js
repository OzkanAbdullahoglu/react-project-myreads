import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Book extends Component {
  state = {
    // to handle single movement button on every book
    className: '',
    // to get the current path
    currentPath: [this.props.location.pathname]
  }

  /**
   * to disable single action button
   * we use className state to manipulate element's class
   */
  disableSingleAction = () => {
    if (this.state.className) {
      this.setState({ className: '' })
    } else {
      this.setState({ className: 'disabled' })
    }
  }

  /**
   * If classname state is empty
   * we clear the data from the clearBulkData state in searchPage
   * with help of deleteBulkData props
   * If this was the last clicked book inside the page
   * then we remove the bulk actions button
   * with help of disableBulkActions this.props
   * If classname state is not empty
   * we push the book's data back to the collectBulkData state in searchPage
   * with help of pushBulkData this.props
   * lastly we add the bulk actions button
   * with help of enableBulkActions props
   */
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

  /**
   * If classname state is empty
   * we check which shelf user clicks come from
   * we do appropriate updates up to that shelf
   * we block bulk actions in multiple shelves and give an alert to user
   */
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
    {
      /*
      checking If we get back a thumbnail from search results
      If we do not have a thumbnail then we do nothing to prevent a crush
     */
    }
    let thumbnailProperty = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : ''

    return (
      <div className="book">
        <div className="book-top">
          {/*
            after recieving a click we disable single movement button
            then we check the path to decide where to perform bulk move actions
          */}
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
          {/*
            to disable or enable single movement with Its class
            we look for the data from the state and implement It
          */}
          <div className={`book-shelf-changer ${this.state.className}`}>
            {/*
              In case of any change in this selection
              we get the book data from book props
              then we use updateShelf to change the shelf
              If we are in the search page
              redirecting to the homepage with homePathBook props
              lastly we define the default value of selection
              as the book's current shelf
            */}
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
