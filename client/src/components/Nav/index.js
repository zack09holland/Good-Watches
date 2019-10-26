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

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className={window.location.pathname === "/movieslist" ? "nav-link darkNav" : "nav-link darkNav"} caret>
                Movies
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/topratedmovies" >Top Rated Movies</DropdownItem>
                <DropdownItem disabled>Upcoming</DropdownItem>
                <DropdownItem href="/newreleases">Now Playing</DropdownItem>
                <DropdownItem disabled>Popular</DropdownItem>
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
