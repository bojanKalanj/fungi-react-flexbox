import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecies } from '../../../actions';

import Table from '../../../UI/Table/Table';
import Tr from '../../../UI/Table/Tr/Tr';
import Td from '../../../UI/Table/Td/Td';
import Th from '../../../UI/Table/Th/Th';
import {AnchorTag} from '../../../UI/AnchorTag/AnchorTag';
import Spinner from '../../../UI/Spinner/Spinner';

class Species extends Component {
    componentDidMount = () => {
        this.props.fetchSpecies();
    }

    render(){
        console.log(this.props.species)
        const loadSpecies = () => {
            if(this.props.species){
                return this.props.species.data.map(spcs => {
                    return <Tr key={spcs.id}>
                                <Td>
                                    <AnchorTag to="">
                                        { spcs.attributes.name }
                                    </AnchorTag>
                                </Td>
                                <Td>
                                    <AnchorTag to="">
                                        Species
                                    </AnchorTag>
                                </Td>
                                <Td>
                                    <AnchorTag to="">
                                        Species
                                    </AnchorTag>
                                </Td>
                            </Tr>
                })
            }
        }

        const showSpecies = () => {
            if(this.props.species){
                return <Table >
                            <Tr>
                                <Th>
                                    Vrsta
                                </Th>
                                <Th>
                                    Broj nalaza
                                </Th>
                                <Th>
                                    Poslednji nalaz
                                </Th>
                            </Tr>
                        { loadSpecies() }
                        </Table>
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
        species: state.species.data
    };
};

export default connect(mapStateToProps, { fetchSpecies })(Species);



