import React from 'react';
import { Link } from '@reach/router';
import Axios from 'axios';

const Home = (props) => {

    const {pirates, setPirates} = props;

    function deletePirate(id){
        Axios.delete('http://localhost:8000/api/pirates/'+id)
            .then(()=>{
                setPirates(pirates.filter((pirate)=>pirate._id !== id));
            })
            .catch(err => console.log(err));
    }

    return ( 
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1>Pirate Crew</h1>
                </div>
                <div className="col-3">
                    <Link to="/pirates/new" className="btn btn-primary">Add Pirate</Link>
                </div>
            </div>
            {
                pirates.map(pirate =>
                    <div key={pirate._id} className="row my-5">
                        <div className="col">
                            <div className="container border border-dark">
                                <div className="row m-2">
                                    <div className="col-3">
                                        <img src={pirate.image} alt="" style={{"width": "150px", "height": "150px"}}/>
                                    </div>
                                    <div className="col">
                                        <div className="row justify-content-center">
                                            <h2>{pirate.name}</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 text-right">
                                                <Link to={"/pirates/"+pirate._id} className="btn btn-primary">View Pirate</Link>
                                            </div>
                                            <div className="col-6 text-left">
                                                <button onClick={() => deletePirate(pirate._id)} className="btn btn-danger">Walk the Plank</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
     );
}
 
export default Home;