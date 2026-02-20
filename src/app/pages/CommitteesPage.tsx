import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../components/ui/accordion";

// Patron
import NarayanMaanay from "@/assets/Sri. Narayan Rao R. Maanay.jpeg";

// Patrons
import AshokMaanay from "@/assets/ashok-maanay.jpg";
import RamaMurthy from "@/assets/Prof. T. J. Rama Murthy.jpg";
import Kulkarni from "@/assets/Dr. S Y Kulkarni.webp";
import EishwarMaanay from "@/assets/Prof. Eishwar Maanay.jpg";
import Krishnamurthy from "@/assets/Dr. Krishnamurthy G N.webp";

// Chief Mentor
import PawanSingh from "@/assets/Dr. Pawan Kumar Singh.jpg";

// Advisory Board
import HarshPurohit from "@/assets/Dr. Harsh Purohit.jpg";
import Balasubramanya from "@/assets/Dr. Balasubramanya.jpg";
import PrakashSingh from "@/assets/Dr. Prakash Singh.jpg";
import MayankKumar from "@/assets/Dr. Mayank Kumar.jpg";
import AvinashSrivastava from "@/assets/Dr. Avinash Srivastava.jpg";
import AmitabhAnand from "@/assets/Dr. Amitabh Anand.jpg";

// Steering Committee
import VaishnaveeMaanay from "@/assets/Mrs. Vaishnavee Eishwar Maanay.jpg";

// Organizing Committee
import MukundSharma from "@/assets/Dr. N Mukund Sharma.webp";
import PadmaliniSingh from "@/assets/Dr.-Padmalini-Singh.jpeg.webp";
import NeethaMahadev from "@/assets/Dr. Neetha Mahadev.webp";
import BhavyaVikas from "@/assets/Dr-Bhavya-scaled.jpg.webp";
import CharithraCM from "@/assets/Dr-Charithra-scaled.jpg.webp";
import SharathAmbrose from "@/assets/MBA-Sharath-Ambrose-scaled.jpg.webp";
import ShiluVarghese from "@/assets/Shillu-varghese.jpg.webp";
import SanthoshKV from "@/assets/Santhosh-scaled.jpg.webp";
import JasmineFrancis from "@/assets/Jasmine-scaled.jpg.webp";
import RanjithaR from "@/assets/Ranjitha-scaled.jpg.webp";
import PrathyushaP from "@/assets/Prathyusha-Pasupuleti-Photo-1-scaled.jpg.webp";
import VasudhaSrivatsa from "@/assets/VS-pic-scaled.jpg.webp";
import VikramBalasubramanian from "@/assets/Mr.Vikaram.jpg.webp";
import SrinivasBharadwaj from "@/assets/MBA-Srinivas-Bharadwaj-scaled.jpg.webp";
import NandaKishore from "@/assets/MBA-Nanda-Kishore-Nadig-scaled.jpg.webp";
import PayalJindal from "@/assets/Mrs.Payal_.jpg.webp";
import harsha from "@/assets/harsha.jfif"



interface CommitteesPageProps {
  onNavigate: (page: string) => void;
}

