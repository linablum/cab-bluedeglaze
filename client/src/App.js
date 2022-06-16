import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/lakes/all").catch(
        console.log("error")
      );
      const data = await res.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return <div className="App"></div>;
}

export default App;
