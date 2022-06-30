import { useState, createContext } from "react";

export const LakeContext = createContext();

export const LakeContextProvider = (props) => {
  //  const [details, setDetails] = useState();
  //  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/lakes/all").catch(
        console.log("Error")
      );
      const data = await res.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <LakesContext.Provider
      value={
        {
          //        details,
          //        loading,
        }
      }
    >
      {props.children}
    </LakesContext.Provider>
  );
};
