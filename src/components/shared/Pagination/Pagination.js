import React, { Component } from 'react';
import './Pagination.css';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

class Pagination extends Component{
    state = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfAllItems: 1001
    }

    onClickHandler = (event) => {
        const currentPage = Number(event.target.innerText);
        this.setState({ currentPage })
    }

    onClickLeftArrow = () => {
        let currentPage = this.state.currentPage;
        currentPage = currentPage -1;
        if(currentPage < 0){
            currentPage = 0
        }
        this.setState({ currentPage });
    }

    onClickRightArrow = () => {
        let currentPage = this.state.currentPage;
        const { numberOfAllItems, itemsPerPage } = this.state;
        const indexOfLastPage = Math.ceil(numberOfAllItems / itemsPerPage);

        currentPage = currentPage + 1;
        if(currentPage > indexOfLastPage){
            currentPage = indexOfLastPage
        }
        this.setState({ currentPage });
    }

    onClickFirstPage = () => {
        this.setState({ currentPage: 1 })
    }

    render(){
        const { currentPage, numberOfAllItems, itemsPerPage } = this.state;
        const indexOfLastPage = Math.ceil(numberOfAllItems / itemsPerPage);
        
        console.log(currentPage)
        return(
            <ul className="Pagination">
                {currentPage > 3?<li onClick={this.onClickFirstPage}>Prva stranica</li>: null}
                <li onClick={this.onClickLeftArrow}><FaAngleLeft /></li>
                {currentPage === indexOfLastPage? <li onClick={(event) => this.onClickHandler(event)}>{ indexOfLastPage - 2 }</li>: null}
                {currentPage > 1? <li onClick={(event) => this.onClickHandler(event)}>{ currentPage - 1 }</li>: null}
                <li className="current-page" onClick={(event) => this.onClickHandler(event)}>{ currentPage }</li>
                {currentPage < indexOfLastPage && currentPage !== indexOfLastPage - 1? <li onClick={(event) => this.onClickHandler(event)}>{ currentPage !== numberOfAllItems? currentPage + 1: null }</li>: null}
                {currentPage === 1? <li onClick={(event) => this.onClickHandler(event)}>3</li>: null}
                {currentPage !== indexOfLastPage && currentPage !== indexOfLastPage - 1? <li className="dots">...</li>: null}
                {currentPage !== indexOfLastPage ? <li className="last-page" onClick={(event) => this.onClickHandler(event)}>{indexOfLastPage}</li>: null}
                <li onClick={this.onClickRightArrow}><FaAngleRight /></li>
            </ul>
        )
    }
}

export default Pagination;