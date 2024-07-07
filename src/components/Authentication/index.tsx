import React, { useState } from "react";

import Form from "./Form";

const Authentication: React.FC = () => {
  const [loginPage, setLoginPage] = useState(true);

  const toggleForm = () => {
    setLoginPage(!loginPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form loginPage={loginPage} toggleForm={toggleForm} />
    </div>
  );
};

export default Authentication;
