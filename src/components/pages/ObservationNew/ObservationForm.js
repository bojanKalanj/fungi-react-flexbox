import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ObservationFormFirstPage from './ObservationFormFirstPage'
import ObservationFormSecondPage from './ObservationFormSecondPage'
import ObservationFormThirdPage from './ObservationFormThirdPage'

class ObservationForm extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
          page: 1
        }
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }
    
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        const { onSubmit } = this.props
        const { page } = this.state
        return (
            <div>
                {page === 1 && <ObservationFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 && (
                    <ObservationFormSecondPage
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <ObservationFormThirdPage
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
        );
    }
}

ObservationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
  
export default ObservationForm;