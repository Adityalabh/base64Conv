import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import styled from "styled-components";

const MainDialog = styled.div`
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.textPrimary};
`;

const SpecificImage = ({ open, setOpen, fileObj, files, setFiles }) => {
  const handleClose = () => {
    setOpen(false);
  };

  // copying image
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fileObj.preview)
      .then(() => {
        alert("Base64 string copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const downloadTxtFile = () => {
    const blob = new Blob([fileObj.preview], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileObj.name.split(".")[0]}_base64.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    const updatedFiles = files.filter(
      (item) => item.file.name !== fileObj.file.name
    );
    setFiles(updatedFiles);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="image-dialog-title"
      fullWidth
    >
      <MainDialog className="bg-gray-100 ">
        <DialogTitle className=" text-xl! underline font-bold! w-full text-center">
          <p>
            {fileObj.file.name[0].toUpperCase() + fileObj.file.name.slice(1)}
          </p>
        </DialogTitle>
        <DialogContent>
          <div className=" ">
            <img
              src={fileObj.preview}
              alt="image"
              className="mx-auto border-2 border-gray-500 rounded-xl h-70 w-80"
            />
          </div>
          <div className="my-4">
            <h1 className="font-bold my-4">
              File Size:{" "}
              <span className="text-gray-500 mx-3 ">
                {(fileObj.file.size / 1024).toFixed(1)} KB
              </span>
            </h1>

            <h1 className="font-bold my-1">For use in img elements:</h1>
            <div className="flex items-center gap-2">
              <textarea
                id="base64"
                rows={1}
                readOnly
                className="w-full border-2 border-gray-400 p-1 rounded-sm"
                value={fileObj.preview}
              ></textarea>
              <Button
                variant="contained"
                className="ml-2 bg-amber-600!"
                size="small"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>
          {/* buttons */}
          <div className="flex-col mt-9">
            <div className="  juscursor-pointer p-2 rounded-lg text-center  text-white w-[99%] mx-auto  bg-[#1666b5] hover:bg-[#1666b5c8] cursor-pointer">
              <button type="button" onClick={downloadTxtFile}>
                Download TXT
              </button>
              <i className="fa-solid fa-download mx-2" />
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDelete}
                className="w-[99%] bg-red-500 mx-auto p-2 my-2 hover:bg-red-600 cursor-pointer rounded-lg text-center  text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </MainDialog>
    </Dialog>
  );
};

export default SpecificImage;
