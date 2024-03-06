import MapChart from "./MapChart";
import { useEffect, useState } from "react";
import RecordingView from "./RecordingView";
import "./App.css";
import Spacer from "./Spacer";

function App() {
  const [country, setCountry] = useState('')
  const [foundBird, setFoundBird] = useState(true)
  const [species, setSpecies] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    updateBird("United States")
  }, [])

  const nextRecording = () => {
    if (index === species.length - 1) {
      setIndex(0)
    } else {
      setIndex(prev => prev + 1)
    }
  }

  const nextSpecies = () => {
    const curr = species[index]['sp']
    let found = false
    for (let i = index; i < species.length; i++) {
      if (species[i]['sp'] !== curr) {
        setIndex(i)
        found = true
        break;
      }
    }
    if (!found) {
      setIndex(0)
    }
  }

  const updateBird  = async (name) => {
    setCountry(name)
    setLoading(true)
    setFoundBird(true)
    setSpecies([])
    console.log(`https://xeno-canto.org/api/2/recordings?query=cnt:\"${name}\"`)
    const response = await fetch(`https://xeno-canto.org/api/2/recordings?query=cnt:\"${name}\"`)
    const data = await response.json()
    let temp_species = []
    if (data['numRecordings'] > 0) {
      setFoundBird(true)
      for (const recording of data['recordings']) {
        const id = recording['sono']['full'].split("/")[5]
        const file_name = recording['file-name']
        const url = `https://xeno-canto.org/sounds/uploaded/${id}/${file_name}`
        temp_species.push({
          ...recording,
          url: url
        })
      }
      setSpecies(temp_species)
    } else {
      setFoundBird(false)
    }
    setLoading(false)
  }
  return (
    <div>
    <RecordingView 
        country={country} 
        species={species}
        foundBird={foundBird}
        index={index}
        loading={loading}
        nextRecording={nextRecording}
        nextSpecies={nextSpecies}
        updateBird={updateBird}
        />
        <Spacer />
    <MapChart birdObj={species[index]} onClick={(name) => updateBird(name)}/>
    </div>
  );
}

export default App;
