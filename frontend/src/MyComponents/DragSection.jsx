import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
];

const DragSection = ({ setFiles }) => {
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const ImageFileReader = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject(new Error("Failed to read file as base64"));
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsDataURL(file);
    });

  const processFiles = async (newFiles) => {
    const processed = [];
    const errs = [];

    for (let file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        errs.push(`\"${file.name}\" exceeds 1 MB limit.`);
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        errs.push(`\"${file.name}\" unsupported format.`);
        continue;
      }
      try {
        const preview = await ImageFileReader(file);
        processed.push({ file, preview });
      } catch (e) {
        errs.push(`Error processing \"${file.name}\": ${e.message}`);
      }
    }

    if (errs.length) setError(errs.join(" \n"));
    if (processed.length) setFiles((prev) => [...prev, ...processed]);
  };

  // Properly handle file input change
  const handleInputChange = async (e) => {
    setLoading(true);
    setError("");
    try {
      // Get files from input event
      const newFiles = Array.from(e.target.files);
      if (newFiles.length > 0) {
        await processFiles(newFiles);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing files");
    } finally {
      setLoading(false);
      // Reset input to allow selecting same file again
      e.target.value = null;
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    setLoading(true);
    setError("");
    try {
      const newFiles = Array.from(e.dataTransfer?.files);
      if (newFiles.length > 0) {
        await processFiles(newFiles);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing files");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="">
      <div className="">
        <form>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-md p-1 flex justify-between ${
              dragOver ? "border-blue-500 bg-blue-50" : "border-gray-400"
            }`}
          >
            <p className="text-gray-500 font-semibold text-md md:text-xl text-center mx-auto p-1">
              Drag and drop images here
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={imageRef}
              // Use the corrected handler
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => imageRef.current.click()}
              className="bg-amber-500 p-2  text-white font-bold cursor-pointer rounded-md text-sm md:text-md"
            >
              {!loading ? (
                "UPLOAD IMAGES"
              ) : (
                <div className="flex gap-2 items-center">
                  Processing
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4 font-semibold">
          {error}
        </div>
      )}
    </div>
  );
};

export default DragSection;
