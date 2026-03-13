import React from "react";
import payments from "./adminData";

const PaymentReports = () => {

const totalRevenue = payments
.filter(p => p.status === "Paid")
.reduce((sum,p)=>sum+p.amount,0);

return(

<div style={{marginTop:"20px"}}>

<h2>Payment Reports</h2>

<p><b>Total Revenue:</b> {totalRevenue} FCFA</p>

<table border="1" cellPadding="10" style={{width:"100%"}}>

<thead>
<tr>
<th>Student</th>
<th>Fee</th>
<th>Amount</th>
<th>Status</th>
<th>Method</th>
</tr>
</thead>

<tbody>

{payments.map(p => (

<tr key={p.id}>

<td>{p.student}</td>
<td>{p.fee}</td>
<td>{p.amount}</td>
<td>{p.status}</td>
<td>{p.method}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default PaymentReports