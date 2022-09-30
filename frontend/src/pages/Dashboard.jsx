import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineFileJpg,
  AiOutlineFilePdf,
  AiOutlineFileExcel,
} from 'react-icons/ai';
import uploadFilesService from '../services/uploadFilesService';

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const [file, setFile] = useState({});

  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file.type !== undefined) {
      uploadFilesService
        .upload(file)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      setFile({});
      setIsUploaded(true);
    }
  };

  useEffect(() => {}, [file]);

  return (
    <div className="m-3 text-xl text-gray-900 font-semibold">
      <h1 className="text-xl">Dashboard</h1>
      {isUploaded && <h2>File is Uploaded</h2>}
      <form
        id="form-file-upload"
        className="h-[16rem] w-[28rem] max-w-full text-center relative"
        onDragEnter={handleDrag}
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          id="input-file-upload"
          multiple={true}
          className="hidden"
          onChange={handleChange}
          ref={inputRef}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={`h-full flex items-center justify-center border-dashed border-2 rounded-md border-slate-700 bg-slate-200 ${
            dragActive ? 'bg-white' : ''
          }`}
        >
          {file.name && file.type ? (
            file.type === 'image/png' ? (
              <div className="flex flex-1 flex-col items-center">
                <AiOutlineFileJpg size="46px" />
                <p className="text-sm mt-2">{file.name}</p>
              </div>
            ) : file.type === 'application/pdf' ? (
              <div className="flex flex-1 flex-col items-center">
                <AiOutlineFilePdf size="46px" />
                <p className="text-sm mt-2">{file.name}</p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center">
                <AiOutlineFileExcel size="46px" />
                <p className="text-sm mt-2">{file.name}</p>
              </div>
            )
          ) : (
            <div>
              <p>Drag and drop your file here or</p>
              <button
                className="cursor-pointer p-1 hover:underline"
                onClick={handleClick}
              >
                Upload a file
              </button>
            </div>
          )}
        </label>
        {dragActive && (
          <div
            className="h-full w-full absolute top-0 left-0 bottom-0 right-0"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <button
          type="submit"
          className="w-full p-2 mt-2 border border-green-500 bg-green-200 rounded-md hover:bg-green-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
