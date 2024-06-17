import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setcharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if (numbersAllowed) str += "0123456789";
    if (charactersAllowed) str += "!@#$%^&*_-+_={}[]~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);
  const copyOnClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordgenerator();
  }, [length, numbersAllowed, charactersAllowed, passwordgenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyOnClipboard}
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy{" "}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numbersInput"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbersInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="charInput"
              onChange={() => {
                setcharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInpur">Charcters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
