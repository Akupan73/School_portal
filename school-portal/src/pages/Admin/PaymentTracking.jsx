import React,{useState} from "react";
import paymentsData from "./adminData";

const PaymentTracking = () => {

const [payments,setPayments] = useState(paymentsData);

const updateStatus = (id,status) =>{

const updated = payments.map(p =>
p.id === id ? {...p,status:status} : p
)

setPayments(updated)

}

return(

<div style={{marginTop:"30px"}}>

<h2>Track Payments</h2>

<table border="1" cellPadding="10" style={{width:"100%"}}>

<thead>

<tr>
<th>Student</th>
<th>Amount</th>
<th>Status</th>
<th>Update</th>
</tr>

</thead>

<tbody>

{payments.map(p => (

<tr key={p.id}>

<td>{p.student}</td>

<td>{p.amount}</td>

<td>{p.status}</td>

<td>

<button onClick={()=>updateStatus(p.id,"Paid")}>
Mark Paid
</button>

<button onClick={()=>updateStatus(p.id,"Pending")}>
Pending
</button>

<button onClick={()=>updateStatus(p.id,"Failed")}>
Failed
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default PaymentTracking