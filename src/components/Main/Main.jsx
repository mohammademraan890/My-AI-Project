import { assets } from "../../assets/assets";
import "./Main.css";
import { cardsData } from "../../cardsData";
import { useContext } from "react";
import { Context } from "../../context/Context";
const Main = () => {
 const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)


  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult
        ?<>
                <div className="greet">
          <p>
            <span>Hello, Imran.</span>
          </p>
          <p>How can I assist you today?</p>
        </div>
        <div className="cards">
          {cardsData.map((card) => {
            return (
              <div key={card.id} className="card">
                <p>{card.description}</p>
                <img src={card.img} alt="" />
              </div>
            );
          })}
        </div>
        </>

        : 
        <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p className="recentPrompt">{recentPrompt}</p> 
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
            ?<div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
            :
            <p dangerouslySetInnerHTML={{__html:resultData}}></p>                        
            }
          </div>
        </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={()=>onSent(input)} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
