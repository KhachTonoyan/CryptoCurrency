import React from "react";


const Select = ({perPage,handleChangeSelect}) => {
    return(<div>
                <select style={{backgroundColor:"inherit",color:"gray"}} value={perPage} onChange={handleChangeSelect}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>                
            </div>
        )
}
export default Select