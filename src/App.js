import characters from "./characters";
import React, {useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";

function App() {

    const [passwords,setPasswords] = React.useState(['',''])
    const [passLength, setPassLength] = React.useState()
    const [copied, setCopied] = React.useState(false)
    const textFieldRef = useRef(null)

    React.useEffect(()=>{
      if(setCopied)
      {
        setTimeout(()=>{
          setCopied(false)
        },3000)

      }

    },[copied])

    function handleChange(event)
    {
      const {value} = event.target
      
        setPassLength(value)
      

    }

    function randomNum (arr)
    {
      return Math.floor(Math.random()*arr.length)
    }


    function generatePassword(length)
    {
      let pass = []
      for(let i=0;i<length;i++)
      {
        pass.push(characters[randomNum(characters)])
      }
      return pass.join('')
    }

    function getPassword()
    {
        if(passLength)
        {
          setPasswords([generatePassword(passLength),generatePassword(passLength)])
        }
        else{
          setPasswords([generatePassword(15),generatePassword(15)])
        }
      
    }
    function handleCopy(event)
    {
    
      if(passwords[0])
      {
        const {id} = event.target
        if(id === '0')
        {
            navigator.clipboard.writeText(passwords[Number(id)])
            .catch(error=>console.error(error))
            setCopied(true)
        }
        else if(id === '1')
        {
            navigator.clipboard.writeText(passwords[Number(id)])
            .catch(error=>console.error(error))
            setCopied(true)
        }

      }
      else{
        alert('Please generate a password')
      }
   
    }

  return (
    <main>
      <div id="container">
              
              <Header />
            
              <div className="input-btn-container">
                <button id="generate-btn" onClick={getPassword}>Generate passwords</button>
                <input className="length-input" onChange={handleChange} name='passwordLength' type='number' value={passLength} placeholder="Choose length (10 - 16)"/>
              </div>
              <p id="line"></p>
              <div id="password-container" >
                  <div className="passwordBox"><i id="0" onClick={handleCopy} className="copybadge1 fa-solid fa-copy"></i><  textarea ref={textFieldRef} readOnly  id="pass-1"  className="passwords" value={passwords[0]}/></div>
                  <div className="passwordBox"><i id='1' onClick={handleCopy} className="copybadge2 fa-solid fa-copy"></i><textarea ref={textFieldRef} readOnly id="pass-2" className="passwords" value={passwords[1]}/> </div>                
              </div> 
              {copied && <p className="bottom-text">Copied to clipboard</p>}
        </div>
     </main> 
  )
}

export default App;
