import React, { Component } from 'react';
import './Pagination.css';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

class Pagination extends Component{
    componentDidMount = () => {
        const { itemsPerPage, numberOfAllItems } = this.props;
        this.setState({ 
            itemsPerPage,
            numberOfAllItems
         })
    }

    state = {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfAllItems: 333
    }

    onClickHandler = (event) => {
        const currentPage = Number(event.target.innerText);
        this.setState({ currentPage })
        this.props.getPaginationPageIndex(currentPage);
    }

    onClickLeftArrow = () => {
        let currentPage = this.state.currentPage;
        currentPage = currentPage -1;
        if(currentPage < 1){
            currentPage = 1
        }
        this.setState({ currentPage });
        this.props.getPaginationPageIndex(currentPage);
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
        this.props.getPaginationPageIndex(currentPage);
    }

    render(){
        const { currentPage, numberOfAllItems, itemsPerPage } = this.state;
        const indexOfLastPage = Math.ceil(numberOfAllItems / itemsPerPage);

        return(
            <ul className="Pagination">
                <li onClick={this.onClickLeftArrow}><FaAngleLeft /></li>
                {currentPage >= 3?<li onClick={(event) => this.onClickHandler(event)}>1</li>: null}
                {currentPage > 5? <li className="dots">...</li>: null}
                {currentPage - 3 > 1 ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage - 3 }</li>: null}
                {currentPage - 2 > 1 ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage - 2 }</li>: null}
                {currentPage - 1 >= 1 ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage - 1 }</li>: null}
                <li className="current-page">{currentPage}</li>
                {currentPage + 1 < indexOfLastPage ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage + 1 }</li>: null}
                {currentPage + 2 < indexOfLastPage ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage + 2 }</li>: null}
                {currentPage + 3 < indexOfLastPage ?<li onClick={(event) => this.onClickHandler(event)}>{ currentPage + 3 }</li>: null}
                {indexOfLastPage - currentPage > 4? <li className="dots">...</li>: null}
                {currentPage !== indexOfLastPage? <li onClick={(event) => this.onClickHandler(event)}>{indexOfLastPage}</li>: null}
                <li onClick={this.onClickRightArrow}><FaAngleRight /></li>

            </ul>
        )
    }
}

export default Pagination;