import React from "react";

function Alert({ message, type = "primary" }) {
  if (!message) return null;

  return (
    <div className="container my-2">
      <div
        className={`alert alert-${type} alert-dismissible fade show`}
        role="alert"
        style={{
          wordBreak: "break-word",
        }}
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Alert;
