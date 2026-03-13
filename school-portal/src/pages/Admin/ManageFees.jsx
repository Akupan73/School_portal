import React,{useState} from "react";

const ManageFees = () => {

const [tuition,setTuition] = useState("");
const [deadline,setDeadline] = useState("");

const saveFees = () =>{
alert("Fee Structure Updated");
}

return(

<div style={{marginTop:"30px"}}>

<h2>Manage Fee Structure</h2>

<label>Tuition Fee</label>

<br/>

<input
type="number"
placeholder="Enter tuition fee"
value={tuition}
onChange={(e)=>setTuition(e.target.value)}
/>

<br/><br/>

<label>Payment Deadline</label>

<br/>

<input
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

<br/><br/>

<button onClick={saveFees}>Save</button>

</div>

)

}

export default ManageFees