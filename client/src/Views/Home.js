import React from 'react';
import { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import Axios from 'axios';

const Home = (props) => {

    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);

    //Handle the search
    function handleSubmit(e){
        e.preventDefault();
        console.log("Submit clicked");
    }

    //Get new autocomplete options
    function onChangeHandler(e){
        setValue(e.target.value);
        Axios.post('http://localhost:8000/api/data/suggestions', {search: e.target.value})
            .then(result =>{
                setItems(result.data);
            })
            .catch(err =>{
                console.log(err);
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row my-3">
                    <Autocomplete
                        className="col-8"
                        getItemValue={(item) => item.name}
                        items={items}
                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.name}
                            </div>
                        }
                        value={value}
                        onChange={(e) => onChangeHandler(e)}
                        onSelect={(val) => setValue(val)}
                    />
                    <button className="col-2 btn btn-primary" type="submit">Search</button>
                </div>
            </form>
        </div> 
        
        
        

     );
}
 
export default Home;