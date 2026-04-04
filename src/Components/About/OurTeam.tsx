// src/components/OurTeam/OurTeam.tsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {
  Twitter,
  Linkedin,
  Send,
  Instagram,
  Facebook,
  MessageSquare,
  Youtube,
} from "lucide-react";
import VanillaTilt, { type TiltOptions } from "vanilla-tilt";
import TikTokIcon from "./TikTokIcon";

// Updated SocialsBar
interface SocialsProps {
  socials: {
    twitter?: string;
    linkedin?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    Youtube?: string;
  };
}    
const SocialsBar: React.FC<SocialsProps> = ({ socials }) => {
  const iconClass = "text-mg-gold font-black  hover:dark:text-white text-black} hover:text-mg-black transition-colors text-2xl";

  const visibleSocials = Object.entries(socials).filter(
    ([, link]) => link && link !== "#" && link !== ""
  );

  if (visibleSocials.length === 0) return null;

  const socialMap: Record<
    string,
    { icon: React.ReactNode; label: string }
  > = {
    twitter: { icon: <Twitter size={24} />, label: "Twitter Profile" },
    linkedin: { icon: <Linkedin size={24} />, label: "LinkedIn Profile" },
    telegram: { icon: <Send size={24} />, label: "Telegram" },
    instagram: { icon: <Instagram size={24} />, label: "Instagram Profile" },
    facebook: { icon: <Facebook size={24} />, label: "Facebook Profile" },
    whatsapp: { icon: <MessageSquare size={24} />, label: "WhatsApp" },
    Youtube: { icon: <Youtube size={24} />, label: "YouTube Channel" },
    Tictok: { icon: <TikTokIcon className={`w-7 h-7 `}/>, label: "TikTok Profile" },
  };



  return (
    <div className="flex justify-center space-x-5 mt-4 ">
      {visibleSocials.map(([key, link]) => {
        const info = socialMap[key];
        if (!info) return null;
        return (
          <a
            key={key}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label={info.label}
          >
            {info.icon}
          </a>
        );
      })}
    </div>
  );
};

// Team data
const teamMembers = [
  {
    name: "Eyram Dela",
    role: "Founder & Lead Mentor",
    image:
      "/ourteam/Eyram_Dela.png",
    socials: {
      twitter: "https://x.com/eyramdela",
      telegram: "https://t.me/delatrade",
      instagram: "https://www.instagram.com/eyram_dela",
      facebook: "https://web.facebook.com/eyram.akpey",
      whatsapp: "#",
      Youtube: "https://www.youtube.com/@marketgodcommunity",
      Tictok: "https://www.tiktok.com/@eyramdela_?_r=1&_t=ZM-9229kTUvSTT"
    },
  },
  {
    name: "Reuben Donasei",
    role: "Senior Tutor",
    image:
      "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763528538/55805e4a-88cd-4d12-ba4f-67e5bb9b119d.png",
    socials: {
      twitter: "#",
      telegram: "#",
      instagram: "https://instagram.com/Reuben_Donasei",
      facebook: "#",
      whatsapp: "#",
      Youtube: "#",
    },
  },

] as const;

type TeamMember = (typeof teamMembers)[number];

interface TeamMemberCardProps {
  member: TeamMember;
  isDark: boolean;
  cardRef: (element: HTMLDivElement | null) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  isDark,
  cardRef,
}) => {
  return (
    <div
      className={`tilt-card p-6 rounded-3xl shadow-xl transition-all duration-300 h-full dark:shadow-mg-gold/10 ${
        isDark ? "bg-mg-charcoal/60 text-mg-paper" : "bg-white/80 text-mg-charcoal"
      }`}
      ref={cardRef}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-64 md:h-96 object-cover object-top rounded-2xl mb-4 border-4 border-mg-white  shadow-lg"
      />
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-mg-gold font-semibold mb-4">{member.role}</p>
        <SocialsBar socials={member.socials} />
      </div>
    </div>
  );
};

const OurTeam: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tiltRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    tiltRefs.current.forEach((el) => {
      if (el && !(el as any).vanillaTilt) {
        VanillaTilt.init(el, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.25,
          perspective: 1000,
        } as TiltOptions);
      }
    });

    return () => {
      tiltRefs.current.forEach((el) => {
        if (el && (el as any).vanillaTilt) {
          (el as any).vanillaTilt.destroy();
        }
      });
    };
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-black ${
              isDark ? "text-mg-gold" : "text-mg-charcoal"
            }`}
          >
            Meet the Team
          </h2>
          <p
            className={`mt-3 text-lg ${
              isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"
            }`}
          >
            The brains and mentors driving the Marketgod Academy.
          </p>
        </motion.div>

        {/* Mobile: Swiper */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide key={i}>
                <TeamMemberCard
                  member={member}
                  isDark={isDark}
                  cardRef={(el) => (tiltRefs.current[i] = el)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-12">
          {teamMembers.map((member, i) => (
            <TeamMemberCard
              key={i}
              member={member}
              isDark={isDark}
              cardRef={(el) => (tiltRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;


