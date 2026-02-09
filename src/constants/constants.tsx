import type { Service, BlogPost, Payment, Notification, AuctionCar } from "@/interfaces";
import type { CarCardProps } from "@/components/common/CarCard";
import React from "react";
import FamilyCarFilterIcon from "@/assets/svg/FamilyCarFilterIcon";
import CarIcon1 from "@/assets/svg/CarIcon1";
import CarIcon2 from "@/assets/svg/CarIcon2";
import ImportedCarIcon from "@/assets/svg/ImportedCarIcon";
import SamllCarIcon from "@/assets/svg/SamllCarIcon";
import CarIcon3 from "@/assets/svg/CarIcon3";
import TotalAmountIcon from "@/assets/svg/TotalAmountIcon";
import RemaningAmountIcon from "@/assets/svg/RemaningAmountIcon";
import ReturnAmountIcon from "@/assets/svg/ReturnAmountIcon";

export const dummyBlogPosts: (BlogPost & { category?: string })[] = [
  {
    id: "1",
    title: "BENEFITS OF REGULAR OIL CHANGES: WHY ESSENTIAL",
    excerpt:
      "Stay informed about new car releases! Trust Autofix for all your automotive news needs.",
    content: "Full content here...",
    author: "Drew Adams",
    date: "2024-07-14",
    image: "/images/blog/BlogImage1.jpg",
    category: "GUIDES",
  },
  {
    id: "2",
    title: "DIY CAR CARE: SIMPLE FIXES YOU CAN EASILY DO AT HOME",
    excerpt:
      "Stay informed about new car releases! Trust Autofix for all your automotive news needs.",
    content: JSON.stringify({
      sections: [
        {
          heading: "DIY CAR CARE: SIMPLE FIXES YOU CAN DO AT HOME",
          intro: "Taking care of your car doesn't have to be complicated or expensive. With a few basic tools and some know-how, you can handle many maintenance tasks yourself. This guide will walk you through simple DIY car care fixes that you can easily do at home, helping you save money and keep your vehicle running smoothly.",
        },
        {
          heading: "THE BASICS OF DIY CAR MAINTENANCE",
          intro: "While some car repairs require professional tools and expertise, many maintenance tasks can be handled with minimal equipment. Regular DIY maintenance not only saves money but also helps you understand your vehicle better. Here are some simple fixes you can tackle:",
          items: [
            {
              title: "Replacing Wiper Blades",
              description: "Swap out worn or damaged wiper blades in minutes for clearer visibility during rain or snow."
            },
            {
              title: "Tire Care",
              description: "Check tire pressure regularly with a gauge and inflate to the recommended PSI. Rotate your tires every 5,000-7,500 miles to ensure even wear."
            },
            {
              title: "Changing the Air Filter",
              description: "A clean air filter improves engine efficiency and is easy to replace using basic tools."
            },
            {
              title: "Battery Maintenance",
              description: "Keep your battery terminals clean and free of corrosion. A simple baking soda and water solution can help."
            }
          ],
          image: "/images/blog/BlogImage2.jpg"
        },
        {
          heading: "When to Call in the Pros",
          intro: "The frequency of oil changes depends on your car’s make, model, and the type of oil used. While older vehicles often required oil changes every 3,000 miles, modern cars can go 5,000 to 10,000 miles or more. Always consult your owner’s manual or a trusted mechanic to determine the right interval for your vehicle.",
        },
        {
          heading: "Why Trust Autofix for Your Oil Changes?",
          intro: "While DIY maintenance is rewarding, some repairs are best left to experts. Tasks like engine diagnostics, transmission work, and electrical repairs require specialized tools and expertise. At Autofix, our certified technicians are here to handle the complex jobs, ensuring your car receives the best care.",
        },
        {
          quote: "Taking care of your car is about more than convenience —it's about building a lasting connection with the vehicle that gets you where you need to go.",
        },
        {
          heading: "Stay Confident on the Road",
          intro: "With a little effort and the right knowledge, DIY car care can be a rewarding experience. For the tasks that go beyond your toolbox, trust Autofix to provide expert maintenance and repair. Together, we'll keep your car running smoothly and reliably for years to come.",
        },
        {
          tagsHeading: "RELATED TAGS",
          tags: [
            "Bumper-to-Bumper Original",
            "Like New",
            "Authorized Workshop Maintained",
            "Minor Accidental Cars",
            "Complete Service History",
            "Fresh Import",
            "Price Negotiable"
          ]
        },
      ]
    }),
    author: "Quinn Bailey",
    date: "2024-07-19",
    image: "/images/blog/BlogImage2.jpg",
    category: "LIFESPAN",
  },
  {
    id: "3",
    title: "ELECTRIC VEHICLES: THE FUTURE OF AUTOMOTIVE",
    excerpt:
      "Discover how electric vehicles are revolutionizing the automotive industry and what to expect.",
    content: "Full content here...",
    author: "Mike Johnson",
    date: "2024-01-16",
    image: "/images/blog/BlogImage3.jpg",
    category: "NEWS",
  },
  {
    id: "4",
    title: "WINTER DRIVING SAFETY GUIDE",
    excerpt:
      "Essential safety tips and precautions for driving in winter conditions.",
    content: "Full content here...",
    author: "Sarah Williams",
    date: "2024-01-17",
    image: "/images/blog/BlogImage4.jpg",
    category: "GUIDES",
  },
  {
    id: "5",
    title: "BEST SUVS FOR FAMILY ADVENTURES",
    excerpt:
      "Explore the top-rated SUVs perfect for family trips and outdoor adventures.",
    content: "Full content here...",
    author: "David Brown",
    date: "2024-01-18",
    image: "/images/blog/BlogImage5.jpg",
    category: "REVIEWS",
  },
  {
    id: "6",
    title: "UNDERSTANDING CAR INSURANCE: A COMPLETE GUIDE",
    excerpt:
      "Everything you need to know about car insurance coverage and choosing the right policy.",
    content: "Full content here...",
    author: "Emily Davis",
    date: "2024-01-19",
    image: "/images/blog/BlogImage6.jpg",
    category: "GUIDES",
  },
];
export const faqItems = [
  {
    id: 1,
    question: "WHAT SERVICES DO YOU OFFER?",
    answer:
      "We provide comprehensive automotive services including maintenance, repairs, and customization to keep your vehicle running smoothly.",
  },
  {
    id: 2,
    question: "HOW DO I SCHEDULE AN APPOINTMENT?",
    answer:
      "You can schedule an appointment through our website, by calling us, or by visiting our service center in person.",
  },
  {
    id: 3,
    question: "HOW DO I MAINTAIN MY CAR'S BATTERY?",
    answer:
      "Regular battery maintenance includes checking connections, cleaning terminals, and having it tested periodically.",
  },
  {
    id: 4,
    question: "WHAT DOES THE CHECK ENGINE LIGHT MEAN?",
    answer:
      "The check engine light indicates a problem with your vehicle's engine, emissions system, or transmission. We can diagnose it for you.",
  },
  {
    id: 5,
    question: "DO YOU OFFER FLEET SERVICES?",
    answer: "Yes, we offer specialized fleet management services for businesses with multiple vehicles.",
  },
  {
    id: 6,
    question: "CAN YOU HELP WITH CAR CUSTOMIZATION?",
    answer: "We can help customize your vehicle with performance upgrades and aesthetic modifications.",
  },
  {
    id: 7,
    question: "HOW OFTEN SHOULD I SERVICE MY CAR?",
    answer:
      "Most vehicles should be serviced every 6 months or 10,000 kilometers, depending on manufacturer recommendations.",
  },
  {
    id: 8,
    question: "WHAT MAKES YOUR SERVICE UNIQUE?",
    answer: "We provide expert technicians, quality parts, competitive pricing, and excellent customer service.",
  },
]

