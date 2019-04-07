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
        itemsPerPage: 0,
        numberOfAllItems: 0
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

    render(){
        const { currentPage, numberOfAllItems, itemsPerPage } = this.state;
        const indexOfLastPage = Math.ceil(numberOfAllItems / itemsPerPage);
        // nisam siguran za ovo pozivanje funkcije koju sam dobio kroz props u render-u
        // this.props.getPaginationPageIndex(currentPage);
        
        console.log("numberOfAllItems", numberOfAllItems);
        console.log("indexOfLastPage", indexOfLastPage);

        return(
            <ul className="Pagination">
                {/* moguce je da ovo brdo koda ima neku gresku */}
                <li onClick={this.onClickLeftArrow}><FaAngleLeft /></li>
                {currentPage >= 3?<li onClick={(event) => this.onClickHandler(event)}>1</li>: null}
                {currentPage > 3? <li className="dots">...</li>: null}
                {/* {currentPage > 2? <li onClick={(event) => this.onClickHandler(event)}>{currentPage - 2}</li>: null} */}
                {currentPage > 1? <li onClick={(event) => this.onClickHandler(event)}>{currentPage - 1}</li>: null}
                <li className="current-page">{currentPage}</li>
                {currentPage !== indexOfLastPage && currentPage + 1 !== indexOfLastPage? <li onClick={(event) => this.onClickHandler(event)}>{currentPage + 1}</li>: null}
                {currentPage === 1 && indexOfLastPage !== 2? <li  onClick={(event) => this.onClickHandler(event)}>3</li>: null}
                {currentPage !== indexOfLastPage && currentPage !== indexOfLastPage - 1 && currentPage !== indexOfLastPage - 2? <li className="dots">...</li>: null}
                {currentPage !== indexOfLastPage && currentPage !== indexOfLastPage - 2? <li onClick={(event) => this.onClickHandler(event)}>{indexOfLastPage}</li>: null}
                <li onClick={this.onClickRightArrow}><FaAngleRight /></li>
            </ul>
        )
    }
}

export default Pagination;