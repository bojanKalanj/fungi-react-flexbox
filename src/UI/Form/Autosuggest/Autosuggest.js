import React, { Component } from 'react';
import './Autosuggest.css';

class Autosuggest extends Component{
    state = {
        showList: false,
        suggestions: [],
        selectedSuggestion: ''
    }
    allSuggestions = this.props.suggestions;

    getSuggestions = e => {
        let showList = true;
        const value = e.target.value;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const selectedSuggestion = value;

        let suggestions = inputLength === 0 ? [] : this.props.suggestions.filter(s =>
          s.toLowerCase().slice(0, inputLength) === inputValue
        );
        
        this.setState({ 
            suggestions,
            selectedSuggestion,
            showList
         });
    };

    selectValue = e => {
        let showList = false;
        console.log(e.currentTarget.innerText);
        const selectedSuggestion = e.currentTarget.innerText;
        this.setState({ 
            selectedSuggestion,
            showList
        });
    }

    renderSuggestionsList = suggestions => {
        return(
            this.state.showList? <ul>
                {suggestions.map(s => {
                        return (
                                <li 
                                    key={s}
                                    onClick={(e) => this.selectValue(e)}>{s}</li>
                            )
                })}
            </ul>: null
        )
    }

    render(){
        console.log(this.state.selectedSuggestion);
        return(
            <div className="Autosuggest">
                <label>{this.props.label}</label>
                <input 
                    value={this.state.selectedSuggestion}
                    onChange={(e) => this.getSuggestions(e)}>
                </input>
                { this.renderSuggestionsList(this.state.suggestions) }
            </div>
        )
    }
}

export default Autosuggest;