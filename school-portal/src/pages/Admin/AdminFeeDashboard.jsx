import React from "react";

import PaymentReports from "./PaymentReports";
import ManageFees from "./ManageFees";
import PaymentTracking from "./PaymentTracking";
import PaymentMethodsConfig from "./PaymentMethodsConfig";

const AdminFeeDashboard = () => {

return(

<div style={{padding:"20px"}}>

<h1>Admin Fee Management Dashboard</h1>

<PaymentReports/>

<ManageFees/>

<PaymentTracking/>

<PaymentMethodsConfig/>

</div>

)

}

export default AdminFeeDashboard