import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'
import Headlines from './Headlines';
import Search from './Search'

import { Form } from 'react-bootstrap';
import Header from './Header';




export default class Selection extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Loading:true,
            currentComponent:'Headlines',
            topic:'',
            search:'no'

        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        if(e.target.value===''){
            this.setState({
                topic: e.target.value,
                currentComponent:'Headlines',
                search:'no'
            })
        }
        else{
            this.setState({
                topic: e.target.value,
                search:'yes'
            })
        }
        console.log(this.state.topic)
        console.log(this.state.search)
    }

    componentDidMount() {
        if(!localStorage.usertoken){
            this.props.history.push(`/login`)
            return
        }
        axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey='+process.env.REACT_APP_API_KEY)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    articlesArray:response.data.articles,
                    Loading:false
                });
                
            })
            .catch(function (error){
                console.log(error);
            })
    }


    render(){
        if(this.state.Loading){
            return(
                <div class="loader"></div>
            )
        }
        else if(this.state.currentComponent==="Headlines"){
            console.log("... "+this.state.search)
            if(this.state.search==='no'){
                return(
                    <div>
                        
                        <br></br>
                        <Form>
                            <Form.Group>
                                <Form.Control name="topic" onChange={this.onChange} type="text" placeholder="Enter Topic" />
                            </Form.Group>
                        </Form>         
                        <Headlines/>
                    </div>
                    
                )
            }
            else{
                return(
                    <div>
                        
                        <br></br>
                        <Form>
                            <Form.Group>
                                <Form.Control name="topic" onChange={this.onChange} type="text" placeholder="Enter Topic" />
                            </Form.Group>
                        </Form>         
                        <Search query={this.state.topic}/>
                    </div>
                    
                )    
            }
            
        }
        
        
    }
}