export const SERVICES: Service[] = [
  {
    id: "service1",
    title: "Web Development",
    description:
      "Professional web development services using modern technologies and best practices.",
    price: 2999,
  },
  {
    id: "service2",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile application development for iOS and Android.",
    price: 4999,
  },
  {
    id: "service3",
    title: "UI/UX Design",
    description:
      "Beautiful and intuitive user interface and user experience design services.",
    price: 1999,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn how to build modern web applications with Next.js 14 and the App Router.",
    content:
      "Next.js 14 introduces many exciting features including the App Router, Server Components, and improved performance. In this article, we'll explore how to get started with Next.js 14 and build a modern web application.",
    author: "John Doe",
    date: "2024-01-15",
    image: "/images/blog-1.jpg",
  },
  {
    id: "2",
    title: "Mastering TypeScript in React",
    excerpt:
      "A comprehensive guide to using TypeScript effectively in React applications.",
    content:
      "TypeScript brings type safety to React applications, making them more maintainable and less prone to errors. Learn how to leverage TypeScript's features in your React projects.",
    author: "Jane Smith",
    date: "2024-01-10",
    image: "/images/blog-2.jpg",
  },
  {
    id: "3",
    title: "Tailwind CSS Best Practices",
    excerpt:
      "Tips and tricks for building beautiful UIs with Tailwind CSS.",
    content:
      "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly. Discover best practices and advanced techniques for using Tailwind CSS effectively.",
    author: "Mike Johnson",
    date: "2024-01-05",
    image: "/images/blog-3.jpg",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    amount: 850000,
    status: "paid",
    date: "2025-11-02",
    description: "2023 Ford Mustang GT",
    carName: "2023 Ford Mustang GT",
    carImage: "/images/blog/BlogImage1.jpg",
    transactionId: "TXN-29384",
    type: "payable",
  },
  {
    id: "pay-2",
    amount: 400000,
    status: "pending",
    date: "2025-10-28",
    description: "2022 Toyota Camry",
    carName: "2022 Toyota Camry",
    carImage: "/images/cars/toyota-camry.jpg",
    transactionId: "TXN-29385",
    type: "payable",
  },
  {
    id: "pay-3",
    amount: 50000,
    status: "in_process",
    date: "2025-10-25",
    description: "2021 Honda Civic Refund",
    carName: "2021 Honda Civic",
    carImage: "/images/cars/honda-civic.jpg",
    transactionId: "TXN-29386",
    type: "return",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "Auction Update",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "info",
    read: false,
    date: "2024-01-20T22:35:00Z",
  },
  {
    id: "notif-2",
    title: "Payment Confirmed",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "success",
    read: false,
    date: "2024-01-20T20:15:00Z",
  },
  {
    id: "notif-3",
    title: "Car Inspection Scheduled",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "info",
    read: false,
    date: "2024-01-20T18:45:00Z",
  },
  {
    id: "notif-4",
    title: "Bid Placed Successfully",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "success",
    read: true,
    date: "2024-01-20T15:30:00Z",
  },
  {
    id: "notif-5",
    title: "New Auction Available",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "info",
    read: true,
    date: "2024-01-20T12:20:00Z",
  },
  {
    id: "notif-6",
    title: "Document Received",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit. Lorem ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean sit ",
    type: "info",
    read: true,
    date: "2024-01-20T10:10:00Z",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Service 1", href: "/services/service1" },
      { label: "Service 2", href: "/services/service2" },
      { label: "Service 3", href: "/services/service3" },
    ],
  },
];

