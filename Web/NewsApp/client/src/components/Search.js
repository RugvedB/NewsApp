import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'


import Header from './Header';

const Todo = props => (
    
    <tr>
        <td >{props.todo.source.name}</td>
        <td ><p>{props.todo.author}</p> Published at<p>{props.todo.publishedAt}</p></td>
        <td >{props.todo.title}</td>
        <td >{props.todo.description}</td>
        <td ><p><a href={props.todo.url}>Link</a></p><p><a href={props.todo.urlToImage}>Image Link</a></p></td>
        
        
    </tr>
)


export default class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:{},
            articlesArray:[],
            Loading:true,
            topic:this.props.query

        };
    }
    componentWillReceiveProps({query}) {
        console.log("query "+query)
        
        axios.get('http://newsapi.org/v2/everything?q='+query+'&apiKey='+process.env.REACT_APP_API_KEY)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    articlesArray:response.data.articles,
                    Loading:false,
                    topic:query
                });
                console.log(this.state.data.status)
                console.log(this.state.data.totalResults)
                console.log(this.state.articlesArray)
            })
            .catch(function (error){
                console.log(error);
            })
      }

    componentDidMount() {
        if(!localStorage.usertoken){
            this.props.history.push(`/login`)
            return
        }
        axios.get('http://newsapi.org/v2/everything?q='+this.state.topic+'&apiKey='+process.env.REACT_APP_API_KEY)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    articlesArray:response.data.articles,
                    Loading:false
                });
                console.log(this.state.data.status)
                console.log(this.state.data.totalResults)
                console.log(this.state.articlesArray)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.articlesArray.map(function(currentArticle, i){
            return <Todo todo={currentArticle} key={i} />;
        })
    }

    render(){
        return(
            <div>
                <Header head="Search by Topic"/>
                
                
                
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Source</th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Details</th>
                            
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