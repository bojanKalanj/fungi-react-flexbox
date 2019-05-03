import React from 'react';
import moment from 'moment';

import './List.css';

const List = (props) => {
    console.log(props.toList);

    const translate = (word) => {
        switch(word){
            case "number":
                return "broj nalaza"
            case "area":
                return "područje"
            case "location":
                return "lokacija"
            case "longitude":
                return "geografska dužina"
            case "latitude":
                return "geografska širina"
            case "altitude":
                return "nadmorska visina"
            case "quantity":
                return "brojnost"
            case "explored_surface":
                return "istražena površina"
            case "sample":
                return "postoji uzorak"
            case "external_url":
                return "spoljni link"
            case "species_name":
                return "vrsta"
            case "legator_username":
                return "legator"
            default: return word
        }
    }

    const renderList = () => {
        let list =[];
        for(let li in props.toList){
            if(li !== 'description' && li !== 'observed_at' && li !== 'created_at' && li !== 'images' && props.toList[li]){
                list.push(
                    <li key={li}>{translate(li)}:  <span className="pull-right">{props.toList[li]}</span> </li>
                )
            }
        }
        list.push(<li key="observed_at">nalaz uočen:  <span className="pull-right">{moment(props.toList['observed_at']).format("DD-MMM-YYYY")}</span> </li>);
        list.push(<li key="created_at">nalaz dodat:  <span className="pull-right">{moment(props.toList['created_at']).format("DD-MMM-YYYY")}</span> </li>);
        return list;    
    }

    return(
        // <Card width={props.width}>
            // <CardBody>
                <ul style={{width: `${props.width}`}} className="List">
                    {renderList()}
                </ul>
            // </CardBody>
        // </Card>
    )
}

export default List;



