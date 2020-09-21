import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Pirate = (props) => {

    const [pirate, setPirate] = useState(null);
    const [hasPegLeg, setHasPegLeg] = useState(false);
    const [hasEyePatch, setHasEyePatch] = useState(false);
    const [hasHookHand, setHasHookHand] = useState(false);

    useEffect(()=>{
        Axios.get('http://localhost:8000/api/pirates/' + props.id)
            .then(res => {
                setPirate(res.data);
                setHasPegLeg(res.data.hasPegLeg);
                setHasEyePatch(res.data.hasEyePatch);
                setHasHookHand(res.data.hasHookHand);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.id])

    function updateParameter(param){
        pirate[param] = !pirate[param];
        console.log(pirate);
        Axios.put('http://localhost:8000/api/pirates/'+props.id, pirate)
            .then(res => {
                setPirate(pirate);
                setHasPegLeg(pirate.hasPegLeg);
                setHasEyePatch(pirate.hasEyePatch);
                setHasHookHand(pirate.hasHookHand);
            })
            .catch(err =>{
                console.log(err);
            })
    }

    if(pirate === null) return <div>Loading...</div>;

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>{pirate.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <img src={pirate.image} alt="" style={{"height":"300px"}}/>
                    </div>
                    <div className="row">
                        <h2>"{pirate.catchPhrase}"</h2>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container border border-dark">
                        <div className="row justify-content-center">
                            <h2>About</h2>
                        </div>
                        <div className="row my-2">
                            <div className="col-4">
                                Position:
                            </div>
                            <div className="col-8">
                                {pirate.position}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4">
                                Treasures:
                            </div>
                            <div className="col-8">
                                {pirate.numChests}
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4">
                                Peg Leg:
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        {hasPegLeg ? "Yes" : "No"}
                                    </div>
                                    <div className="col">
                                        {hasPegLeg ? <button onClick={e => updateParameter("hasPegLeg")} className="btn btn-danger">No</button> : <button onClick={e => updateParameter("hasPegLeg")} className="btn btn-success">Yes</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4">
                                Eye Patch:
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        {hasEyePatch ? "Yes" : "No"}
                                    </div>
                                    <div className="col">
                                        {hasEyePatch ? <button onClick={e => updateParameter("hasEyePatch")} className="btn btn-danger">No</button> : <button onClick={e => updateParameter("hasEyePatch")} className="btn btn-success">Yes</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4">
                                Hook Hand:
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        {hasHookHand ? "Yes" : "No"}
                                    </div>
                                    <div className="col">
                                        {hasHookHand ? <button onClick={e => updateParameter("hasHookHand")} className="btn btn-danger">No</button> : <button onClick={e => updateParameter("hasHookHand")} className="btn btn-success">Yes</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Pirate;