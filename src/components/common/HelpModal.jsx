import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";

const HelpModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="h-60 w-56 bg-gray-400 p-6">
        <div>
          <span>Pwnbot System</span>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default HelpModal;
