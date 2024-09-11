import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]";

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * str.length + 1);
      pass += str[random];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className="w-full bg-gray-600 max-w-xl mx-auto shadow shadow-slate-100 rounded-lg px-4 py-8 my-8 text-orange-500">
        <div className="items-center text-center mb-8" >

          <h1 className="text-2xl font-semibold mb-4 align-middle ">Password Generator</h1>
        </div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2.5 px-3 font-semibold"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-600 text-white px-6 py-0.5 shrink-0 font-semibold">
            Copy
          </button>
        </div>
        <div className="flex text-lg gap-x-2 justify-around mt-8">
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
            <label className="cursor-pointer font-semibold">
              Length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="outline-none border-none "
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="cursor-pointer font-semibold" >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="outline-none border-none "
              defaultChecked={charAllowed}
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="cursor-pointer font-semibold" >Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