// ============================================
// ABOUT US DATA
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  avatar: string;
  rating: number;
}

export interface TrustFeature {
  icon: string;
  title: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "JACKSON COLE",
    role: "LEAD TECHNICIAN",
    image: "/images/about/team/Member1.jpg",
  },
  {
    id: "2",
    name: "EVELYN PARKER",
    role: "SERVICE MANAGER",
    image: "/images/about/team/Member2.jpg",
  },
  {
    id: "3",
    name: "LUCAS THOMPSON",
    role: "DIAGNOSTIC EXPERT",
    image: "/images/about/team/Member3.jpg",
  },
  {
    id: "4",
    name: "SOPHIA TAYLOR",
    role: "CONTROL INSPECTOR",
    image: "/images/about/team/Member4.jpg",
  },
  {
    id: "5",
    name: "MICHAEL CHEN",
    role: "AUTO AUCTION SPECIALIST",
    image: "/images/about/team/Member3.jpg",
  },
  {
    id: "6",
    name: "EMMA WILSON",
    role: "QUALITY ASSURANCE",
    image: "/images/about/team/Member1.jpg",
  },
  {
    id: "7",
    name: "DAVID MARTINEZ",
    role: "CUSTOMER SUCCESS",
    image: "/images/about/team/Member4.jpg",
  },
  {
    id: "8",
    name: "OLIVIA BROWN",
    role: "IMPORT COORDINATOR",
    image: "/images/about/team/Member2.jpg",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "The bidding process was smooth and transparent. I found my dream car at a great price and the dashboard made it super easy to track everything.",
    author: "Daniel Rosewell",
    avatar: "/images/about/team/Member1.jpg",
    rating: 5.0,
  },
  {
    id: "2",
    quote:
      "Excellent service from start to finish. The team was professional, transparent, and helped me import my vehicle without any hassle. Highly recommended!",
    author: "Sarah Johnson",
    avatar: "/images/about/team/Member2.jpg",
    rating: 5.0,
  },
  {
    id: "3",
    quote:
      "I've been using AUTO GEMZ for all my car needs. The transparency in every transaction and the quality of service is unmatched. Truly a game-changer!",
    author: "Robert Kim",
    avatar: "/images/about/team/Member3.jpg",
    rating: 5.0,
  },
  {
    id: "4",
    quote:
      "The team made importing my dream car so easy. Every step was explained clearly, and I felt confident throughout the entire process. Amazing experience!",
    author: "Lisa Anderson",
    avatar: "/images/about/team/Member4.jpg",
    rating: 5.0,
  },
];

