import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false)
  const passwordRef = useRef(null);
  const [isLightMode, setIsLightMode] = useState(true);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "@[]@#$%^&*";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length + 1)];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  useEffect(()=>{
    generatePassword();
  },[length, charAllowed, numberAllowed])

  const handleCopyPassword = useCallback(()=>{
    passwordRef.current.select();
    setIsCopied(true);
    window.navigator.clipboard.writeText(password)
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
   
  },[password]);
  return (
    <>
      <div className={`w-screen h-screen p-0 ${!isLightMode? "bg-black" : null} transition-all duration-300`}>
        <div className="flex flex-col justify-center items-center pt-6 font-bold w-1/2 mx-auto">
          <div className="flex justify-between">
          <h1 className={`text-3xl  text mr-4 ${!isLightMode? "text-white" : null}`}>Password Generator</h1>
         {isLightMode ? (<Button onClick={()=> setIsLightMode(false)}> <DarkModeIcon/></Button>) :(<Button onClick={()=> setIsLightMode(true)}> <LightModeIcon/></Button>)}
          
          </div>
          <div className="mt-8 w-full ">
            <div className="p-5 border-black rounded-md bg-gray-400 w-full">
              <div className="flex justify-center flex-col items-center">
                <div>
                  <input
                    type="text"
                    className="border border-black rounded-l-lg p-2 h-8 outline-none"
                    value={password}
                    ref={passwordRef}
                  />
                  <button className="px-4 py-[4px] bg-blue-400 text-black cursor-pointer rounded-r-lg transition-all duration-500" onClick={handleCopyPassword}>
                   {isCopied ? "Copied" : "Click to copy"}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 mt-4">
                  <div>
                    <label htmlFor="length" className="mr-2">
                      Length : {length}
                    </label>
                    <input
                      type="range"
                      name="length"
                      id=""
                      min={6}
                      max={32}
                      value={length}
                      onChange={(e) => {
                        setLength(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      name="number"
                      id=""
                      className="mr-2"
                      defaultChecked={numberAllowed}
                      onChange={(e) => {setNumberAllowed((prev)=> !prev)}}
                    />
                    <label htmlFor="number">Include Numbers</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="char"
                      className="mr-2"
                      defaultChecked={charAllowed}
                      onChange={() => {setCharAllowed((prev) => !prev);}}
                    />
                    <label htmlFor="char">Include Characters</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
