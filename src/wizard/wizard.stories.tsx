import React from "react";
import Wizard from "./Wizard";

export default {
  title: "Wizard",
  component: Wizard,
};

export const Basic = () => {
  return (
    <Wizard
      step={10}
      renderHeader={() => <h1>My wizard</h1>}
      renderFooter={({ previousStep, nextStep }) => (
        <div>
          <button onClick={previousStep}>previous</button>
          <button onClick={nextStep}>next</button>
        </div>
      )}
    >
      <div>
        <h2>Step 1</h2>
        <p>Welcome to the first step</p>
      </div>

      <div>
        <h2>Step 2</h2>
      </div>

      <div>
        <h2>Step 3</h2>
        <p>Welcome to the last step</p>
      </div>
    </Wizard>
  );
};
