import React, {useState, useEffect} from 'react';
import NonprofitDataService from '../../services/nonprofit.service';


function Resource(props) {
    const [data, setData] = useState([]);
    let nonprofit_id = props.location.pathname.split("/")[2];
    let resource_id = props.location.pathname.split("/")[4];

    useEffect(() => {
        NonprofitDataService.getResource(nonprofit_id, resource_id)
        .then( (response) => { 
            setData(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    let items = {name: "", desc: ""}
    for (let [index, value] of data.entries()) {
        items.name = value.resource_name.replace(/['"]+/g, '');
        items.desc = value.description.replace(/['"]+/g, '');
    }

    return (
        <div className="container">
            <h1> Resource </h1>
            <h3> Resource Name: </h3>
            <h4> <b> {items.name} </b> </h4>
            <h3> How to help: </h3>
            <h4> <b> {items.desc} </b> </h4>
        </div>
    )
}

export default Resource;