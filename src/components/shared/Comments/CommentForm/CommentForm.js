import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnchorTag } from '../../../../UI/AnchorTag/AnchorTag';
import './CommentForm.css';
import '../../../../UI/Button/Button.css'

class CommentForm extends Component {
    state = {
        fieldValue: ''
    }
    
    onChange = e => {
        let fieldValue = e.target.value;
        this.setState({
            fieldValue
        })
    }

    onSendComment = () => {
        console.log(this.state.fieldValue);
        console.log(this.props.userID)
    }

    renderForm = () => {
        if(this.props.isAuthenticated){
            return <div className="CommentForm">
                        <textarea 
                            rows="7" 
                            type="textarea"
                            value={this.state.fieldValue}
                            placeholder="Unesite vaš komentar..."
                            onChange={(e) => this.onChange(e)}
                        />
                        <button 
                            className="Button" 
                            onClick={this.onSendComment}>
                            Pošalji komentar
                        </button>
                    </div>
        }else{
            return <div className="CommentForm">
                        <p>Morate biti prijavljeni da biste ostavili komentar. <span> <AnchorTag to="/login">Prijavi se.</AnchorTag> </span></p>
                    </div>
        }
    }

    render(){
        return(
            <div>
                { this.renderForm() }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        // userID: state.auth.userID,
        userID: state.auth.userID,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(CommentForm);