import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import Axios from 'axios';

const Create = (props) => {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [numChests, setNumChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [position, setPosition] = useState("Captain");
    const [hasPegLeg, setHasPegLeg] = useState(true);
    const [hasEyePatch, setHasEyePatch] = useState(true);
    const [hasHookHand, setHasHookHand] = useState(true);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() =>{
        if(name.length > 0 && image.length>0 && numChests>=0 && catchPhrase.length > 0 && position.length>0) setButtonEnabled(true);
        else setButtonEnabled(false);
    }, [name, image, numChests, catchPhrase, position])

    function handleSubmit(e){
        e.preventDefault();
        const newPirate = {
            name,
            image,
            numChests,
            catchPhrase,
            position,
            hasPegLeg,
            hasEyePatch,
            hasHookHand
        }

        Axios.post('http://localhost:8000/api/pirates', newPirate)
            .then(res =>{
                console.log(res.data);
                navigate('/pirates/'+res.data._id);
            })
            .catch(err =>{
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    }

    return ( 
        <div className="container">
            <div className="row justify-content-between">
            <div className="col-3"></div>
            <div className="col-6">
                <h1>Add Pirate</h1>
            </div>
            <div className="col-3">
                <Link to="/pirates" className="btn btn-primary">Crew Board</Link>
            </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-6">
                <div className="row my-2">
                    Pirate Name:
                </div>
                <div className="row my-2">
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors && (
                                <span className="text-danger">
                                {errors?.name?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    Image Url:
                </div>
                <div className="row my-2">
                    <input required type="text" value={image} onChange={e => setImage(e.target.value)} />
                    {errors && (
                                <span className="text-danger">
                                {errors?.image?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    # of Treasure Chests:
                </div>
                <div className="row my-2">
                    <input required type="number" value={numChests} onChange={e => setNumChests(e.target.value)} />
                    {errors && (
                                <span className="text-danger">
                                {errors?.numChests?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    Pirate Catch Phrase:
                </div>
                <div className="row my-2">
                    <input required type="text" value={catchPhrase} onChange={e => setCatchPhrase(e.target.value)} />
                    {errors && (
                                <span className="text-danger">
                                {errors?.catchPhrase?.properties?.message}
                                </span>
                            )}
                </div>
                </div>
                <div className="col-6">
                <div className="row">
                    Crew Position:
                </div>
                <div className="row my-2">
                    <select required value={position} onChange={e => setPosition(e.target.value)}>
                        <option value="Captain">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                    {errors && (
                                <span className="text-danger">
                                {errors?.position?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    <input type="checkbox" name="hasPegLeg" id="" value={hasPegLeg} onSelect={e => setHasPegLeg(e.target.value)} />
                    <label>Peg Leg</label>
                    {errors && (
                                <span className="text-danger">
                                {errors?.hasPegLeg?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    <input type="checkbox" name="hasEyePatch" id="" value={hasEyePatch} onSelect={e => setHasEyePatch(e.target.value)} />
                    <label>Eye Patch</label>
                    {errors && (
                                <span className="text-danger">
                                {errors?.hasEyePatch?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    <input type="checkbox" name="hasHookHand" id="" value={hasHookHand} onSelect={e => setHasHookHand(e.target.value)} />
                    <label>Hook Hand</label>
                    {errors && (
                                <span className="text-danger">
                                {errors?.hasHookHand?.properties?.message}
                                </span>
                            )}
                </div>
                <div className="row my-2">
                    {
                        buttonEnabled ? 
                        <button className="btn btn-primary" type="submit">Add Pirate</button>
                        :
                        <button disabled className="btn btn-primary" type="submit">Add Pirate</button>
                    }
                </div>
                </div>
            </div>
            </form>
        </div>
     );
}
 
export default Create;