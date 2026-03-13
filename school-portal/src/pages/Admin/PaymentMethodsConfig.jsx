import React,{useState} from "react";

const PaymentMethodsConfig = () => {

const [methods,setMethods] = useState({

bank:true,
momo:true,
card:true

})

const toggleMethod = (method)=>{

setMethods({

...methods,
[method]:!methods[method]

})

}

return(

<div style={{marginTop:"30px"}}>

<h2>Payment Methods Configuration</h2>

<label>

<input
type="checkbox"
checked={methods.bank}
onChange={()=>toggleMethod("bank")}
/>

Bank Transfer

</label>

<br/>

<label>

<input
type="checkbox"
checked={methods.momo}
onChange={()=>toggleMethod("momo")}
/>

Mobile Money

</label>

<br/>

<label>

<input
type="checkbox"
checked={methods.card}
onChange={()=>toggleMethod("card")}
/>

Card Payment

</label>

</div>

)

}

export default PaymentMethodsConfig