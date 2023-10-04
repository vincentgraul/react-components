import React, { useState } from "react";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Basic = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Click</button>
      {isOpen && (
        <Modal onClickedOutside={() => setOpen(false)}>
          <h1>Bienvenue</h1>
        </Modal>
      )}
    </div>
  );
};
