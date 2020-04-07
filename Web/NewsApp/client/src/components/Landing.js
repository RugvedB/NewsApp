import React, { Component } from 'react'


class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center display-4">Welcome to NewsApp</h1>
            <br></br>
            <h3>The whole pupose of this project was to learn :</h3>
            
        <div>
          <br></br>
        <ul>
            <li>MERN</li>
            <li>jsonwebtoken</li>
            <li>Storing token on client side and using it</li>
            <li>Working with API</li>
            <li>Using same apis for android and web interface.</li>
            <li>Comparing performance</li>
            <li>And ofcourse ...to get news</li>
        </ul>
        </div>
    
          </div>
        </div>
      </div>
    )
  }
}

export default Landing