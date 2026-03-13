import React, { useState } from "react";
import StudentAccount from "./StudentAccount";
import feeData from "./feeData";

const FeePayment = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // dashboard | account | history

  // Payment state for StudentAccount
  const [pendingFees, setPendingFees] = useState(feeData);
  const [totalPaid, setTotalPaid] = useState(0);
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handlePaymentComplete = (paymentData) => {
    setPaymentHistory((prev) => [...prev, paymentData]);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", background: "#f0f4f8", padding: "40px 20px" }}>
      {activeSection === "dashboard" && (
        <div style={{ maxWidth: "900px", margin: "0 auto", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", background: "#fff" }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", padding: "25px 30px" }}>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>📚 Student Fee Payment</h1>
            <p style={{ opacity: 0.85, marginTop: "8px" }}>Click a card to access your fee account or view payment history.</p>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", padding: "30px" }}>
            {/* My Fee Account */}
            <div
              onClick={() => setActiveSection("account")}
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(255,154,158,0.3)",
                transition: "all 0.3s ease",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,154,158,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,154,158,0.3)";
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>💰 My Fee Account</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>Check balance, due fees, and make payments.</p>
            </div>

            {/* Payment History */}
            <div
              onClick={() => setActiveSection("history")}
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
                transition: "all 0.3s ease",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(102,126,234,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102,126,234,0.3)";
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>📋 Payment History</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>View all past payments and receipts.</p>
            </div>
          </div>
        </div>
      )}

      {/* Student Account Section */}
      {activeSection === "account" && (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button
            onClick={() => setActiveSection("dashboard")}
            style={{ marginBottom: "20px", padding: "10px 20px", background: "#764ba2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            ← Back to Dashboard
          </button>
          <StudentAccount
            pendingFees={pendingFees}
            setPendingFees={setPendingFees}
            totalPaid={totalPaid}
            setTotalPaid={setTotalPaid}
            lastPaymentDate={lastPaymentDate}
            setLastPaymentDate={setLastPaymentDate}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      )}

      {/* Payment History Section */}
      {activeSection === "history" && (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button
            onClick={() => setActiveSection("dashboard")}
            style={{ marginBottom: "20px", padding: "10px 20px", background: "#764ba2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            ← Back to Dashboard
          </button>

          <h2 style={{ textAlign: "center", color: "#4CAF50" }}>Payment History</h2>
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
      )}
    </div>
  );
};

export default FeePayment;