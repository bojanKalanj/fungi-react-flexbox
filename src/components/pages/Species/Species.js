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
        const loadSpecies = () => {
            if(this.props.state.species.data){
                return this.props.state.species.data.map(spcs => {
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
            if(this.props.state.species.data){
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
        state: state
    };
};

export default connect(mapStateToProps, { fetchSpecies })(Species);



