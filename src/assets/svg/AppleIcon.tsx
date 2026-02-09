import React from 'react'

const AppleIcon = () => {
  return (
    <div className="cursor-pointer transition-all duration-300 hover:scale-105 group">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
        <rect 
          x="0.5" 
          y="0.5" 
          width="47" 
          height="47" 
          rx="23.5" 
          stroke="white" 
          strokeOpacity="0.18"
          className="transition-all duration-300 group-hover:stroke-opacity-30 group-hover:stroke-primary"
        />
        <path 
          d="M33.3542 28.4869C32.0162 27.9809 31.1212 26.7659 31.0202 25.3169C30.9212 23.9049 31.6132 22.6509 32.8712 21.9619L33.9172 21.3889L33.1702 20.4589C31.9152 18.8959 30.1192 17.9619 28.3662 17.9619C27.1512 17.9619 26.3082 18.2799 25.6312 18.5359C25.1532 18.7169 24.7762 18.8589 24.3622 18.8589C23.8902 18.8589 23.4242 18.6929 22.8842 18.5009C22.1762 18.2489 21.3742 17.9629 20.3442 17.9629C18.3542 17.9629 16.3472 19.1509 15.1072 21.0609C13.2562 23.9099 13.7642 28.7949 16.3152 32.6769C17.3262 34.2149 18.7432 35.9819 20.7502 35.9999C20.7632 35.9999 20.7762 35.9999 20.7892 35.9999C22.4322 35.9999 22.7922 35.1239 24.3872 35.1139C26.1292 35.1959 26.3492 36.0069 27.9762 35.9959C29.9372 35.9779 31.3512 34.2249 32.4752 32.5119C33.1392 31.5049 33.3962 30.9779 33.9132 29.8339L34.3512 28.8639L33.3542 28.4869Z" 
          fill="#A5A5A5"
          className="transition-all duration-300 group-hover:fill-primary"
        />
        <path 
          d="M27.1012 15.4503C27.7512 14.6163 28.2442 13.4393 28.0652 12.2363C27.0032 12.3093 25.7632 12.9843 25.0382 13.8643C24.3802 14.6633 23.8372 15.8473 24.0482 16.9993C25.2062 17.0353 26.4052 16.3433 27.1012 15.4503Z" 
          fill="#A5A5A5"
          className="transition-all duration-300 group-hover:fill-primary"
        />
      </svg>
    </div>
  )
}

export default AppleIcon