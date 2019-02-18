import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation';
import SearchResultComponent from './components/SearchResultComponent';
import BookList from './components/BookList';
import LogInComponent from './components/LogInComponent';
import './App.css';

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;


const userBooks = [
    {"title": "Test book",
    "bookID": "1k5fadBfa",
    "author": "Book Author",
    "publisher": "Columbia books",
    "image": "http://books.google.com/books/content?id=pIs9Em38dAoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE721Zj_q3mq62Uoto-yeCuhEA3H4feL1rQiv9BniDBFGeQAZksGdXKv6th9kCcIDG2oiDiliAH3aO5__kiJdFntKktEzNxj5n6YYo7fHm7_mbasbdDcOyds6LX46cYzEprCX7bVG&source=gbs_api",
    "review": [
      {"username": "MLopez",
      "userID": 1,
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"},
      {"username": "Panda_boi",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt panda panda panda"}
      ]
    },
    {"title": "Reviewed Book",
    "bookID": "135edgagat5",
    "author": "JK Rowling",
    "publisher": "Penguin books",
    "image": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "review": [
      {"username": "coca-cola",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"},
      {"username": "pepsi",
      "review": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt panda panda panda"}
    ]},

  ]


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      searchInput: '',
      searchResult: [],
      reviewedBooks: [],
      isLoggedIn: false,
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt');
    this.setState({
      reviewedBooks: userBooks
    })
  }

  updateSearch = e => {
    this.setState({
      searchInput: e.target.value
    })
  }

  getBookByTitle = title => {
    title = this.state.searchInput
    console.log(title);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}=${API_KEY}`)
      .then(response => {
        console.log(response.data.items)
        this.setState({
          searchResult: response.data.items
        })
      })
      .catch(error => {
        console.log(error)
      })

      this.setState({
        searchInput: ''
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="App">
        <div>
          <Navigation
            getBookByTitle={this.getBookByTitle}
            value={this.state.searchInput}
            updateSearch={this.updateSearch} />
          { this.state.searchResult.length !== 0 && <SearchResultComponent searchResult={this.state.searchResult}/>}
          <Route
            exact path="/"
            render={(props) => <LogInComponent {...props } />}
          />
          <Route
            exact path="/userpage"
            render={(props) => <BookList {...props } books={this.state.reviewedBooks} />}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
