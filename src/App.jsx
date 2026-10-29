import { useState, useCallback, useEffect, useRef } from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/`";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

    setIsCopied(true)

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return() => clearTimeout(timer);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
      <div className='w-full text-center max-w-md mx-auto shadow-md rounded-lg px-3 py-4 my-8 text-white bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-solid bg-white text-gray-700 w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`outline-none px-4 py-1 shrink-0 font-medium transition-all duration-200 cursor-pointer ${
              isCopied
                ? "bg-emerald-600 text-white scale-95"
                : isHovered
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-700 text-white"
            }`}
          >
            {isCopied ? "Copied! ✓" : isHovered ? "Copy text" : "Copy"}
          </button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            className='cursor-pointer'
            onChange={() => {
                setNumberAllowed((prev) => !prev);
            }}
            />
            <label>Numbers</label>
          </div>
          
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            className='cursor-pointer'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label>Characters</label>

          </div>
        </div>
      </div>
  )
}

export default App