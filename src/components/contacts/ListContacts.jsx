import React, {useEffect, useState} from "react";
import {list} from '../../datasource/api-inventory.js';

const ListInventory = () => {
    const [inventoryList, SetInventoryList] = useState([]);

    const loadInventory =  () => {
        list()
        .then(() => {
            if (data) {
                SetInventoryList(data || []);
            }
        }).catch(err=>
            {
            alert(err.message);
            console.log(err);
            }
        );
    }

    useEffect(() => {
        loadInventory();
    }, []);//Control the execution 

    return (
        <div>
            <h2>Inventory List</h2>
                   <ul>           
                            {inventoryList.map((item) => (
                                <li key={item.id}>
                                    {item.firstName} - {item.lastName} - ${item.username}
                                </li>
                            ))}
                    </ul>
        </div>
    )

}

export default ListInventory;