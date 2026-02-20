import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface SchedulePageProps {
  onNavigate: (page: string) => void;
}

export function SchedulePage({ onNavigate }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState("workshop");
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const schedule = {
    workshop: [
      {
        time: "09:00 - 09:30",
        title: "Registration & Welcome",
        type: "general",
        location: "Main Lobby",
        description: "Check-in and collect workshop materials"
      },
      {
        time: "09:30 - 11:00",
        title: "Pre-Conference Workshop Session 1",
        type: "workshop",
        location: "Seminar Hall",
        speaker: "Dr. Mayank Singh",
        speakerTitle: "Assistant Professor, IIM Bangalore",
        topic: "Research Methodology and Publication Strategies",
        description: "Interactive session on research design and publishing in top-tier journals"
      },
      {
        time: "11:00 - 11:30",
        title: "Tea Break & Networking",
        type: "break",
        location: "Convention Hall"
      },
      {
        time: "11:30 - 13:00",
        title: "Pre-Conference Workshop Session 2",
        type: "workshop",
        location: "Seminar Hall",
        speaker: "Dr. Avinash K Shrivastava",
        speakerTitle: "Associate Professor, International Management Institute Kolkata",
        topic: "Advanced Data Analytics for Management Research",
        description: "Hands-on session covering modern analytical techniques"
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch",
        type: "break",
        location: "Dining Hall"
      },
      {
        time: "14:00 - 15:30",
        title: "Pre-Conference Workshop Session 3",
        type: "workshop",
        location: "Seminar Hall",
        speaker: "Dr. Subham Singhania",
        speakerTitle: "Assistant Professor, Fore School of Management, New Delhi",
        topic: "Case Study Development and Teaching",
        description: "Learn to develop impactful case studies for management education"
      },
      {
        time: "15:30 - 16:00",
        title: "Workshop Closing & Networking",
        type: "general",
        location: "Main Lobby"
      }
    ],
    day1: [
      {
        time: "08:00 - 09:00",
        title: "Registration & Welcome Coffee",
        type: "general",
        location: "Main Lobby",
        description: "Check-in, collect conference kit, and network with fellow attendees"
      },
      {
        time: "09:00 - 09:30",
        title: "Inaugural Ceremony",
        type: "ceremony",
        location: "Main Auditorium",
        description: "Welcome address by Chief Guest and Conference Chairs",
        speakers: ["Dr. Chief Patron", "Conference Chair"]
      },
      {
        time: "09:30 - 10:45",
        title: "Keynote Session 1",
        type: "keynote",
        location: "Main Auditorium",
        speaker: "Dr. Rajesh Kumar",
        speakerTitle: "Professor, IIM Bangalore",
        topic: "Digital Transformation: Strategies for the New Era",
        description: "Exploring how organizations can leverage digital technologies for competitive advantage"
      },
      {
        time: "10:45 - 11:15",
        title: "Tea Break & Networking",
        type: "break",
        location: "Convention Hall"
      },
      {
        time: "11:15 - 13:00",
        title: "Parallel Sessions - Track 1 & 2",
        type: "parallel",
        location: "Conference Rooms A & B",
        sessions: [
          {
            track: "Track 1: Digital Transformation",
            room: "Room A",
            papers: [
              "AI-Driven Business Models in Manufacturing",
              "Cloud Computing Adoption in SMEs",
              "Digital Leadership in Crisis Management",
              "Big Data Analytics for Strategic Decisions"
            ]
          },
          {
            track: "Track 2: Technology & Innovation",
            room: "Room B",
            papers: [
              "Blockchain Applications in Supply Chain",
              "IoT Integration in Smart Cities",
              "Innovation Ecosystems in Emerging Markets",
              "Technology Transfer Mechanisms"
            ]
          }
        ]
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch",
        type: "break",
        location: "Dining Hall"
      },
      {
        time: "14:00 - 15:45",
        title: "Parallel Sessions - Track 3 & 4",
        type: "parallel",
        location: "Conference Rooms C & D",
        sessions: [
          {
            track: "Track 3: Sustainability & Resilience",
            room: "Room C",
            papers: [
              "ESG Frameworks in Corporate Strategy",
              "Circular Economy Business Models",
              "Climate Risk Management Practices",
              "Stakeholder Engagement Strategies"
            ]
          },
          {
            track: "Track 4: HRM & Organizational Behavior",
            room: "Room D",
            papers: [
              "Remote Work and Employee Productivity",
              "Diversity & Inclusion in Tech Companies",
              "Leadership Development Programs",
              "Organizational Culture Transformation"
            ]
          }
        ]
      },
      {
        time: "15:45 - 16:15",
        title: "Tea Break",
        type: "break",
        location: "Convention Hall"
      },
      {
        time: "16:15 - 17:30",
        title: "Panel Discussion",
        type: "panel",
        location: "Main Auditorium",
        topic: "Building Resilient Organizations in Uncertain Times",
        moderator: "Dr. Priya Sharma",
        panelists: [
          "Industry Expert 1 - Manufacturing Sector",
          "Industry Expert 2 - IT Services",
          "Academic Researcher - Strategic Management",
          "Policy Maker - Government Representative"
        ]
      },
      {
        time: "17:30 - 18:00",
        title: "Day 1 Closing & Networking",
        type: "general",
        location: "Main Lobby"
      }
    ],
    day2: [
      {
        time: "08:30 - 09:00",
        title: "Registration & Morning Coffee",
        type: "general",
        location: "Main Lobby"
      },
      {
        time: "09:00 - 10:15",
        title: "Keynote Session 2",
        type: "keynote",
        location: "Main Auditorium",
        speaker: "Prof. Sarah Anderson",
        speakerTitle: "Dean, London Business School",
        topic: "Strategic Agility in the Digital Economy",
        description: "How leading organizations develop and maintain strategic agility"
      },
      {
        time: "10:15 - 10:45",
        title: "Tea Break",
        type: "break",
        location: "Convention Hall"
      },
      {
        time: "10:45 - 12:30",
        title: "Parallel Sessions - Track 5 & 6",
        type: "parallel",
        location: "Conference Rooms A & B",
        sessions: [
          {
            track: "Track 5: Financial Management & Fintech",
            room: "Room A",
            papers: [
              "Cryptocurrency Adoption Strategies",
              "Digital Banking Transformation",
              "Risk Management in Fintech",
              "Behavioral Finance Insights"
            ]
          },
          {
            track: "Track 6: Marketing & Consumer Behavior",
            room: "Room B",
            papers: [
              "Social Media Marketing Effectiveness",
              "Consumer Behavior in Digital Era",
              "Brand Management Strategies",
              "Omnichannel Retail Innovation"
            ]
          }
        ]
      },
      {
        time: "12:30 - 13:30",
        title: "Lunch",
        type: "break",
        location: "Dining Hall"
      },
      {
        time: "13:30 - 15:15",
        title: "Parallel Sessions - Track 7 & 8",
        type: "parallel",
        location: "Conference Rooms C & D",
        sessions: [
          {
            track: "Track 7: Operations & Supply Chain",
            room: "Room C",
            papers: [
              "Industry 4.0 Implementation",
              "Supply Chain Digitization",
              "Lean Six Sigma Applications",
              "Sustainable Supply Chains"
            ]
          },
          {
            track: "Track 8: Entrepreneurship & Strategy",
            room: "Room D",
            papers: [
              "Startup Ecosystem Development",
              "Business Model Innovation",
              "Corporate Entrepreneurship",
              "Strategic Alliances & Partnerships"
            ]
          }
        ]
      },
      {
        time: "15:15 - 15:45",
        title: "Tea Break",
        type: "break",
        location: "Convention Hall"
      },
      {
        time: "15:45 - 16:45",
        title: "Best Paper Awards & Recognition",
        type: "ceremony",
        location: "Main Auditorium",
        description: "Announcement and presentation of best paper awards for each track"
      },
      {
        time: "16:45 - 17:30",
        title: "Valedictory Session",
        type: "ceremony",
        location: "Main Auditorium",
        description: "Conference summary, closing remarks, and vote of thanks"
      },
      {
        time: "17:30 - 19:00",
        title: "Networking Dinner",
        type: "general",
        location: "Banquet Hall",
        description: "Informal networking and dinner with all participants"
      }
    ]
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "keynote": return "from-[#1E4ED8] to-[#0B1F3A]";
      case "parallel": return "from-[#F97316] to-[#ea580c]";
      case "panel": return "from-[#0B1F3A] to-[#1E4ED8]";
      case "ceremony": return "from-[#1E4ED8] to-[#0B1F3A]";
      case "break": return "from-[#E2E8F0] to-[#cbd5e1]";
      default: return "from-[#475569] to-[#334155]";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "keynote": return "🎤";
      case "parallel": return "📊";
      case "panel": return "💬";
      case "ceremony": return "🎓";
      case "break": return "☕";
      default: return "📅";
    }
  };

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
              Conference <span className="text-[#F97316]">Schedule</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] max-w-[800px] mx-auto leading-relaxed px-4">
              Three days of pre-conference workshop, keynotes, research presentations, and networking
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/30">
                <p className="text-white text-[12px] sm:text-[14px] mb-1">Pre-Conference Workshop</p>
                <p className="text-[#F97316] text-[16px] sm:text-[18px] lg:text-[20px] font-bold">April 15, 2026</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/30">
                <p className="text-white text-[12px] sm:text-[14px] mb-1">Day 1</p>
                <p className="text-[#F97316] text-[16px] sm:text-[18px] lg:text-[20px] font-bold">April 16, 2026</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/30">
                <p className="text-white text-[12px] sm:text-[14px] mb-1">Day 2</p>
                <p className="text-[#F97316] text-[16px] sm:text-[18px] lg:text-[20px] font-bold">April 17, 2026</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Content */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full max-w-[500px] sm:max-w-[700px] mx-auto grid-cols-3 h-12 sm:h-14 mb-8 sm:mb-10 lg:mb-12">
              <TabsTrigger value="workshop" className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold">
                Workshop - April 15
              </TabsTrigger>
              <TabsTrigger value="day1" className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold">
                Day 1 - April 16
              </TabsTrigger>
              <TabsTrigger value="day2" className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold">
                Day 2 - April 17
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workshop" className="space-y-4 sm:space-y-6">
              {schedule.workshop.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    {/* Time Badge */}
                    <div className="flex-shrink-0 w-full sm:w-28 lg:w-32">
                      <div className={`bg-gradient-to-br ${getEventColor(event.type)} rounded-lg p-3 sm:p-4 text-white text-center shadow-lg`}>
                        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold">{event.time.split(" - ")[0]}</p>
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] opacity-80">{event.time.split(" - ")[1]}</p>
                      </div>
                    </div>

                    {/* Event Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="flex-1 bg-white rounded-xl border-2 border-[#E2E8F0] shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-2xl hover:border-[#F97316] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="text-[24px] sm:text-[30px] lg:text-[36px]">{getEventIcon(event.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#0B1F3A] text-[16px] sm:text-[20px] lg:text-[24px] font-['Montserrat',sans-serif] font-bold mb-1 sm:mb-2">
                            {event.title}
                          </h3>
                          <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px] mb-2 sm:mb-3">📍 {event.location}</p>
                          
                          {event.description && (
                            <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mb-2 sm:mb-3">{event.description}</p>
                          )}
                          
                          {event.speaker && (
                            <div className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                              <p className="text-[#0B1F3A] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold">{event.speaker}</p>
                              <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px]">{event.speakerTitle}</p>
                              {event.topic && (
                                <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mt-2 italic">"{event.topic}"</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="day1" className="space-y-4 sm:space-y-6">
              {schedule.day1.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    {/* Time Badge */}
                    <div className="flex-shrink-0 w-full sm:w-28 lg:w-32">
                      <div className={`bg-gradient-to-br ${getEventColor(event.type)} rounded-lg p-3 sm:p-4 text-white text-center shadow-lg`}>
                        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold">{event.time.split(" - ")[0]}</p>
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] opacity-80">{event.time.split(" - ")[1]}</p>
                      </div>
                    </div>

                    {/* Event Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="flex-1 bg-white rounded-xl border-2 border-[#E2E8F0] shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-2xl hover:border-[#F97316] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="text-[24px] sm:text-[30px] lg:text-[36px]">{getEventIcon(event.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#0B1F3A] text-[16px] sm:text-[20px] lg:text-[24px] font-['Montserrat',sans-serif] font-bold mb-1 sm:mb-2">
                            {event.title}
                          </h3>
                          <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px] mb-2 sm:mb-3">📍 {event.location}</p>
                          
                          {event.description && (
                            <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mb-2 sm:mb-3">{event.description}</p>
                          )}
                          
                          {event.speaker && (
                            <div className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                              <p className="text-[#0B1F3A] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold">{event.speaker}</p>
                              <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px]">{event.speakerTitle}</p>
                              {event.topic && (
                                <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mt-2 italic">"{event.topic}"</p>
                              )}
                            </div>
                          )}

                          {event.sessions && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                              {event.sessions.map((session, sessionIndex) => (
                                <div key={sessionIndex} className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 border border-[#E2E8F0]">
                                  <p className="text-[#0B1F3A] text-[13px] sm:text-[14px] lg:text-[16px] font-semibold mb-2">{session.track}</p>
                                  <p className="text-[#475569] text-[11px] sm:text-[12px] mb-2 sm:mb-3">📍 {session.room}</p>
                                  <ul className="space-y-1">
                                    {session.papers.slice(0, 2).map((paper, paperIndex) => (
                                      <li key={paperIndex} className="text-[#0F172A] text-[11px] sm:text-[12px] lg:text-[13px] flex items-start gap-2">
                                        <span className="text-[#F97316] mt-1">•</span>
                                        <span>{paper}</span>
                                      </li>
                                    ))}
                                    <li className="text-[#475569] text-[10px] sm:text-[11px] lg:text-[12px] italic">+ {session.papers.length - 2} more papers</li>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {event.panelists && (
                            <div className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 mt-2 sm:mt-3">
                              <p className="text-[#0B1F3A] text-[12px] sm:text-[13px] lg:text-[14px] font-semibold mb-2">Moderator: {event.moderator}</p>
                              <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px] mb-2">Panelists:</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {event.panelists.map((panelist, pIndex) => (
                                  <p key={pIndex} className="text-[#0F172A] text-[11px] sm:text-[12px] lg:text-[13px] flex items-start gap-2">
                                    <span className="text-[#F97316]">•</span>
                                    {panelist}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="day2" className="space-y-4 sm:space-y-6">
              {schedule.day2.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <div className="flex-shrink-0 w-full sm:w-28 lg:w-32">
                      <div className={`bg-gradient-to-br ${getEventColor(event.type)} rounded-lg p-3 sm:p-4 text-white text-center shadow-lg`}>
                        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold">{event.time.split(" - ")[0]}</p>
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] opacity-80">{event.time.split(" - ")[1]}</p>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="flex-1 bg-white rounded-xl border-2 border-[#E2E8F0] shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-2xl hover:border-[#F97316] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="text-[24px] sm:text-[30px] lg:text-[36px]">{getEventIcon(event.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#0B1F3A] text-[16px] sm:text-[20px] lg:text-[24px] font-['Montserrat',sans-serif] font-bold mb-1 sm:mb-2">
                            {event.title}
                          </h3>
                          <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px] mb-2 sm:mb-3">📍 {event.location}</p>
                          
                          {event.description && (
                            <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mb-2 sm:mb-3">{event.description}</p>
                          )}
                          
                          {event.speaker && (
                            <div className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                              <p className="text-[#0B1F3A] text-[14px] sm:text-[16px] lg:text-[18px] font-semibold">{event.speaker}</p>
                              <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[14px]">{event.speakerTitle}</p>
                              {event.topic && (
                                <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] mt-2 italic">"{event.topic}"</p>
                              )}
                            </div>
                          )}

                          {event.sessions && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                              {event.sessions.map((session, sessionIndex) => (
                                <div key={sessionIndex} className="bg-[#F8FAFC] rounded-lg p-3 sm:p-4 border border-[#E2E8F0]">
                                  <p className="text-[#0B1F3A] text-[13px] sm:text-[14px] lg:text-[16px] font-semibold mb-2">{session.track}</p>
                                  <p className="text-[#475569] text-[11px] sm:text-[12px] mb-2 sm:mb-3">📍 {session.room}</p>
                                  <ul className="space-y-1">
                                    {session.papers.slice(0, 2).map((paper, paperIndex) => (
                                      <li key={paperIndex} className="text-[#0F172A] text-[11px] sm:text-[12px] lg:text-[13px] flex items-start gap-2">
                                        <span className="text-[#F97316] mt-1">•</span>
                                        <span>{paper}</span>
                                      </li>
                                    ))}
                                    <li className="text-[#475569] text-[10px] sm:text-[11px] lg:text-[12px] italic">+ {session.papers.length - 2} more papers</li>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Download Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-14 lg:mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
              <h3 className="text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4">
                Download Complete Schedule
              </h3>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto px-2">
                Get the full conference program with detailed session information and abstracts
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
              >
                Download PDF Schedule
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
