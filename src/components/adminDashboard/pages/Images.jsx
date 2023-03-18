import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AddImageModal from "../../common/AddImageModal";
import PageLoader from "../../common/Loaders/PageLoader";

const Images = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState();
  const [imageID, setImageID] = useState();
  const [dataLoader, setDataLoader] = useState(true);
  const [noData, setNoData] = useState(false);

  const getImages = () => {
    axiosInstance
      .get("/cms/image-list/")
      .then((response) => {
        setImages(Object?.values(response?.data[0])?.slice(1));
        setImageID(Object?.values(response?.data[0])?.shift());
        setDataLoader(false);
        const nullCheck = Object?.values(response?.data[0])
          ?.slice(1)
          .filter((element) => {
            return element === null;
          });
        nullCheck.length === 3 && setNoData(true);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <AddImageModal
        getAllData={getImages}
        imageID={imageID}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setNoData={setNoData}
      />
      <div className="min-h-90  mt-4">
        <div className="text-xl m-4 text-normaldark font-semibold">Images</div>
        <div className="bg-white mx-6 rounded shadow-md mb-2 overflow-hidden min-h-[70vh]">
          <div className="flex justify-center">
            {dataLoader && (
              <div
                className="flex items-center justify-center h-[50vh] w-[80vw] bg-white text-lg text-white"
                style={{ zIndex: 9999 }}
              >
                <PageLoader />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {images?.map((image, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="cursor-pointer  w-[287px] md:w-96 h-54  overflow-hidden "
                    >
                      <img
                        className="hover:opacity-70 transition-all duration-500 object-cover h-full w-full"
                        src={image}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {noData && (
            <div className=" h-[25vh] w-full flex items-center justify-center  text-lg font-bold">
              NO DATA FOUND
            </div>
          )}
          <div className="text-center my-10">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#305444] hover:bg-[#326051] py-2.5 px-3 text-white rounded-md"
            >
              Update Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
