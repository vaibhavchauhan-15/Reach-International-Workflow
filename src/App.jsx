import React from 'react';
import { Agentation } from "agentation";
import MeetingSummariesPage from "./components/MeetingSummariesPage";

function App() {
  return (
    <>
      <MeetingSummariesPage />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}

export default App;
