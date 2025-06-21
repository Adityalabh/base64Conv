import React, { useState } from "react";
import Button from "@mui/material/Button";
import SpecificImage from "./SpecificImage";
import styled from "styled-components";

const ImageListContainer = styled.div`
  color: ${({ theme }) => theme.textPrimary};
`;
const ColumnHeaders = styled.div``;
const FileContent = styled.div`
  background: ${({ theme }) => theme.bgVeryLight};
`;

const ImageList = ({ files, setFiles }) => {
  const [open, setOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const handleShowImage = (fileObj) => {
    setCurrentFile(fileObj);
    setOpen(true);
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  return (
    <ImageListContainer className="mt-6 md:w-[90%] mx-auto">
      {files.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold text-gray-500">
            {files.length} Image{files.length !== 1 ? "s" : ""} Converted
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
            onClick={clearAllFiles}
          >
            Clear All
          </button>
        </div>
      )}

      {/* table column name */}
      <div className="my-2">
        {files.length > 0 && (
          <ColumnHeaders className="flex justify-around font-bold border-1 border-gray-400 p-1 rounded-xl">
            <p>Image</p>
            <p>Base64</p>
            <p>Actions</p>
          </ColumnHeaders>
        )}
      </div>

      {/* Images list  */}
      {files.map((fileObj, index) => (
        <FileContent key={index} className="my-4 rounded-t-xl">
          <div className="flex items-center w-full justify-evenly gap-2 px-2">
            {/* Fixed image display */}
            <div className="flex items-center justify-center h-24 w-24 border-2 border-gray-300 rounded-xl overflow-hidden">
              <img
                src={fileObj.preview}
                alt="preview"
                className="h-full w-auto object-contain"
              />
            </div>

            <textarea
              value={fileObj.preview}
              rows={1}
              className="p-3 outline-none border-2 border-dashed border-gray-400 rounded-lg w-full max-w-md overflow-hidden"
              readOnly
            ></textarea>

            <Button
              variant="contained"
              size="large"
              onClick={() => handleShowImage(fileObj)}
            >
              Show
            </Button>
          </div>
          <hr className="border-1 border-gray-500 mb-3" />
        </FileContent>
      ))}

      {/* image Dialog */}
      {currentFile && (
        <SpecificImage
          open={open}
          setOpen={setOpen}
          fileObj={currentFile}
          files={files}
          setFiles={setFiles}
        />
      )}
    </ImageListContainer>
  );
};

export default ImageList;