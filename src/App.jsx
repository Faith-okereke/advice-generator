import { useEffect, useState } from "react";
import "./App.css";
import patternDesktop from "/pattern-divider-desktop.svg";
import icondice from "/icon-dice.svg";
import { Loading } from "./Loading";

function App() {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://api.adviceslip.com/advice";
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to Fetch");
      }
      const json = await response.json();
      setAdvice(json.slip);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const generateAdvice = () => {
    fetchData();
    console.log(advice.advice);
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
        . Coded by <a href="https://www.frontendmentor.io/profile/Faith-okereke" target="_blank">Faith Okereke</a>.
      </div>
    </div>
  );
}

export default App;
