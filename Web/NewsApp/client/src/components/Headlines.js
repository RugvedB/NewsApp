import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './Loading.css'

import Dropdown from './Dropdown'
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


export default class Headlines extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:{},
            articlesArray:[],
            Loading:true,
            country:'in',
            category:'general'

        };
        
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        
    }

    
    handleChangeCategory(event) {
        this.setState({category: event.target.value});
        console.log('http://newsapi.org/v2/top-headlines?country='+this.state.country+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+event.target.value)
        axios.get('http://newsapi.org/v2/top-headlines?country='+this.state.country+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+event.target.value)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    articlesArray:response.data.articles,
                    Loading:false
                });
                console.log(this.state.data.status)
                console.log(this.state.data.totalResults)
                console.log(this.state.articlesArray.length)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    handleChangeCountry(event) {
        this.setState({country: event.target.value});
        console.log('http://newsapi.org/v2/top-headlines?country='+event.target.value+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+this.state.category)
        axios.get('http://newsapi.org/v2/top-headlines?country='+event.target.value+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+this.state.category)
            .then(response => {
                this.setState({ 
                    data: response.data ,
                    articlesArray:response.data.articles,
                    Loading:false
                });
                console.log(this.state.data.status)
                console.log(this.state.data.totalResults)
                console.log(this.state.articlesArray.length)
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
        console.log('http://newsapi.org/v2/top-headlines?country='+this.state.country+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+this.state.category)
        axios.get('http://newsapi.org/v2/top-headlines?country='+this.state.country+'&apiKey='+process.env.REACT_APP_API_KEY+'&category='+this.state.category)
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
        if(this.state.Loading){
            return(
                <div class="loader"></div>
            )
        }
        return(
            <div>
                
                <Header head="Top Headlines"/>
                <Dropdown parent={this}/>
                

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