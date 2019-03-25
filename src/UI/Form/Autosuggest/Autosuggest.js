import React, { Component } from 'react';
import './Autosuggest.css';

class Autosuggest extends Component{
    state = {
        showList: false,
        suggestions: [],
        selectedSuggestion: '',
        onKeyDown: 0
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

    onKeyDown = e => {
        // console.log(e.keyCode);
        const suggestions = [ ...this.state.suggestions ];
        let selectedSuggestion = this.state.selectedSuggestion;
        let onKeyDown = this.state.onKeyDown;
        if(e.keyCode === 40){
            if(onKeyDown === suggestions.length -1){
                onKeyDown = 0
            }
            this.setState((prevState, props) => {
                return { onKeyDown: onKeyDown + 1 }
            });
            console.log(onKeyDown);
            selectedSuggestion = suggestions[onKeyDown];
        }

        if(e.keyCode === 38){
            if(onKeyDown === 0){
                onKeyDown = suggestions.length -1;
            }
            this.setState((prevState, props) => {
                return { onKeyDown: onKeyDown - 1 }
            });
            console.log(onKeyDown);
            selectedSuggestion = suggestions[onKeyDown];
        }

        if (e.keyCode === 13) {
            this.setState({
                selectedSuggestion,
                showList: false
            });
          }
        this.setState({ selectedSuggestion })
        console.log(selectedSuggestion);
    }

    render(){
        console.log(this.state.selectedSuggestion);
        return(
            <div className="Autosuggest">
                <label>{this.props.label}</label>
                <input 
                    value={this.state.selectedSuggestion}
                    onChange={(e) => this.getSuggestions(e)}
                    onKeyDown={(e) => this.onKeyDown(e)}>
                </input>
                { this.renderSuggestionsList(this.state.suggestions) }
            </div>
        )
    }
}

export default Autosuggest;