import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'

import { Badge } from 'react-bootstrap';

const Todo = props => (
    
    <tr>
        <td >{props.todo.id}</td>
        <td ><p>{props.todo.name}</p></td>
        <td >{props.todo.description}</td>
        <td >{props.todo.category}</td>
        <td >{props.todo.language}</td>
        <td >{props.todo.country}</td>
        <td ><p><a href={props.todo.url}>Link</a></p></td>
        
        
    </tr>
)


export default class Sources extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:{},
            sourcesArray:[],
            Loading:true

        };
    }

    componentDidMount() {
        if(!localStorage.usertoken){
            this.props.history.push(`/login`)
            return
        }
        axios.get('http://newsapi.org/v2/sources?apiKey='+process.env.REACT_APP_API_KEY)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    sourcesArray:response.data.sources,
                    Loading:false
                });
                console.log(this.state.data.status)
                console.log(this.state.data.sourcesArray)
                
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.sourcesArray.map(function(currentSource, i){
            return <Todo todo={currentSource} key={i} />;
        })
    }

    render(){
        if(this.state.Loading){
            return(
                <div class="loader"></div>
            )
        }
        return(
            <div>
                <div className="container">
                    <div className="jumbotron mt-2">
                        <h1 className="text-center display-4">News Sources</h1>
                    </div>
                </div>
                
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Language</th>
                            <th>Country</th>
                            <th>Link</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}