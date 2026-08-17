import React from 'react';
import { Agentation } from "agentation";
import WorkflowPresentation from "./WorkflowPresentation";

function App() {
  return (
    <>
      <WorkflowPresentation />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}

export default App;
