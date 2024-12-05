import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Autocomplete, TextField, Stack } from '@mui/material';
import data from '../data/data';
import GangaFacts from '../data/GangaFacts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import gsap from 'gsap';

const SearchInitial = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  // Create refs for elements to animate
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const searchInputRef = useRef(null);  // Ref for the search box
  const factRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup on component unmount
    return () => clearTimeout(timer);
  }, []);

  // GSAP fade-in animation once loading is done
  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(headingRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.2 });
      gsap.fromTo(subHeadingRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.4 });
      gsap.fromTo(searchInputRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });  // Fade-in search box
      gsap.fromTo(factRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
      gsap.fromTo(buttonRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    }
  }, [isLoading]);

  const handleSearchChange = (event, value) => {
    setSearchTerm(value);

    if (value) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      setSearchTerm(value);
      setFilteredData([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredData([]);
  };

  const randomFactIndex = Math.floor(Math.random() * GangaFacts.length);
  const randomFact = GangaFacts[randomFactIndex].fact;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-black">
          <DotLottieReact
            src="https://lottie.host/b4a28780-8ba8-4f3d-9f5d-09c22324c8c5/DiFjCoVy9M.lottie"
            loop
            autoplay
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      ) : (
        <div className="relative z-20 flex flex-col items-center justify-start pt-20 h-screen text-white font-poppins">
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-normal"
          >
            Welcome to
          </h1>
          <h1
            ref={subHeadingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold drop-shadow-xl mt-2"
          >
            GANGA MITRA
          </h1>
          <p
            ref={subHeadingRef}
            className="text-base sm:text-lg md:text-xl font-light mb-24"
          >
            River Health at your fingertips
          </p>

          <Stack
            spacing={2}
            sx={{
              position: 'relative',
              width: { xs: '80%', sm: 300, md: 700 },
              color: 'black',
            }}
          >
            <Autocomplete
              ref={searchInputRef}  // Add ref to the search box element
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.map((option) => option.name)}
              value={searchTerm}
              onInputChange={handleSearchChange}
              onChange={handleOptionSelect}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  sx={{
                    input: {
                      color: 'black', // Keep input text color black
                    },
                    label: {
                      color: 'black', // Keep label color black
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black',
                         // Keep border color black
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                        fontWeight:500, // Keep border color black on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Keep border color black when focused
                      },
                    },
                  }}
                />
              )}
            />

            {/* Lordicon Cross Button for Clear Search */}
            {searchTerm && (
              <lord-icon
                src="https://cdn.lordicon.com/nqtddedc.json"
                trigger="hover"
                style={{
                  position: 'absolute',
                  top: '25%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  zIndex: 10,
                  pointerEvents: 'auto',
                }}
                onClick={clearSearch}
              ></lord-icon>
            )}
          </Stack>

          {/* Did You Know Section */}
          <div
            ref={factRef}
            className="mt-9 text-center text-sm sm:text-base md:text-lg text-white"
          >
            <p className="font-bold mb-2">Did You Know?</p>
            <p>{randomFact}</p>
          </div>

          {/* Button */}
          <button
            ref={buttonRef}
            className="bg-[#0D009C] text-white text-sm sm:text-base md:text-lg font-semibold mt-10 px-6 py-3 rounded-full shadow-lg hover:bg-blue-700"
          >
            Get Your Forecast
          </button>
        </div>
      )}
    </>
  );
};

export default SearchInitial;