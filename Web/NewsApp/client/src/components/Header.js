import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'




export default class Header extends Component{

    constructor(props) {
        super(props);
        
    }

   
   
    render(){
        
        return(
            <div className="container">
                <br></br>
                    <div className="jumbotron mt-2">
                        <h1 className="text-center display-4">{this.props.head}</h1>
                    </div>
            </div>
        )
    }
}