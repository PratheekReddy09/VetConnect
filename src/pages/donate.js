import './donate.css'

export default function Donate(){
    return(
        <div className='form-main'>
        <div className='form'>
            
    <label for="cars">DONATE US</label>
    <select name="donate" id="donate">
      <option value="volvo">1k rupees</option>
      <option value="saab">5k rupees</option>
      <option value="opel">10k rupees</option>
      
    </select>
    
    <div class="pk">NAME:
        <input type="text"placeholder="FIRSTNAME"/>
    </div>
    <div  class="pk">PHONE:
        <input type="text"placeholder="ENTER YOUR NUMBER"/>
    </div>
    <div  class="pk">MAIL:
        <input type="text"placeholder="MAIL"/>
    </div>
    <div  class="pk">CITY:
        <input type="text"placeholder="YOUR PLACE"/>
    </div>
    
    
    <input type="submit" value="PAY NOW"/>
    <div class="pk2">ENTER AMOUNT
        

    </div>
    <div class="pk3">
       <input type="text" placeholder="ENTER AMOUNT IN RUPEES"/>
       <input type="submit" value="PAY NOW"/>
    </div>
  
            
        </div>
        </div>
    )
}