export const TRUST_FEATURES: TrustFeature[] = [
  {
    icon: "🚗",
    title: "PROMOTING 100% TRANSPARENCY IN CAR DEALS",
  },
  {
    icon: "✅",
    title: "CREATING A SEAMLESS BUYING EXPERIENCE",
  },
  {
    icon: "🏁",
    title: "PAKISTAN'S CAR MARKETPLACE WITH INNOVATION",
  },
  {
    icon: "🔍",
    title: "PROMOTING 100% TRANSPARENCY IN CAR DEALS",
  },
];

// ============================================
// AUCTION CARS DATA
// ============================================

export const MOCK_AUCTION_CARS: AuctionCar[] = [
  {
    id: "1",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "active",
    currentBid: 1200000,
    startPrice: 1200000,
    bidderCount: 12,
    timer: "OD 5H OS",
  },
  {
    id: "2",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "won",
    winningBid: 1200000,
    badge: "WINNER",
  },
  {
    id: "3",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "active",
    currentBid: 1200000,
    startPrice: 1200000,
    bidderCount: 12,
    timer: "OD 5H OS",
  },
  {
    id: "4",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "scheduled",
    scheduleBid: 1250000,
  },
  {
    id: "5",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "ended",
    currentBid: 1200000,
    startPrice: 1200000,
    badge: "LOST",
  },
  {
    id: "6",
    carName: "2023 Ford Mustang GT",
    year: "2017",
    mileage: "15000 KM",
    image: "/images/blog/BlogImage1.jpg",
    status: "outbid",
    yourBid: 200000,
    winningBid: 1200000,
    badge: "OUTBID",
  },
];

// ============================================
// CURRENT AUCTIONS DATA (for home page)
// ============================================

export interface CurrentAuction {
  id: string;
  carName: string;
  year: string;
  mileage: string;
  image: string;
  status: "active" | "soon" | "close";
  currentBid: number;
  timeRemaining?: string;
  isHot?: boolean;
  date: string;
}

export const CURRENT_AUCTIONS: CurrentAuction[] = [
  {
    id: "current-1",
    carName: "2023 FORD MUSTANG GT",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "active",
    date: "2025-11-17",
    currentBid: 1200000,
    timeRemaining: "1D 45H 3S",
    isHot: true,
  },
  {
    id: "current-2",
    carName: "2023 FORD MUSTANG GT",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "soon",
    currentBid: 1200000,
    date: "2025-11-17",
    timeRemaining: "1D 45H 3S",
  },
  {
    id: "current-3",
    carName: "2023 FORD MUSTANG",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "close",
    currentBid: 1200000,
    date: "2025-11-17",
  },
  {
    id: "current-4",
    carName: "2023 FORD MUSTANG GT",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "active",
    currentBid: 1200000,
    timeRemaining: "2D 12H 30S",
    isHot: true,
    date: "2025-11-17",
  },
  {
    id: "current-5",
    carName: "2023 FORD MUSTANG GT",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "soon",
    currentBid: 1200000,
    timeRemaining: "3D 8H 15S",
    date: "2025-11-17",
  },
  {
    id: "current-6",
    carName: "2023 FORD MUSTANG GT",
    year: "2017",
    mileage: "152,000 km",
    image: "/images/blog/BlogImage1.jpg",
    status: "active",
    currentBid: 1200000,
    timeRemaining: "5H 20M 10S",
    date: "2025-11-17",
  },
];

