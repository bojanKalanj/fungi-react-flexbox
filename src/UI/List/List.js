import React from 'react';
import { Card, CardBody } from '../Card/Card';

import './List.css';

const List = (props) => {
    console.log(props.toList);

    const translate = (word) => {
        switch(word){
            case "number":
                return "broj nalaza"
            case "area":
                return "prostor"
            case "location":
                return "lokacija"
            case "longitude":
                return "nadmorska sirina"
            case "latitude":
                return "nadmorska duzina"
            case "altitude":
                return "nadmorska duzina"
            case "quantity":
                return "brojnost"
            case "explored_surface":
                return "istrazena povrsina"
            case "sample":
                return "uzorak"
            case "external_url":
                return "spoljni link"
            case "observed_at":
                return "nalaz uocen"
            case "created_at":
                return "nalaz dodat"
            default: return word
        }
    }

    const renderList = () => {
        let list =[];
        for(let li in props.toList){
            if(li !== 'description' && props.toList[li]){
                list.push(
                    <li>{translate(li)} :  <span className="pull-right">{props.toList[li]}</span> </li>
                )
            }
        }
        return list;    
    }

    return(
        <Card width={props.width}>
            <CardBody>
                <ul className="List">
                    {renderList()}
                </ul>
            </CardBody>
        </Card>
    )
}

export default List;



