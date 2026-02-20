import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ThemePageProps {
  onNavigate: (page: string) => void;
}

export function ThemePage({ onNavigate }: ThemePageProps) {
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

  const themeAreas = [
    {
      title: "Strategic Agility",
      description: "The ability to rapidly sense and respond to market changes, technological disruptions, and competitive pressures",
      points: [
        "Dynamic capabilities and organizational flexibility",
        "Adaptive strategy formulation and execution",
        "Agile leadership and decision-making frameworks"
      ]
    },
    {
      title: "Organizational Resilience",
      description: "Building robust systems that can withstand shocks, recover from disruptions, and emerge stronger",
      points: [
        "Crisis management and business continuity planning",
        "Risk mitigation and adaptive capacity building",
        "Post-pandemic organizational transformation"
      ]
    },
    {
      title: "Digital Transformation",
      description: "Leveraging technology to fundamentally change how organizations operate and deliver value",
      points: [
        "Digital business models and platforms",
        "Data-driven decision making and analytics",
        "Technology adoption and change management"
      ]
    },
    {
      title: "Best Practices in Management",
      description: "Evidence-based approaches and proven methodologies that drive organizational excellence",
      points: [
        "Innovation management and R&D strategies",
        "Sustainable business practices and ESG frameworks",
        "Performance management and operational excellence"
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[64px] font-['Montserrat',sans-serif] font-bold mb-6">
              Conference <span className="text-[#F97316]">Theme</span>
            </h1>
            <p className="text-white/90 text-[24px] max-w-[900px] mx-auto leading-relaxed font-light">
              Strategic Agility and Resilience: Best Practices in Technology and Management for a Digital Era
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-16">
          <motion.div variants={fadeInUp} className="mb-20">
            <h2 className="text-[#0B1F3A] text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 text-center">
              Theme <span className="text-[#F97316]">Overview</span>
            </h2>
            <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-12 border-2 border-[#F97316]">
              <p className="text-[#0F172A] text-[20px] leading-relaxed mb-6">
                In today's rapidly evolving business landscape, organizations face unprecedented challenges and opportunities. The digital era has fundamentally transformed how businesses operate, compete, and create value. Success now depends on an organization's ability to demonstrate both <strong className="text-[#1E4ED8]">strategic agility</strong>—the capacity to quickly adapt to changing circumstances—and <strong className="text-[#1E4ED8]">organizational resilience</strong>—the capability to withstand disruptions and emerge stronger.
              </p>
              <p className="text-[#0F172A] text-[20px] leading-relaxed mb-6">
                This conference explores the intersection of technology and management, examining how organizations can leverage digital tools, innovative strategies, and best practices to build competitive advantage in an uncertain world. We seek research that bridges theoretical frameworks with practical application, offering actionable insights for both academics and practitioners.
              </p>
              <p className="text-[#0F172A] text-[20px] leading-relaxed">
                Our theme encompasses four interconnected dimensions that together define organizational success in the digital age: strategic agility, organizational resilience, digital transformation, and management best practices.
              </p>
            </div>
          </motion.div>

          {/* Theme Areas */}
          <div className="space-y-12">
            {themeAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <motion.div
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-2xl p-10 border border-[#E2E8F0] shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl p-6 flex-shrink-0">
                      <span className="text-white text-[36px] font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#0B1F3A] text-[36px] font-['Montserrat',sans-serif] font-bold mb-4">
                        {area.title}
                      </h3>
                      <p className="text-[#475569] text-[18px] leading-relaxed mb-6">
                        {area.description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-[#0B1F3A] text-[18px] font-semibold mb-3">Key Focus Areas:</h4>
                        {area.points.map((point, pointIndex) => (
                          <motion.div
                            key={pointIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: pointIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="bg-[#F97316] w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-[#0F172A] text-[16px]">{point}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Relevance Section */}
          <motion.div variants={fadeInUp} className="mt-20">
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-2xl p-12 text-white">
              <h2 className="text-[40px] font-['Montserrat',sans-serif] font-bold mb-8">
                Why This Theme Matters
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-[24px] font-bold mb-4 text-[#F97316]">For Academia</h3>
                  <p className="text-[16px] leading-relaxed">
                    Provides a framework for rigorous research that addresses real-world challenges and contributes to theoretical advancement in strategic management and organizational studies.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-[24px] font-bold mb-4 text-[#F97316]">For Industry</h3>
                  <p className="text-[16px] leading-relaxed">
                    Offers evidence-based insights and proven practices that can be directly applied to enhance organizational performance and competitive positioning.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-[24px] font-bold mb-4 text-[#F97316]">For Society</h3>
                  <p className="text-[16px] leading-relaxed">
                    Addresses critical challenges facing modern organizations and their stakeholders, contributing to sustainable economic growth and social well-being.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-[24px] font-bold mb-4 text-[#F97316]">For Policymakers</h3>
                  <p className="text-[16px] leading-relaxed">
                    Informs policy development with research-backed recommendations for fostering innovation, competitiveness, and resilience in the digital economy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <p className="text-[#475569] text-[18px] mb-8">
              Does your research align with our conference theme?
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("tracks")}
                className="bg-[#F97316] text-white px-10 py-5 rounded-lg font-semibold text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
              >
                Explore Research Tracks
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("submission")}
                className="bg-white text-[#0B1F3A] px-10 py-5 rounded-lg font-semibold text-[18px] border-2 border-[#0B1F3A] hover:bg-[#F8FAFC] transition-colors"
              >
                Submit Your Paper
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