// ============================================
// HOW IT WORKS DATA
// ============================================

export interface HowItWorksStep {
  id: string;
  badgeNumber: string;
  title: string;
  tagline: string;
  backgroundImage: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "1",
    badgeNumber: "01",
    title: "JOIN THE AUCTION",
    tagline: "Sign up quickly to start bidding or selling your car",
    backgroundImage: "/images/home/1st.png",
  },
  {
    id: "2",
    badgeNumber: "02",
    title: "BROWSE OR LIST CARS",
    tagline: "Buyers browse live auctions. Sellers list cars with photos and details.",
    backgroundImage: "/images/home/2nd.png",
  },
  {
    id: "3",
    badgeNumber: "03",
    title: "PLACE YOUR BID",
    tagline: "Bid in real-time and track auction countdowns easily.",
    backgroundImage: "/images/home/3rd.png",
  },
  {
    id: "4",
    badgeNumber: "04",
    title: "WIN & COMPLETE",
    tagline: "Winning bidder completes payment and the seller finalizes the sale.",
    backgroundImage: "/images/home/1st.png", // Using 1st.png as fallback, can be updated when 4th image is available
  },
];

// ============================================
// FILTER CONSTANTS
// ============================================

export interface BodyType {
  name: string;
  icon: React.ReactElement;
}

export const BODY_TYPES: BodyType[] = [
  { name: "Family Cars", icon: <FamilyCarFilterIcon /> },
  { name: "1300cc cars", icon: <CarIcon1 /> },
  { name: "5 Seater", icon: <CarIcon2 /> },
  { name: "Imported cars", icon: <ImportedCarIcon /> },
  { name: "Small cars", icon: <SamllCarIcon /> },
  { name: "1300cc cars", icon: <CarIcon3 /> },
];

export const SPECIFICATIONS = [
  "Engine Type",
  "Sunroof",
  "Parking Sensors",
  "Alloy Wheels",
  "Automatic",
  "Manual",
  "Heated Seats",
];

export const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

export const TRANSMISSION_TYPES = ["Automatic Matic", "Manual", "CVT", "DCT"];

export const NUMBER_OF_SEATS = ["Seats 2", "Seats 4", "Seats 5", "Seats 7", "Seats 8"];

export const COLORS = ["Black", "White", "Silver", "Red", "Blue", "Gray"];

// ============================================
// BID SCREEN DATA
// ============================================

export interface Bidder {
  rank: number;
  name: string;
  bid: string;
  timeAgo: string;
  isYou?: boolean;
}

export interface CarInspection {
  overallRating: number;
  categories: {
    name: string;
    percentage: number;
  }[];
}

export interface CarFeature {
  name: string;
  icon: string;
}

export interface FeatureIconMapping {
  title: string;
  iconKey: string;
}

export interface CarDetail {
  label: string;
  value: string;
}

export const BID_SCREEN_BIDDERS: Bidder[] = [
  { rank: 61, name: "Ahmed Saleem", bid: "12,00,00", timeAgo: "39 minutes ago" },
  { rank: 62, name: "Sara Charle", bid: "11,00,00", timeAgo: "02 minutes ago" },
  { rank: 63, name: "Harry Lincons", bid: "10,00,00", timeAgo: "09 minutes ago" },
  { rank: 64, name: "Mehew Jame (You)", bid: "9,00,00", timeAgo: "30 minutes ago", isYou: true },
];

export const BID_SCREEN_CAR_IMAGES = [
  "/images/blog/BlogImage1.jpg",
  "/images/blog/BlogImage1.jpg",
  "/images/blog/BlogImage1.jpg",
  "/images/blog/BlogImage1.jpg",
  "/images/blog/BlogImage1.jpg",
  "/images/blog/BlogImage1.jpg",
];

export const BID_SCREEN_INSPECTION: CarInspection = {
  overallRating: 8.3,
  categories: [
    { name: "EXTERIOR & BODY", percentage: 90 },
    { name: "ENGINE / CLUTCH", percentage: 85 },
    { name: "STEERING", percentage: 95 },
    { name: "INTERIOR", percentage: 95 },
    { name: "AC / HEATER", percentage: 95 },
  ],
};

