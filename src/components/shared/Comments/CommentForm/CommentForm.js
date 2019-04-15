import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnchorTag } from '../../../../UI/AnchorTag/AnchorTag';
import './CommentForm.css';
import '../../../../UI/Button/Button.css';
import * as actions from '../../../../actions';
// import { Redirect } from 'react-router-dom'

class CommentForm extends Component {
    state = {
        fieldValue: '',
        redirect: false
    }
    
    onChange = e => {
        let fieldValue = e.target.value;
        this.setState({
            fieldValue
        })
    }

    onSendComment = () => {
        const { observationId } = this.props;
        const { userID } = this.props;
        const body = this.state.fieldValue;
        // const redirect = true;
        // this.setState({
        //     redirect
        // })

        const comment = {
                 observation_id: observationId, 
                 user_id: userID, 
                 body: body 
                }

        this.props.newComment(comment, this.props.currentUserToken, observationId);
        // window.location.reload();
        const fieldValue = '';
        this.setState({
            fieldValue
        })
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
                        <p>
                            Morate biti prijavljeni da biste ostavili komentar. 
                            <span> 
                                <AnchorTag to="/login">
                                    Prijavi se.
                                </AnchorTag> 
                            </span>
                        </p>
                    </div>
        }
    }

    render(){
        console.log(this.props);
        return(
            <div>
                { this.renderForm() }
                {/* {this.state.redirect? <Redirect to={`/observation/${this.props.observationId}`} />: null} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // state: state,
        // userID: state.auth.userID,
        userID: state.auth.userID,
        currentUserToken: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, { newComment: actions.newComment })(CommentForm);