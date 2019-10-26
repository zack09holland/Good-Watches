import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Nav extends Component {
  
  state = {
    open: false,
    width: window.innerWidth
  };
  constructor(props) {
    super(props);

    this.movietoggle = this.movietoggle.bind(this);
    this.tvtoggle = this.tvtoggle.bind(this);
    this.state = {
      moviedropdownOpen: false,
      tvdropdownOpen: false,
    };
  }

  movietoggle() {
    this.setState({
      moviedropdownOpen: !this.state.moviedropdownOpen
    });
  }
  tvtoggle() {
    this.setState({
      tvdropdownOpen: !this.state.tvdropdownOpen
    });
  }
  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-nav">
        <Link className="navbar-brand" to="/">
        <img
          src="https://fontmeme.com/permalink/191022/ea8e263e233874ad20ea13d3e7c074d0.png"
          width="160"
          height="60"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        </Link>

       
        <button
          onClick={this.toggleNav}
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                Search
              </Link>
            </li>
            {/* Movies */}
            <Dropdown isOpen={this.state.moviedropdownOpen} toggle={this.movietoggle}>
              <DropdownToggle className={window.location.pathname === "/topratedmovies" ? "nav-link darkNav" : "nav-link darkNav"} caret>
                Movies
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/topratedmovies" >Top Rated Movies</DropdownItem>
                <DropdownItem href="/upcoming">Upcoming</DropdownItem>
                <DropdownItem href="/popular">Popular</DropdownItem>
                <DropdownItem href="/nowplaying">Now Playing</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* TV Shows */}
            <Dropdown isOpen={this.state.tvdropdownOpen} toggle={this.tvtoggle}>
              <DropdownToggle className={window.location.pathname === "/movieslist" ? "nav-link darkNav" : "nav-link darkNav"} caret>
                TV
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/latestshows" >Latest TV Shows</DropdownItem>
                <DropdownItem href="/ontheair">TV Shows On The Air</DropdownItem>
                <DropdownItem href="/populartv">Popular TV Shows</DropdownItem>
                <DropdownItem href="/topratedtv">Top Rated TV Shows</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                to="/saved"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