export const BID_SCREEN_FEATURES: CarFeature[] = [
  { name: "Parking Sensors", icon: "parkingSensor" },
  { name: "Petrol", icon: "petrol" },
  { name: "Cruise Control", icon: "cruiseControl" },
  { name: "Navigation", icon: "navigation" },
  { name: "Navigation", icon: "navigation" },
  { name: "Reversing Camera", icon: "reversingCamera" },
  { name: "Bluetooth", icon: "bluetooth" },
  { name: "Digital Display", icon: "digitalDisplay" },
];

export const FEATURE_ICON_MAPPING: FeatureIconMapping[] = [
  { title: "Parking Sensors", iconKey: "parkingSensor" },
  { title: "Cruise Control", iconKey: "cruiseControl" },
  { title: "Reversing Camera", iconKey: "reversingCamera" },
  { title: "Digital Display", iconKey: "digitalDisplay" },
  { title: "Navigation", iconKey: "navigation" },
  { title: "Bluetooth", iconKey: "bluetooth" },
  { title: "Petrol", iconKey: "petrol" },
];

export const BID_SCREEN_BASIC_DETAILS: CarDetail[] = [
  { label: "Model", value: "2019 hatchback" },
  { label: "Mileage", value: "34,000 km" },
  { label: "Type", value: "Automatic" },
  { label: "Engine Type", value: "2.0-liter four-cylinder" },
  { label: "Owner", value: "2" },
  { label: "Color", value: "White" },
];

export const BID_SCREEN_SPECIFICATIONS: CarDetail[] = [
  { label: "Registered in", value: "Un-Registered" },
  { label: "Assembly", value: "Imported" },
  { label: "Engine Capacity", value: "660 cc" },
  { label: "Last Updated", value: "Oct 13, 2025" },
  { label: "Color", value: "Gold" },
  { label: "Transmission Type", value: "Yes In Agency" },
  { label: "Ad Ref #", value: "10571601" },
  { label: "Body Type", value: "Hatchback" },
];

export const BID_SCREEN_OWNERSHIP_INFO: CarDetail[] = [
  { label: "Currently financed?", value: "Yes" },
  { label: "No Of Keys", value: "02" },
  { label: "Car Registration City", value: "Texas" },
];

export const BID_SCREEN_CAR_INFO = {
  title: "TOYOTA COROLLA HATCHBACK MID-SPEC",
  startPrice: "12,0000",
  finalPrice: "OPEN FOR BIDDING",
  location: "Lohare",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "All Cars", href: "/used-cars" },
    { label: "Family Cars", href: "/used-cars?category=family" },
    { label: "Toyota Corolla hatchback Mid-Spec", href: "#" },
  ],
  minimumBid: "RS 10,000",
  totalBid: "RS 10,000",
  bidSuggestion: "Bid $34,000 or higher to take 1st place.",
  rankNote: "Place a higher bid to move your offer up in the auction list. You'll only pay if your bid remains in the top spots when the auction closes.",
  initialBidAmount: "30,00,00",
  countdownHours: 1,
  countdownMinutes: 59,
  countdownSeconds: 59,
};

export const BID_SCREEN_RELATED_CARS: CarCardProps[] = [
  {
    id: "1",
    title: "2023 Ford Mustang GT",
    image: "/images/car-1.jpg",
    currentBid: "12,00,00",
    mileage: "152,000 km",
    year: "2017",
    status: "Available" as const,
    timer: "1H 45M 3S",
  },
  {
    id: "2",
    title: "2023 Ford Mustang GT",
    image: "/images/car-2.jpg",
    currentBid: "12,00,00",
    mileage: "152,000 km",
    year: "2017",
    status: "Item Sold" as const,
  },
  {
    id: "3",
    title: "2023 Ford Mustang GT",
    image: "/images/car-3.jpg",
    currentBid: "12,00,00",
    mileage: "152,000 km",
    year: "2017",
    status: "Coming Soon" as const,
    timer: "10 45M 3S",
  },
  {
    id: "4",
    title: "2023 Ford Mustang GT",
    image: "/images/car-4.jpg",
    currentBid: "12,00,00",
    mileage: "152,000 km",
    year: "2017",
    status: "Coming Soon" as const,
    timer: "10 45M 3S",
  },
];

