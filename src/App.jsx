import { useEffect, useState } from "react";
import "./App.css";
import patternDesktop from "/pattern-divider-desktop.svg";
import icondice from "/icon-dice.svg";
import { Loading } from "./Loading";

function App() {
  const [advice, setAdvice] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "https://api.adviceslip.com/advice";
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Advice");
      }
      const json = await response.json();
      setAdvice(json.slip);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(advice);
  }, []);
  const generateAdvice = () => {
    fetchData();
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container">
          <div key={advice.id}>
            <h5>Advice #{advice.id}</h5>
            <h2>"{advice.advice}"</h2>
          </div>

          <img className="pattern" src={patternDesktop} alt="" />
          <div onClick={generateAdvice} className="dice">
            <img src={icondice} alt="" />
          </div>
        </div>
      )}
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </div>
  );
}

export default App;
