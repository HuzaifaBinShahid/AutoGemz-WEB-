import React from 'react'

const GoogleIcon = () => {
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
        <g clipPath="url(#clip0_3384_3300)">
          <path
            d="M34.5487 21.9998H24.0483V26.4997H29.9993C29.0487 29.5 26.6993 30.5001 24.0006 30.5001C22.9551 30.5013 21.9248 30.2504 20.9969 29.7686C20.0691 29.2867 19.2712 28.5882 18.6709 27.7323C18.0706 26.8763 17.6857 25.8882 17.5487 24.8517C17.4117 23.8153 17.5267 22.7611 17.884 21.7785C18.2413 20.796 18.8303 19.9142 19.6011 19.2078C20.3719 18.5015 21.3017 17.9915 22.3116 17.7211C23.3215 17.4507 24.3817 17.4279 25.4023 17.6546C26.4229 17.8813 27.3737 18.3509 28.1742 19.0234L31.4439 15.9067C30.1269 14.6945 28.534 13.8219 26.8034 13.3648C25.0728 12.9076 23.2567 12.8797 21.5129 13.2835C19.769 13.6873 18.1501 14.5105 16.7965 15.6817C15.4429 16.853 14.3955 18.3369 13.7454 20.0046C13.0952 21.6724 12.8619 23.4736 13.0656 25.2519C13.2693 27.0303 13.904 28.732 14.9144 30.2095C15.9249 31.6871 17.2806 32.8957 18.864 33.7305C20.4474 34.5653 22.2106 35.001 24.0006 35C30.0662 35 35.5506 30.9997 34.5487 21.9998Z"
            fill="#A5A5A5"
            className="transition-all duration-300 group-hover:fill-primary"
          />
        </g>
        <defs>
          <clipPath id="clip0_3384_3300">
            <rect width="22" height="22" fill="white" transform="translate(13 13)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default GoogleIcon