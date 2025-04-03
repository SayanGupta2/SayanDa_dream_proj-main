import React from "react";
import Slider from "react-slick";
import SayanImage from "../data/images/Sayan_M.jpg";
import SayanGupta from "../data/images/Sayan-Gupta.jpg";
import Anupam from "../data/images/Anupam-Sanfui.jpg";
import Rupankar from "../data/images/Rupankar.png";
import Tridib from "../data/images/Tridib.png";
import Dwip from "../data/images/Dwip.png";



// Import the CSS directly in this component if needed
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// Define TypeScript interfaces
interface TeamMember {
    name: string;
    role: string;
    imageSrc: string;
    linkedin: string;
    github?: string; // Optional property
}

interface TeamMemberCardProps {
    member: TeamMember;
}

// Sample team members data
const teamMembers: TeamMember[] = [
    {
        name: "Sayan Gupta",
        role: "CYBER SECURITY || CEH_V12 || PENETRATION TESTING",
        // For React/TypeScript, use imported images or relative paths to /public
        imageSrc: SayanGupta,
        linkedin: "https://www.linkedin.com/in/sayangupta002",
        github: "https://github.com/SayanGupta2",
    },
    {
        name: "Anupam Sanfui",
        role: "Cyber Security Analyst",
        imageSrc: Anupam,
        linkedin: "https://www.linkedin.com/in/anupam-sanfui-4aab85200",
        github: "",
    },
    {
        name: "Sayan Maity",
        role: "Advanced Data Analytics & ML Intern",
        imageSrc: SayanImage,
        linkedin: "https://www.linkedin.com/in/sayan-maity-756b8b244/",
        github: "https://github.com/Sayan-Maity-Code",
    },
    {
        name: "Rupankar Garai",
        role: "Freelancer with 2 years of experience || Intern at Edunet Foundation || Tech Adventure ||",
        imageSrc: Rupankar,
        linkedin: "https://www.linkedin.com/in/rupankar-garai-aa1773223/",
        github: "https://github.com/RupankarGarai2003",
    },
    {
        name: "Tridib Kamal",
        role: "DATA ANALYTICS || SQL || ETL || POWER BI Specialist",
        imageSrc: Tridib,
        linkedin: "https://www.linkedin.com/in/tridib-kamal-14073b231",
    },
    {
        name: "Dwip Mondal",
        role: "Computer Science Engineer",
        imageSrc: Dwip,
        linkedin: "https://www.linkedin.com/in/dwip-mondal-3161552b9/",
    },
];

// Create a default avatar image
// Don't use string concatenation for SVGs in TypeScript to avoid escaping issues
// Define a function that creates and encodes a proper SVG
const createInitialsAvatar = (name: string): string => {
    const initials = name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#718096"/>
    <text x="50" y="55" font-family="Arial" font-size="35" text-anchor="middle" fill="white">${initials}</text>
  </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Default fallback avatar path - make sure this exists in your public folder
const DEFAULT_AVATAR = "/images/default-avatar.png";

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
    // Handle image error
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        const target = e.target as HTMLImageElement;
        // Prevent further errors on this element
        target.onerror = null;

        // Try the default avatar
        target.src = DEFAULT_AVATAR;

        // If default avatar also fails, create an SVG with initials
        target.onerror = () => {
            if (target) {
                target.onerror = null;
                target.src = createInitialsAvatar(member.name);
            }
        };
    };

    return (
        <div className="p-4">
            <div className="text-center p-6 rounded-lg bg-gray-800 bg-opacity-50" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="w-28 h-28 mx-auto rounded-full mb-4 border-4 border-secondary overflow-hidden">
                    <img
                        src={member.imageSrc}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                </div>

                <h3 className="font-space font-semibold text-lg text-white">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>

                <div className="flex justify-center mt-4 space-x-4">
                    {member.linkedin && (
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Visit ${member.name}'s LinkedIn`}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <svg
                                className="w-6 h-6 text-secondary hover:text-white transition-colors"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.92-3.152-1.92 0-2.214 1.5-2.214 3.052v5.6h-3v-10h2.88v1.367h.041c.4-.756 1.376-1.554 2.833-1.554 3.027 0 3.586 1.992 3.586 4.584v5.603z" />
                            </svg>
                        </a>
                    )}
                    {member.github && (
                        <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Visit ${member.name}'s GitHub`}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <svg
                                className="w-6 h-6 text-secondary hover:text-white transition-colors"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.807 5.623-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.585 8.2-6.081 8.2-11.384 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// Define slider settings interface
interface SliderSettings {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    autoplaySpeed: number;
    responsive: Array<{
        breakpoint: number;
        settings: {
            slidesToShow: number;
        };
    }>;
}

const TeamCarousel: React.FC = () => {
    // React-slick settings
    const settings: SliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    // Fallback if Slider has issues
    if (typeof Slider === 'undefined') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                ))}
            </div>
        );
    }

    return (
        <div className="team-carousel-container">
            {/* Add inline styles for carousel container */}
            <style >{`
        .team-carousel-container .slick-slide {
          padding: 1rem;
        }
        .team-carousel-container .slick-dots {
          bottom: -40px;
        }
        .team-carousel-container .slick-dots li button:before {
          color: white;
        }
      `}</style>

            <Slider {...settings}>
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                ))}
            </Slider>
        </div>
    );
};

export default TeamCarousel;