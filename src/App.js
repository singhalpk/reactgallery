import React, { Component } from 'react';
import './App.css';
import data from './data.json';

const galleryContainer = document.querySelector('.react-gallery');
//const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/photos';

class Gallery extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      showModal: false,
      url: '',
      users: [],
    }
    
    this.openModal = this.openModal.bind(this);
    
    this.closeModal = this.closeModal.bind(this);
  }
 
  componentDidMount() {
    let { users } = this.state;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        return response.json();
        console.log("users");
      }).then(result => {
        this.setState({
          users:result
        });
        console.log(users);
      });
      
  }  
  render() {
    let {url} = this.state;
    return(
      <div refs='gallery-container' className='container-fluid gallery-container'>
        <div className='row'>
          {
            data.map((photos, index) => {
               return <div className='col-md-1 '>
                  <div className='gallery-card'>
                    <img className='gallery-thumbnail' src={photos.thumbnailUrl} alt={'Image number ' + (index + 1)} />
                    <span className='card-icon-open fa fa-expand' value={photos.url} onClick={(e) => this.openModal(photos.url, e)}></span>
                  </div>
                </div>
             })
           }
        </div>
         {this.state.showModal ? (
            <div isOpen={this.state.showModal} className='modal-overlay' onClick={this.closeModal} >
              <div className='modal-body'>
                <a className='modal-close' href='#' onClick={this.closeModal}><span className='fa fa-times'></span></a>
                <img src={this.state.url} />
              </div>
          </div>
      ) : (
        null
      )}
         
      </div>
    )
  }
  
  // Function for opening modal dialog
  openModal(url, e) {
    console.log("hiiii");
     this.setState({
       showModal: true,
       url: url
     })
   };

  // Function for closing modal dialog
  closeModal() {
    this.setState({
      showModal: false,
      url: ''
    })
  }
  
 }

//
export default Gallery;
