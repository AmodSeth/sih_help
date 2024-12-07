import React,{useState,useEffect} from 'react'
import axios from 'axios';

function Test_component() {
    const [param1, setParam1] = useState('task');
    const [param2, setParam2] = useState('simple');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        const fetchData = async()=>{
           try {
            const response = await axios.get(`http://localhost:6967/predict?param1=${param1}&param2=${param2}`);
            console.log(response.data);
            setResult(response.data.result);
        



           } catch (error) {
            console.error(error)
           }
           finally{
            setLoading(false);
           }
        }
        fetchData();
    },[])



const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:6967/predict');

    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




  return (
    <div>
        
        <h2>Data from the api</h2>

        <h1>this is the result from the parameter {result}</h1>

        <h2>Enter Values</h2>

      {/* Input for parameter 1 */}
      <label htmlFor="input1">Parameter 1:</label>
      <input
        type="text"
        id="input1"
        placeholder="Enter param 1"
        value={param1}
        onChange={(e) => setParam1(e.target.value)}
      />

      <br /><br />

      {/* Input for parameter 2 */}
      <label htmlFor="input2">Parameter 2:</label>
      <input
        type="text"
        id="input2"
        placeholder="Enter param 2"
        value={param2}
        onChange={(e) => setParam2(e.target.value)}
      />

      <br /><br />
    </div>
  )
}

export default Test_component