export function CommitteesPage({ onNavigate }: CommitteesPageProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

const patron = {
  name: "Sri. Narayan Rao R. Maanay",
  designation: "Chairman, Governing Body, BNM Institute of Technology",
  bio:
    "Visionary leader committed to excellence in education and fostering innovation at BNMIT, Bengaluru.",
  image: NarayanMaanay
};

const patrons = [
  {
    name: "Sri. Ashok R. Maanay",
    designation: "Joint-Secretary, BNMEI, Bengaluru",
    image: AshokMaanay
  },
  {
    name: "Prof. T. J. Rama Murthy",
    designation: "Director, BNM Institute of Technology",
    image: RamaMurthy
  },
  {
    name: "Dr. S. Y. Kulkarni",
    designation: "Additional Director & Principal, BNMIT",
    image: Kulkarni
  },
  {
    name: "Prof. Eishwar N. Maanay",
    designation: "Dean, BNM Institute of Technology",
    image: EishwarMaanay
  },
  {
    name: "Dr. Krishnamurthy G. N.",
    designation: "Deputy Director, BNMIT",
    image: Krishnamurthy
  }
];

const chiefMentor = {
  name: "Dr. Pawan Kumar Singh",
  designation: "Director, IIM Trichy",
  role: "Chief Mentor",
  image: PawanSingh
};

const advisoryBoard = [
  {
    name: "Dr. Harsh Purohit",
    affiliation: "Professor, Dean, FMS, WISDOM, Banasthali Vidyapith",
    country: "Rajasthan, India",
    image: harsha
  },
  {
    name: "Dr. Balasubramanya",
    affiliation: "Professor, IISc Bengaluru",
    country: "Karnataka, India",
    image: Balasubramanya
  },
  {
    name: "Dr. Prakash Singh",
    affiliation: "Associate Professor, IIM Lucknow",
    country: "India",
    image: PrakashSingh
  },
  {
    name: "Dr. Mayank Kumar",
    affiliation: "Assistant Professor, IIM Ranchi",
    country: "India",
    image: MayankKumar
  },
  {
    name: "Dr. Avinash Srivastava",
    affiliation: "Associate Professor, IMI Kolkata",
    country: "India",
    image: AvinashSrivastava
  },
  {
    name: "Dr. Amitabh Anand",
    affiliation: "Associate Professor, Excelia Business School",
    country: "La Rochelle, France",
    image: AmitabhAnand
  }
];

const steeringCommittee = [
  {
    name: "Prof. Eishwar Maanay",
    designation: "Dean, BNMIT",
    image: EishwarMaanay
  },
  {
    name: "Mrs. Vaishnavee Eishwar Maanay",
    designation: "Head - Media and Marketing, BNMIT",
    image: VaishnaveeMaanay
  }
];

const organizingCommittee = [
  {
    role: "General Chair",
    members: [
      {
        name: "Dr. N Mukund Sharma",
        designation: "Professor & HoD, MBA, BNMIT",
        image: MukundSharma
      }
    ]
  },
  {
    role: "Organizing Chair",
    members: [
      {
        name: "Dr. Padmalini Singh",
        designation: "Professor, MBA Department",
        image: PadmaliniSingh
      }
    ]
  },
  {
    role: "Organizing Committee Members",
    members: [
      { name: "Dr. Neetha Mahadev", designation: "Professor", image: NeethaMahadev },
      { name: "Dr. Bhavya Vikas", designation: "Professor", image: BhavyaVikas },
      { name: "Dr. Charithra C. M.", designation: "Associate Professor", image: CharithraCM },
      { name: "Dr. Sharath Ambrose", designation: "Assistant Professor", image: SharathAmbrose },
      { name: "Dr. Shilu Varghese", designation: "Assistant Professor", image: ShiluVarghese },
      { name: "Mr. Santhosh K V", designation: "Assistant Professor", image: SanthoshKV },
      { name: "Mrs. Jasmine Francis", designation: "Assistant Professor", image: JasmineFrancis },
      { name: "Mrs. Ranjitha R", designation: "Assistant Professor", image: RanjithaR },
      { name: "Mrs. Prathyusha P", designation: "Assistant Professor", image: PrathyushaP },
      { name: "Mrs. Vasudha Srivatsa", designation: "Assistant Professor", image: VasudhaSrivatsa },
      { name: "Mr. Vikram Balasubramanian", designation: "Assistant Professor", image: VikramBalasubramanian },
      { name: "Mr. Srinivas Bharadwaj R", designation: "Assistant Professor", image: SrinivasBharadwaj },
      { name: "Mr. K Nanda Kishore Nadig", designation: "Assistant Professor", image: NandaKishore },
      { name: "Mrs. Payal Jindal", designation: "Assistant Professor & TPO", image: PayalJindal }
    ]
  }
];



  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[32px] sm:text-[42px] lg:text-[56px] xl:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Organizing <span className="text-[#F97316]">Committee</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed">
              Meet the distinguished team of academics and professionals making this conference possible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chief Patron - HRIC Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 sm:mb-12 text-center">
              Chief <span className="text-[#F97316]">Patron</span>
            </h2>
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 text-center max-w-[500px] mx-auto shadow-xl border border-[#E2E8F0]">
              {/* Photo */}
              <div className="w-32 h-40 sm:w-40 sm:h-48 mx-auto mb-6 rounded-xl overflow-hidden border-4 border-[#E2E8F0] shadow-lg">
                <img 
                  src={patron.image} 
                  alt={patron.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-[#0B1F3A] text-[22px] sm:text-[28px] lg:text-[32px] font-['Montserrat',sans-serif] font-bold mb-2">{patron.name}</h3>
              <p className="text-[#F97316] text-[14px] sm:text-[16px] font-semibold mb-4">{patron.designation}</p>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed mb-4">{patron.bio}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Patrons */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              <span className="text-[#F97316]">Patrons</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {patrons.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-[#E2E8F0] text-center hover:border-[#F97316] transition-all"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-[#E2E8F0] shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] flex items-center justify-center"><svg class="w-10 h-10 text-[#F97316]/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                    }}
                  />
                </div>
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold mb-1">{member.name}</h3>
                <p className="text-[#475569] text-[13px] sm:text-[14px]">{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chief Mentor */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-8 text-center">
              Chief <span className="text-[#F97316]">Mentor</span>
            </h2>
            <div className="bg-gradient-to-br from-[#F97316]/10 to-white rounded-2xl p-6 sm:p-8 text-center max-w-[400px] mx-auto shadow-lg border-2 border-[#F97316]">
              <div className="w-24 h-28 sm:w-32 sm:h-36 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-[#F97316] shadow-md">
                <img 
                  src={chiefMentor.image} 
                  alt={chiefMentor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] font-bold mb-1">{chiefMentor.name}</h3>
              <p className="text-[#F97316] text-[14px] sm:text-[16px] font-semibold mb-1">{chiefMentor.role}</p>
              <p className="text-[#475569] text-[13px] sm:text-[14px]">{chiefMentor.designation}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steering Committee */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              Steering <span className="text-[#F97316]">Committee</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-[800px] mx-auto">
            {steeringCommittee.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E2E8F0] text-center hover:border-[#F97316] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl mx-auto mb-4 sm:mb-5 overflow-hidden shadow-md border-2 border-[#E2E8F0]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-bold mb-2">{member.name}</h3>
                <p className="text-[#F97316] text-[14px] sm:text-[15px] font-medium">{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[48px] font-['Montserrat',sans-serif] font-bold mb-4 text-center">
              International Advisory <span className="text-[#F97316]">Board</span>
            </h2>
            <p className="text-[#475569] text-[15px] sm:text-[17px] lg:text-[18px] text-center max-w-[700px] mx-auto">
              Distinguished academics from leading institutions worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {advisoryBoard.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border-2 border-[#E2E8F0] hover:border-[#F97316] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex-shrink-0 overflow-hidden shadow-md border-2 border-[#E2E8F0]">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-[#F97316] text-[13px] sm:text-[14px] font-medium leading-snug">{member.affiliation}</p>
                    <p className="text-[#64748B] text-[12px] sm:text-[13px] mt-1">{member.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizing Committee */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div variants={fadeInUp} className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Organizing <span className="text-[#F97316]">Committee</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center max-w-[700px] mx-auto px-4">
              Dedicated team members ensuring a successful conference experience
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {organizingCommittee.map((committee, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <AccordionItem
                  value={`committee-${index}`}
                  className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden hover:border-[#F97316] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:no-underline">
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-lg w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[14px] sm:text-[16px] lg:text-[20px] font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[22px] xl:text-[24px] font-['Montserrat',sans-serif] font-bold text-left">
                        {committee.role}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                      {committee.members.map((member, memberIndex) => (
                        <motion.div
                          key={memberIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: memberIndex * 0.05 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E2E8F0] shadow-lg hover:shadow-xl hover:border-[#F97316] transition-all duration-300 text-center"
                        >
                          {/* Profile Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl mx-auto mb-4 sm:mb-5 overflow-hidden shadow-md border-2 border-[#E2E8F0]">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <h4 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[20px] font-['Montserrat',sans-serif] font-bold mb-2">{member.name}</h4>
                          <p className="text-[#F97316] text-[13px] sm:text-[14px] lg:text-[15px] font-medium">{member.designation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center"
          >
            <h3 className="text-[24px] sm:text-[32px] lg:text-[40px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Join This Prestigious Conference
            </h3>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto px-2">
              Be part of an event organized by leading academics and reviewed by expert scholars
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("registration")}
              className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}