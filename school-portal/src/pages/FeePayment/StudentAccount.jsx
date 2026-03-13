import React, { useState } from "react";
import feeData from "./feeData";

const StudentAccount = ({
  pendingFees,
  setPendingFees,
  totalPaid,
  setTotalPaid,
  lastPaymentDate,
  setLastPaymentDate,
  onPaymentComplete
}) => {
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    amount: ""
  });

  const openModal = (fee) => {
    setSelectedFee(fee);
    setFormData({ ...formData, amount: fee.amount });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMethod("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedFee) return;

    const receiptNumber = "RCPT-" + Math.floor(Math.random() * 100000);
    const today = new Date().toLocaleDateString();

    const paymentData = {
      receipt: receiptNumber,
      feeType: selectedFee.feeType,
      amount: parseFloat(formData.amount),
      method: method,
      date: today
    };

    setTotalPaid(prev => prev + parseFloat(formData.amount));
    setLastPaymentDate(today);
    setPendingFees(pendingFees.filter(fee => fee.id !== selectedFee.id));

    if (onPaymentComplete) onPaymentComplete(paymentData);
    closeModal();
  };

  return (
    <div id= ' 'style={{ marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#fff"
        }}
      >
        <thead style={{ background: "#4CAF50", color: "white" }}>
          <tr>
            <th style={{ padding: "12px" }}>Fee Type</th>
            <th>Total Amount Paid</th>
            <th>Date of Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px", textAlign: "center" }}>Tuition</td>
            <td style={{ textAlign: "center" }}>{totalPaid} FCFA</td>
            <td style={{ textAlign: "center" }}>{lastPaymentDate || "-"}</td>
            <td style={{ textAlign: "center" }}>
              {pendingFees.length > 0 ? (
                <button
                  onClick={() => openModal(pendingFees[0])}
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                  onMouseEnter={e => (e.target.style.background = "#45a049")}
                  onMouseLeave={e => (e.target.style.background = "#4CAF50")}
                >
                  {totalPaid === 0 ? "Pay" : "Pay More"}
                </button>
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              width: "400px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              textAlign: "center",
              position: "relative"
            }}
          >
            {!method ? (
              <>
                <h3 style={{ marginBottom: "20px" }}>Choose Payment Method</h3>
                <select
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "20px"
                  }}
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="">Select Method</option>
                  <option value="MoMo">Mobile Money</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Bank Card">Bank Card</option>
                </select>
                <button
                  onClick={closeModal}
                  style={{
                    background: "#d70f0f",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 style={{ marginBottom: "20px" }}>{method} Payment Form</h3>
                <form onSubmit={handlePayment}>
                  {["name", "studentId", "email", "amount"].map((field, idx) => (
                    <input
                      key={idx}
                      type={field === "amount" ? "number" : field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field === "studentId"
                          ? "Student ID"
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box"
                      }}
                      min={field === "amount" ? "0" : undefined}
                    />
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      type="submit"
                      style={{
                        background: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1,
                        marginRight: "10px"
                      }}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      style={{
                        background: "#d70f0f",
                        color: "#fff",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ================= PARENT COMPONENT =================
const PaymentHistoryApp = () => {
  const [pendingFees, setPendingFees] = useState(feeData);
  const [totalPaid, setTotalPaid] = useState(0);
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handlePaymentComplete = (paymentData) => {
    setPaymentHistory((prev) => [...prev, paymentData]);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>📚 Student Payment System</h1>

      <div style={{ maxWidth: "800px", margin: "20px auto" }}>
        <StudentAccount
          pendingFees={pendingFees}
          setPendingFees={setPendingFees}
          totalPaid={totalPaid}
          setTotalPaid={setTotalPaid}
          lastPaymentDate={lastPaymentDate}
          setLastPaymentDate={setLastPaymentDate}
          onPaymentComplete={handlePaymentComplete}
        />
        
        <h2 style={{ marginTop: "50px", textAlign: "center", color: "#4CAF50" }}>Payment History</h2>
        {paymentHistory.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No payments yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#fff"
            }}
          >
            <thead style={{ background: "#4CAF50", color: "white" }}>
              <tr>
                {["Receipt #", "Fee Type", "Amount Paid", "Payment Method", "Date"].map((th, idx) => (
                  <th key={idx} style={{ padding: "12px" }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>{payment.receipt}</td>
                  <td>{payment.feeType}</td>
                  <td>{payment.amount} FCFA</td>
                  <td>{payment.method}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryApp;