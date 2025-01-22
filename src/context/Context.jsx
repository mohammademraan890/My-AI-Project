import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini"; // Import the `run` function

export const Context = createContext();

const ContextProvider = (props) => {
  // A function to send a prompt to Gemini API
  const [input,setInput] = useState("");
  const [recentPrompt,setRecentPrompt] = useState("")
  const [prevPrompts,setPrevPrompts]=useState([]);
  const [showResult,setShowResult]=useState(false)
  const [loading,setLoading]=useState(false)
  const [resultData,setResultData]= useState("")

  const delayPara =(index,nextWord)=>{
    setTimeout(() => {
      setResultData(prev=>prev+nextWord)
    }, 75*index);
  }
  const onSent = async (input) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(input)
    setPrevPrompts(prev=>[...prev,input])
    try {
      const response = await run(input); // Call the `run` function
      console.log("Gemini Response:", response);
      let responseArray= response.split("**")
      let newResponse=""
      for(let i=0;i< responseArray.length;i++){
        if(i===0 || i%2 !==1){
          newResponse += responseArray[i];
        }
        else{
          newResponse += "<b>"+responseArray[i]+"</b>"
        }
      }
      let newResponse2=newResponse.split("*").join("</br>")
      let newResponseArray= newResponse2.split(" ")
      // Typing effect using delays
      for (let i = 0; i < newResponseArray.length; i++) {
        setTimeout(() => {
          setResultData((prev) => prev + newResponseArray[i] + " ");
        }, 20 * i);
      }
      setLoading(false)
      setInput("")

    } catch (error) {
      console.error("Error in onSent:", error);
    }
  };


  const contextValue = {
    onSent, // Provide the `onSent` function via context if needed
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

// Define propTypes
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
