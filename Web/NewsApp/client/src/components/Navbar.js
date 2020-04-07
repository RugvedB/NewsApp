import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
    logOut(e) {
      e.preventDefault()
      localStorage.removeItem('usertoken')
      this.props.history.push(`/`)
    }
  
    render() {
      const loginRegLink = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      )
  
      const userLink = (
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <Link to="/profile" className="nav-link">
              User
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/createPost" className="nav-link">
              CreatePost
            </Link>
          </li> */}
          
          {/* <li className="nav-item">
            <a href="" onClick={this.logOut.bind(this)} className="nav-link">
              Logout
            </a>
          </li> */}
        </ul>
      )
  
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample10"
            aria-controls="navbarsExample10"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>


          {/* LEFT SIDE NAV ITEMS */}
          <div
            className="collapse navbar-collapse justify-content-md-left"
            id="navbarsExample10"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              </ul>

              {localStorage.usertoken &&
              <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>


            <li className="nav-item">
              <Link to="/Headlines" className="nav-link">
                Headlines
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Selection" className="nav-link">
                Selection
              </Link>
            </li>  
            <li className="nav-item">
              <Link to="/Sources" className="nav-link">
                Sources
              </Link>
            </li>
            </ul>
            }

            
            
            
          </div>
          
          
          {/* RIGHT RIDE NAV ITEMS */}
          <div
            className="collapse navbar-collapse justify-content-md-end"
            id="navbarsExample10"
          >
            {/* {localStorage.usertoken ? userLink : loginRegLink} */}
            {!localStorage.usertoken && 
              <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
            }
            {localStorage.usertoken && 
            <ul className="navbar-nav">
               <li className="nav-item">
                  <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                    Logout
                  </a>
              </li>
            </ul>
            }
          </div>
        </nav>
      )
    }
  }
  
  export default withRouter(Landing)







