import React, { Component } from 'react';
import './Autosuggest.css';
import onClickOutside from "react-onclickoutside";

class Autosuggest extends Component{
    state = {
        showList: false,
        suggestions: [],
        selectedSuggestion: '',
        onKeyDown: 0
    }
    allSuggestions = this.props.suggestions;

    getSuggestions = e => {
        const value = e.target.value;
        let showList = true;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const selectedSuggestion = value;
        let suggestions = [];

         if(value.length > 1){
            suggestions = inputLength === 0 ? [] : this.props.suggestions.filter(s =>
                s.toLowerCase().slice(0, inputLength) === inputValue || s.toLowerCase().split(/\s+/)[1].slice(0, inputLength) === inputValue
            );
         }
         this.setState({ 
            suggestions,
            selectedSuggestion,
            showList
        });
    };

    handleClickOutside = evt => {
        this.setState({ showList: false })
    };

    selectValue = e => {
        let showList = false;
        const selectedSuggestion = e.currentTarget.innerText;
        this.setState({ 
            selectedSuggestion,
            showList
        });
        // console.log(this.props.suggestions);
        this.props.onSelectValue(selectedSuggestion);
    }

    renderSuggestionsList = suggestions => {
        return(
            this.state.showList? <ul>
                {suggestions.map(s => {
                    return (
                        <li 
                            key={s}
                            onClick={(e) => this.selectValue(e)}>{s}
                        </li>
                        )
                })}
            </ul>: null
        )
    }

    onKeyDown = e => {
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
    }

    render(){
        return(
            <div className="Autosuggest">
                <label>{this.props.label}</label>
                <input 
                    value={this.state.selectedSuggestion}
                    onChange={(e) => this.getSuggestions(e)}
                    onKeyDown={(e) => this.onKeyDown(e)}
                    placeholder={this.props.placeholder}>
                </input>
                { this.renderSuggestionsList(this.state.suggestions) }
            </div>
        )
    }
}

export default onClickOutside(Autosuggest);