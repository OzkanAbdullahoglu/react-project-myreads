# MyReads Project

This is a project for Udacity's React Fundamentals course.

## Table of Contents

- [Instructions](#instructions)
- [Project Rubric Criterias](#project-rubric-criterias)
- [Demonstration](#demonstration)
- [Authors](#authors)

## Instructions

### Backend Server

Backend server had been provided by Udacity. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

#### `getAll`

Method Signature:

```js
getAll()
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in the app.

#### `update`

Method Signature:

```js
update(book, shelf)
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

#### `search`

Method Signature:

```js
search(query)
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only.

### App Structure

```bash
├── README.md
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms to use with the app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── MainPage.js # This is a component which demonstrate all of users books in appropriate shelves and also to perform bulk or single move actions
        ├── BookShelf.js # This is a component which handles book's shelves and bulk move action's for MainPage
            ├── Book.js # This is a component which handles every book's own functionalities and sigle move actions
    ├── SearchPage.js # This is a component to demonstrate search results and also to perform bulk move actions
            ├── Book.js # This is a component which handles every book's own functionalities and sigle move actions  
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering.
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Project Rubric Criterias

### Application Setup

The application was created with create-react-app and requires only npm install and npm start to get it installed and launched.
An updated README that describes the project and has instructions for installing and launching the project is included.

### Main Page

The main page shows 3 shelves for books, and each book is shown on the correct shelf.
The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.
When the browser is refreshed, the same information is displayed on the page.

### Search Page

1.  The search page has a search input field.
2.  The search page behaves correctly:

- As the user types into the search field, books that match the query are displayed on the page.
- Search results are not shown when all of the text is deleted out of the search input box.
- Invalid queries are handled and prior search results are not shown.
- The search works correctly when a book does not have a thumbnail or an author.
- The user is able to search for multiple words, such as “artificial intelligence.”

3.  Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

4.  If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.

5.  When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.

### Routing

The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.

The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

### Code Functionality

Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly.

Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.

All JSX code is formatted properly and functional.

## Demonstration

### Single Shelf Movement

<p align="center">
<img src="./img/single-shelf-change.gif" alt="single shelf movement" width="640px" height=320px>
</p>

### Bulk Shelf Movement in Search Page

<p align="center">
<img src="./img/bulk-shelf-change-in-searchPage.gif" alt="bulk shelf movement in search page" width="640px" height=320px>
</p>

### Bulk Shelf Movement in Main Page

<p align="center">
<img src="./img/bulk-shelf-change-in-mainPage2.gif" alt="bulk shelf movement in main page" width="640px" height=320px>
</p>

## Authors

- @richardkalehoff
- @veronikabenkeser
- @OzkanAbdullahoglu
