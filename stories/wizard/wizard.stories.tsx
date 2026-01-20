import { Wizard } from "../../src";

export default {
  title: "Wizard",
  component: Wizard,
};

export const Basic = () => {
  return (
    <Wizard
      renderHeader={() => <h1>My wizard</h1>}
      renderFooter={({ previousStep, nextStep, isFirstPage, isLastPage }) => (
        <div>
          {!isFirstPage && <button onClick={previousStep}>previous</button>}
          {!isLastPage && <button onClick={nextStep}>next</button>}
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

export const WithSpecificStep = () => {
  return (
    <Wizard
      step={2}
      renderHeader={() => <h1>My wizard</h1>}
      renderFooter={({ previousStep, nextStep, isFirstPage, isLastPage }) => (
        <div>
          {!isFirstPage && <button onClick={previousStep}>previous</button>}
          {!isLastPage && <button onClick={nextStep}>next</button>}
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
