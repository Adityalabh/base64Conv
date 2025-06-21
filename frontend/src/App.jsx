import styled, { ThemeProvider } from "styled-components";
import DragSection from "./MyComponents/DragSection";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./utils/theme";
import ImageList from "./MyComponents/ImageList";
import DarkModeToggle from "./MyComponents/DarkModeToggle";

const MainContainer = styled.div`
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.textPrimary};
  min-height: 100vh;
  padding: 1rem;
  transition: all 0.3s ease;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [files, setFiles] = useState([]);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    console.log(files.length, files);
  }, [files]); // Added dependency array

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <div>
          <div className="lg:flex w-full lg:px-30 lg:my-12  mx-auto">
            {/* Side Image */}
            <div className="p-4  w-full lg:w-[35%] mx-auto">
              <img src="/orangeMan.png" alt="image" className=" h-[300px] mx-auto w-[200px] lg:w-[250px] lg:h-90" />
            </div>

            {/* Drag drop section with toggle feature */}
            <div className=" lg:w-[65%] md:mx-6  ">
              <div className="text-center ">
                <div className="text-gray-500 text-3xl md:text-5xl py-4 font-black">
                  <h1>Convert your images</h1>
                  <h1>to base64</h1>
                </div>
                <div className="w-[40%] mx-auto my-4 "> 
                  <DarkModeToggle
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                  />
                </div>
              </div>

              <div className="my-3 py-4">
                <DragSection setFiles={setFiles} />
              </div>

              <img
                src="/long-arrow-right.png"
                alt="arrowImage"
                className="h-10 hidden lg:block"
              />
            </div>
          </div>

          {/* image lists */}
          {files.length > 0 && ( // Only show when files exist
            <div className="mt-10 p-4 rounded-lg shadow">
              <ImageList files={files} setFiles={setFiles} />
            </div>
          )}
        </div>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
