import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false);

  const [password, setPassword] = useState("")
  //useCallback(fn, dependencies)
  //dependencies wo h jisko change krne pe function dobara run ho rha h
  //fn ko likne ke liye () => {}

  //useRef hook 
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    //make a password intially empty aur string me data jisse hum password banaenge
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*?{}[]~`"

    for(let i = 1; i <= length; i++){
      //random number generate krne ke liye aur uska floor le liya h
      //zero value na aaye isliye + 1 kiya h
      //string me koi random index aaya h
      let char = Math.floor(Math.random() * str.length + 1)

      //value add kr di pass me concatenate krne ke liye pass += 
      pass += str.charAt(char)
    }
    //read kr lenge password ko
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    //isse hume jitni value copy krni h utni select hogi
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  }, [password])
  //useEffect ka array
  //run ka goal yaha se achieve hua h
useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])

//useCallback is raect hook jisko jitna ho ske usko memory me rakh lo
//jab use me aaye tab use kr lo jitne ho paaye
  return (
    <>
    <div className='-full max-w-md mx-auto shadow-md-rounded-lg px-4 my-8
    text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3 '>Password Generator</h1> 
    <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" 
      value={password}
      //tailwind se hoga 
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      //har ek input me refernce pass kr skte h 
      ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipBoard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range" 
      min = {6}
      max = {100}
      value = {length}
      className='cursr-pointer'
      //apne length ko change kr skte h isliye onChange
      //this is not the same
      onChange={(e) => {setLength(e.target.value)}}
      />
      <label>Length : {length}</label>
    </div>
    <div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        id="numberInput"
        onChange={() => {
          //previous value jo bhi h usko reverse kr do
          //true aur false flip hota rahega
          //means this is 
          setNumberAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id="characterInput"
        onChange={() => {
          setcharAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="characterInput">Characters</label>
        
      </div>
    </div>
    </div>
    </div>

    </>
  )
}

export default App
