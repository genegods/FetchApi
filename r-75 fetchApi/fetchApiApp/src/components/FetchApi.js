import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import spinner from "../asserts/spinner/Loading1.gif"

const FetchApi = () => {
  // handle state
  const [photoState, setPhotoState] = useState({
    loading: false,
    photos: [],
    errorMessage: "",
  });

  // call api
  useEffect(() => {
    const fetchData = async () => {
      try {
        // load spinner
        setPhotoState({
          ...photoState,
          loading: true,
        });

        //   load fetch
        const dataUrl = `https://jsonplaceholder.typicode.com/photos`;
        const response = await axios.get(dataUrl);
        setPhotoState({
          ...photoState,
          photos: response.data,
          loading: false,
        });
      } catch (error) {
        setPhotoState({
          ...photoState,
          loading: false,
          errorMessage: "Sorry Something went wrong",
        });
      }
    };
    fetchData();
  }, []);

  const { loading, errorMessage, photos } = photoState;
  console.log("loading", loading);
  console.log("photos", photos);
  console.log("errorMessage", errorMessage);

  return (
    <React.Fragment>
      <section>
        <div className="bg-white w-auto min-h-96 pb-20 mx-5 mt-40 sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
          {/* header section */}
          <div className="h-28 flex justify-center items-center shadow">
            <p className="uppercase font-bold text-3xl text-center">
              load api/ call api/ fetch api
            </p>
          </div>

          {/* body section */}
          <div>
              {
                !loading && errorMessage.length > 0 &&
                <div className='h-80 flex justify-center items-center'>
                    <p className='text-3xl text-red-500'>{errorMessage}</p>
                </div>   
              }
              {
                  loading && 
                  <div className='h-80 flex justify-center items-center'>
                      <img src={spinner} alt='spinner'/>
                  </div>
              }
            <div>
              {!loading && photos.length > 0 && (
                <div>
                  {photos.map((item) => {
                    return (
                      <div key={uuidv4()}>
                        <p>{item.id}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FetchApi;