// ============================================
// INSPECTION REPORT DATA
// ============================================

export interface InspectionChecklistItem {
  label: string;
  status: "good" | "error" | "warning";
  value: string;
  hasViewButton?: boolean;
}

export interface InspectionCategory {
  name: string;
  percentage: number;
  items: InspectionChecklistItem[];
}

export interface ExteriorDamage {
  type: "P" | "D1" | "D2" | "W2";
  position: string;
  label: string;
}

export interface CarSpecification {
  label: string;
  value: string;
}

export const INSPECTION_REPORT_DATA = {
  vehicleModel: "TOYOTA COROLLA HATCHBACK MID-SPEC",
  location: "Lahore",
  overallRating: 5.74,
  maxRating: 10,
  inspectionDate: "2025-07-23",
  registrationNo: "BPV-522",
  engineNo: "3820-159689",
  chassisNo: "B21W-0210617",
  specifications: [
    { label: "Inspection Date", value: "2025-07-23" },
    { label: "Engine Type", value: "Petrol" },
    { label: "Registration No", value: "BPV-522" },
    { label: "CNG Install", value: "N/A" },
    { label: "Mileage", value: "106905" },
    { label: "Engine No", value: "3820-159689" },
    { label: "Transmission Type", value: "Automatic" },
    { label: "Registered City", value: "Karachi" },
    { label: "Engine Capacity", value: "660 cc" },
    { label: "Chassis No", value: "B21W-0210617" },
    { label: "Drive Type", value: "2WD" },
    { label: "Registered Year", value: "2019" },
  ] as CarSpecification[],
  inspectionSummary: [
    { name: "AC / HEATER", percentage: 90 },
    { name: "ENGINE / TRANSMISSION / CLUTCH", percentage: 85 },
    { name: "EXTERIOR", percentage: 90 },
    { name: "SKELETON", percentage: 95 },
    { name: "ACCIDENT CHECKLIST", percentage: 90 },
    { name: "BRAKES", percentage: 90 },
    { name: "SUSPENSION / STEERING", percentage: 85 },
    { name: "INTERIOR", percentage: 95 },
    { name: "ELECTRICAL & ELECTRONICS", percentage: 95 },
    { name: "TYRES", percentage: 85 },
  ],
  exteriorDamages: [
    { type: "P", position: "doors", label: "PAINT MARKED" },
    { type: "P", position: "fenders", label: "PAINT MARKED" },
    { type: "P", position: "hood", label: "PAINT MARKED" },
    { type: "P", position: "trunk", label: "PAINT MARKED" },
    { type: "D1", position: "hood", label: "SMALL DENT" },
    { type: "D2", position: "side", label: "DENT" },
    { type: "W2", position: "roof", label: "POLYCARBONATE" },
    { type: "W2", position: "side", label: "POLYCARBONATE" },
  ] as ExteriorDamage[],
  categories: [
    {
      name: "BODY FRAME ACCIDENT",
      percentage: 85,
      items: [
        { label: "Frame Condition", status: "good", value: "No Damage" },
        { label: "Accident History", status: "good", value: "None Reported" },
        { label: "Structural Integrity", status: "good", value: "Intact" },
      ],
    },
    {
      name: "SUSPENSION / STEERING",
      percentage: 85,
      items: [
        { label: "Front Suspension", status: "good", value: "Okay" },
        { label: "Rear Suspension", status: "good", value: "Okay" },
        { label: "Steering Wheel", status: "good", value: "Working" },
      ],
    },
    {
      name: "AC / HEATER",
      percentage: 90,
      items: [
        { label: "AC Fitted", status: "good", value: "Yes" },
        { label: "Heating", status: "good", value: "Excellent" },
        { label: "Cooling", status: "good", value: "Excellent" },
        { label: "Blower", status: "good", value: "Excellent Air Throw" },
        { label: "AC Operational", status: "good", value: "Yes" },
      ],
    },
    {
      name: "ENGINE / TRANSMISSION",
      percentage: 85,
      items: [
        { label: "Engine Condition", status: "good", value: "Average" },
        { label: "Transmission", status: "good", value: "Working" },
        { label: "Oil Level", status: "good", value: "Normal" },
      ],
    },
    {
      name: "INTERIOR",
      percentage: 95,
      items: [
        { label: "Seats Condition", status: "good", value: "Good" },
        { label: "Dashboard", status: "good", value: "Intact" },
        { label: "Carpet", status: "good", value: "Clean" },
      ],
    },
    {
      name: "BRAKES",
      percentage: 90,
      items: [
        { label: "Front Right Disc", status: "error", value: "Linings" },
        { label: "Front Left Disc", status: "error", value: "Linings" },
        { label: "Front Right Brake Pad", status: "good", value: "More than 50%" },
        { label: "Front Left Brake Pad", status: "good", value: "More than 50%" },
        { label: "Parking / Hand Brake", status: "good", value: "Okay" },
      ],
    },
    {
      name: "ELECTRICAL & ELECTRONICS",
      percentage: 95,
      items: [
        { label: "Computer Check up / Malfunction Check", status: "error", value: "Error" },
        { label: "Air Bag Warning Light", status: "error", value: "Present" },
        { label: "Rear View Camera", status: "good", value: "Working", hasViewButton: true },
        { label: "Battery Warning Light", status: "good", value: "Not Present" },
        { label: "Oil Pressure Low Warning Light", status: "good", value: "Not Present" },
        { label: "Temperature Warning Light / Gauge", status: "good", value: "Not Present" },
        { label: "Gauges", status: "good", value: "Working" },
        { label: "Power Steering Warning Light", status: "good", value: "Not Present", hasViewButton: true },
        { label: "ABS Warning Light", status: "good", value: "Not Present" },
        { label: "Key Fob Battery Low Light", status: "good", value: "Not Present" },
        { label: "Battery Voltage", status: "good", value: "12 cc" },
        { label: "Terminal Condition", status: "good", value: "Ok", hasViewButton: true },
        { label: "Charging", status: "good", value: "Ok" },
        { label: "Alternator Operation", status: "good", value: "Ok", hasViewButton: true },
      ],
    },
    {
      name: "EXTERIOR / BODY",
      percentage: 90,
      items: [
        { label: "Body Condition", status: "good", value: "Good" },
        { label: "Paint Condition", status: "warning", value: "Needs Buff" },
        { label: "Windows", status: "good", value: "Intact" },
      ],
    },
    {
      name: "TEST DRIVE",
      percentage: 90,
      items: [
        { label: "Performance", status: "good", value: "Smooth" },
        { label: "Handling", status: "good", value: "Good" },
        { label: "Noise Level", status: "warning", value: "AC Blower Noisy" },
      ],
    },
    {
      name: "TYRES",
      percentage: 85,
      items: [
        { label: "Front Tyres", status: "warning", value: "Need Change" },
        { label: "Rear Tyres", status: "warning", value: "Need Change" },
        { label: "Tread Depth", status: "good", value: "Within Limit" },
      ],
    },
  ] as InspectionCategory[],
  vehiclePictures: [
    "/images/AuthImage.jpg",
    "/images/BlogHeaderImage.jpg",
    "/images/AuthImage.jpg",
    "/images/BlogHeaderImage.jpg",
  ],
  comments: "Engine average Suspension work required AC blower noisy Both pillar showered Front windscreen change Airbag open Airbag light alteration Tyres need to be change Paint buff on all door frame.",
  disclaimer: "This report estimates the vehicle's condition based on visible parts, unseen parts are not considered, odometer reading is relied upon, and famewheels.com is not liable for verification or consequences arising from use.",
};

// ============================================
// PAYMENTS DATA
// ============================================

export interface SummaryCardConfig {
  id: string;
  title: string;
  valueKey: keyof { totalAmount: number; remaining: number; returns: number };
  icon: React.ComponentType;
}

export const PAYMENT_SUMMARY_CARDS: SummaryCardConfig[] = [
  {
    id: "totalAmount",
    title: "Total Amount",
    valueKey: "totalAmount",
    icon: TotalAmountIcon,
  },
  {
    id: "remaining",
    title: "Remaining",
    valueKey: "remaining",
    icon: RemaningAmountIcon,
  },
  {
    id: "returns",
    title: "Returns",
    valueKey: "returns",
    icon: ReturnAmountIcon,
  },
];

export const PAYMENT_TABS = [
  { value: "all", label: "All" },
  { value: "payable", label: "Payable" },
  { value: "return", label: "Return" },
] as const;

