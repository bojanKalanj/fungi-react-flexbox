import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecies, paginateSpecies } from '../../../actions';

import Table from '../../../UI/Table/Table';
import Tr from '../../../UI/Table/Tr/Tr';
import Td from '../../../UI/Table/Td/Td';
import Th from '../../../UI/Table/Th/Th';
import {AnchorTag} from '../../../UI/AnchorTag/AnchorTag';
import Spinner from '../../../UI/Spinner/Spinner';
import Pagination from '../../shared/Pagination/Pagination';

class Species extends Component {
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.paginateSpecies(1);
    }

    renderPagination = () => {
        if(this.props.species){
            return <Pagination 
                    itemsPerPage={50} 
                    numberOfAllItems={this.props.species.data.length}
                    getPaginationPageIndex={this.getPaginationPageIndex}/>
        }else{
            return null
        }
    }
    
    getPaginationPageIndex = index => {
        this.props.paginateSpecies(index);
    }

    render(){
        if(this.props.state.paginateSpecies.species){
            console.log(this.props.state.paginateSpecies.species.data)
        }
        let loading = this.props.loading;

        const loadSpecies = () => {
            if(this.props.state.paginateSpecies.species){
                return this.props.state.paginateSpecies.species.data.map(spcs => {
                    return <Tr key={spcs.id}>
                                <Td>
                                    <AnchorTag to="">
                                        { spcs.attributes.name }
                                    </AnchorTag>
                                </Td>
                                <Td>
                                    <p>
                                        { spcs.relationships.observations.data.length }
                                    </p>
                                </Td>
                                {/* <Td>
                                    {spcs.relationships.observations.data? <AnchorTag to="">
                                        {spcs.relationships.observations.data[0]}
                                    </AnchorTag>: '-'}
                                </Td> */}
                            </Tr>
                })
            }
        }

        const showSpecies = () => {
            if(!loading){
                return <div>
                    { this.renderPagination() }
                        <Table >
                            <Tr>
                                <Th>
                                    Vrsta
                                </Th>
                                <Th>
                                    Broj nalaza
                                </Th>
                                {/* <Th>
                                    Poslednji nalaz
                                </Th> */}
                            </Tr>
                        { loadSpecies() }
                        </Table>
                </div>
            }else{
                return <Spinner />
            }
        }
        return(
            <div>
                { showSpecies() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        species: state.species.data,
        loading: state.species.loading
    };
};

export default connect(mapStateToProps, { fetchSpecies, paginateSpecies })(Species);



