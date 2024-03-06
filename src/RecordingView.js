import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function RecordingView({
  country,
  species,
  foundBird,
  index,
  loading,
  nextRecording,
  nextSpecies,
  updateBird
}) {

  const [newCountry, setNewCountry] = useState("")

  const updateCountry = () => {
    if (newCountry !== "") {
      updateBird(newCountry)
    }
  }

  return (
    <div className="recording-view">
      <h1 className="pb-5 text-center">Find bird / insect noises from around the world!</h1>
            <div className="row">
          <div className="col">
            <h1>{country}</h1>
              {!foundBird ? <h2>Sorry, there are no recordings from this country</h2> : <div></div>}
              {species.length === 0 && !loading && foundBird ? <h1>Click on a country to hear bird / insect sounds from it!</h1> : <div></div>}
              {species.length !== 0 ? <audio controls autoPlay src={species[index]['url']}></audio> : <div></div>}
          </div>
          <div className="col">
            {species.length !== 0 ? <p><strong>Bird Name:</strong> {species[index]['en']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Location:</strong> {species[index]['loc']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Genus:</strong> {species[index]['gen']} </p> :<div></div>}
          </div>
          <div className="col">
            {species.length !== 0 ? <p><strong>Species:</strong> {species[index]['sp']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Noise Type:</strong> {species[index]['type']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Sound capture method:</strong> {species[index]['method']} </p> :<div></div>}
          </div>
          <div className="col">
            {species.length !== 0 ? <p><strong>Time of recording:</strong> {species[index]['time']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Date of recording:</strong> {species[index]['date']} </p> :<div></div>}
            {species.length !== 0 ? <p><strong>Recorder:</strong> {species[index]['rec']} </p> :<div></div>}
          </div>
            <TailSpin
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="1"
                  visible={loading} />
        </div>

      <div className="d-flex justify-content-between">
        <div className="d-flex col-lg-4">
            <input onChange={event => setNewCountry(event.target.value)} type="text" placeholder="Type in a country name (Optional)" className="form-control country-form" />
            <button onClick={updateCountry} className="btn enter-btn btn-outline-primary">Enter</button>
          
        </div>
        <div className="col-lg-4">
          {species.length !== 0 && (
            <button className="btn next-btn btn-secondary" onClick={nextRecording}>
              Next Recording
            </button>
          )}
          {species.length !== 0 && (
            <button className="btn next-btn btn-secondary" onClick={nextSpecies}>
              Next Species
            </button>
          )}
        </div>
        <div className="col-md-3 col-lg-3">

        </div>
      </div>
    </div>
  );
}
