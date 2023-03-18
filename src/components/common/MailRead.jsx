import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../api/axiosInstance";
import { useEffect } from "react";

function MailRead({ readModal, setReadModal, readID }) {
  const [mail, setMail] = useState(null);

  useEffect(() => {
    const getMail = () => {
      axiosInstance
        .get(`/cms/contact-me-detail/${readID}/`)
        .then((response) => {
          setMail(response?.data);
        })
        .catch((error) => {});
    };
    getMail();
  }, [readID]);

  return (
    <>
      <Transition appear show={readModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setReadModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subject: {mail?.subject}
                  </Dialog.Title>

                  <div className="mt-4  ">
                    <div className="my-2">Name: {mail?.name}</div>
                    <div className="my-2">Address: {mail?.address}</div>
                    <div className="my-2">Email: {mail?.email}</div>
                    <div className="my-2">
                      Phone Number: {mail?.phone_number}
                    </div>
                    <div>Message: {mail?.message}</div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      onClick={() => setReadModal(false)}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Ok, Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default MailRead;
