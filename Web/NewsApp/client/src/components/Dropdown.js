import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'


export default class Dropdown extends Component{

    constructor(props) {
        super(props);
    }
    
    render(){
       
        return(
            <div>
<div class="selectWrapper">
<select  name='Category' value={this.props.parent.state.category} onChange={this.props.parent.handleChangeCategory}>
  <option name='business' value='business'>Business</option>
  <option name='entertainment' value='entertainment'>Entertainment</option>
  <option name='general' value='general'>general</option>
  <option name='health' value='health'>health</option>
  <option name='science' value='science'>science</option>
  <option name='sports' value='sports'>sports</option>
  <option name='technology' value='technology'>technology</option>
</select> 
</div>                

<div class="selectWrapper">
<select name='Country' value={this.props.parent.state.country} onChange={this.props.parent.handleChangeCountry}>
  <option  value='in'>in</option>
  <option  value='ar'>ar</option>
  <option  value='at'>at</option>
  <option  value='be'>be</option>
  <option  value='cz'>cz</option>
  <option  value='id'>id</option>
  <option  value='ma'>ma</option>
  <option  value='ru'>ru</option>
  <option  value='gr'>gr</option>
  <option  value='ma'>ma</option>
  <option  value='eg'>eg</option>
  <option  value='pl'>pl</option>
  <option  value='de'>de</option>
</select> 
</div>

            </div>
        )
    }
}