import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface TracksPageProps {
  onNavigate: (page: string) => void;
}

export function TracksPage({ onNavigate }: TracksPageProps) {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const tracks = [
    {
      id: "track-1",
      number: 1,
      title: "Digital Transformation & Strategic Management",
      description: "Reimagining business models, leadership, and strategic agility in the digital economy.",
      subtopics: [
        "Reimagining Business Models in the Digital Economy",
        "Leadership and Change Management in Tech-Driven Firms",
        "Techno-entrepreneurship: Building Startups in the Digital Age",
        "Agile Strategy in Uncertain Times: Lessons from Tech-Driven Firms",
        "Managing Organizational Shift in Digital Infrastructures"
      ],
      color: "from-[#0B1F3A] to-[#1E4ED8]"
    },
    {
      id: "track-2",
      number: 2,
      title: "Artificial Intelligence, Data & Decision-Making",
      description: "AI for strategic decisions, data-driven culture, and managing analytics in organizations.",
      subtopics: [
        "AI for Strategic Decision Making in Business Management",
        "Data-Driven Culture: Enabling Smarter Management through Analytics",
        "Managing Bias and Ethics in AI-Powered Organizations",
        "Predictive Analytics in Supply Chain and Operations",
        "The Manager's Guide to Machine Learning and Automation Tools"
      ],
      color: "from-[#1E4ED8] to-[#0B1F3A]"
    },
    {
      id: "track-3",
      number: 3,
      title: "Innovation, Sustainability & Emerging Technologies",
      description: "Blockchain, IoT, green technologies, and sustainable business strategies for the future.",
      subtopics: [
        "Blockchain for Transparency and Supply Chain Management",
        "Digital Twins, IoT, and the Future of Smart Enterprises",
        "Green Technologies and Sustainable Business Strategies",
        "Technology Management for Circular Economy and Zero Waste Initiatives",
        "Harnessing Web 3.0 and Metaverse in Strategic Planning"
      ],
      color: "from-[#0B1F3A] to-[#1E4ED8]"
    },
    {
      id: "track-4",
      number: 4,
      title: "Human Capital & Future of Work",
      description: "Digital HRM, AI and workforce collaboration, upskilling, and tech-enabled inclusion.",
      subtopics: [
        "Digital HRM: Managing Talent in a Remote-First World",
        "AI and the Workforce: Collaboration or Replacement?",
        "Upskilling Managers for a Tech-Driven Future",
        "Tech-Enabled Diversity, Equity, and Inclusion Initiatives",
        "Mental Health and Tech-Enabled Monitoring in Organizations"
      ],
      color: "from-[#1E4ED8] to-[#0B1F3A]"
    },
    {
      id: "track-5",
      number: 5,
      title: "Digital Marketing, Platforms & Consumer Behavior",
      description: "Brand reputation, influencer economy, neuromarketing, and platform management.",
      subtopics: [
        "Managing Brand Reputation in the Age of Algorithmic Feeds",
        "Influencer Economy and the Metrics of Trust",
        "Neuromarketing and Technology-Enhanced Consumer Insights",
        "Digital Nudges and Behavioral Management Online",
        "Platformization: Managing Ecosystems, Not Just Organizations"
      ],
      color: "from-[#0B1F3A] to-[#1E4ED8]"
    },
    {
      id: "track-6",
      number: 6,
      title: "Governance, Ethics & Risk in Tech-Driven Management",
      description: "Cybersecurity, tech ethics, AI regulation, and managing digital risks.",
      subtopics: [
        "Cybersecurity and Risk Management in Digital Enterprises",
        "Tech Ethics: Navigating Data Privacy and Surveillance",
        "Regulating AI: Implications for Business Strategy and Compliance",
        "Corporate Governance in Tech-Led Companies",
        "Managing the Dark Side of Digital: Addiction, Misinformation, and Tech Fatigue"
      ],
      color: "from-[#1E4ED8] to-[#0B1F3A]"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[36px] sm:text-[48px] lg:text-[64px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              Research <span className="text-[#F97316]">Tracks</span>
            </h1>
            <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] max-w-[800px] mx-auto leading-relaxed">
              Explore our comprehensive research tracks and find the perfect match for your scholarly work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracks Content */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div variants={fadeInUp} className="text-center mb-10 lg:mb-16">
            <p className="text-[#475569] text-[15px] sm:text-[16px] lg:text-[18px] max-w-[900px] mx-auto leading-relaxed">
              The conference will promote interdisciplinary discussion by featuring the following tracks, shifting the focus to agility, responsiveness, and strategic capability. The list is indicative but not exhaustive. Participants are encouraged to propose cross-disciplinary or novel ideas within or beyond these tracks.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4 sm:space-y-6">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                variants={fadeInUp}
              >
                <AccordionItem 
                  value={track.id}
                  className="bg-white rounded-xl sm:rounded-2xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden hover:border-[#F97316] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:no-underline group">
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`bg-gradient-to-br ${track.color} rounded-lg sm:rounded-xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white text-[18px] sm:text-[20px] lg:text-[24px] font-bold">{track.number}</span>
                      </motion.div>
                      <div className="flex-1 text-left">
                        <h3 className="text-[#0B1F3A] text-[18px] sm:text-[22px] lg:text-[28px] font-['Montserrat',sans-serif] font-bold mb-1 sm:mb-2 group-hover:text-[#1E4ED8] transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-[#475569] text-[13px] sm:text-[14px] lg:text-[16px] hidden sm:block">
                          {track.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                    <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl p-4 sm:p-6 lg:p-8 mt-2 sm:mt-4">
                      <h4 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[20px] font-semibold mb-4 sm:mb-6">Research Sub-Topics:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {track.subtopics.map((subtopic, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="bg-[#F97316] w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px]">{subtopic}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Guidelines */}
          <motion.div variants={fadeInUp} className="mt-10 lg:mt-16">
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
              <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
                Submission Guidelines
              </h2>
              <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed">
                <p>• Full Paper: Maximum 7000 words (including tables, figures, notes, and references) - Mandatory for Best Paper Award eligibility</p>
                <p>• Extended Abstract: Maximum 2500 words (including tables, figures, and references)</p>
                <p>• Use Times New Roman, 12-point font, double-spaced text</p>
                <p>• All submissions will undergo double-blind peer review</p>
                <p>• A maximum of three submissions per participant is allowed</p>
              </div>
              <div className="mt-6 sm:mt-8">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate("submission")}
                  className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl font-semibold text-[15px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-all duration-300"
                >
                  View Detailed Guidelines
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-10 lg:mt-16">
            <p className="text-[#475569] text-[16px] sm:text-[18px] mb-6 sm:mb-8">
              Found your track? Start your submission today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("submission")}
                className="bg-[#F97316] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-[16px] sm:text-[18px] shadow-xl hover:bg-[#ea580c] transition-all duration-300"
              >
                Submit Your Paper
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("registration")}
                className="bg-white text-[#0B1F3A] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-[16px] sm:text-[18px] border-2 border-[#0B1F3A] hover:bg-[#F8FAFC] transition-all duration-300"
              >
                Register for Conference
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
