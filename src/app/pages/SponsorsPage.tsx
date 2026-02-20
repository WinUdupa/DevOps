import { motion } from "motion/react";

interface SponsorsPageProps {
  onNavigate: (page: string) => void;
}

export function SponsorsPage({ onNavigate }: SponsorsPageProps) {
  const publicationPartners = [
    {
      name: "Review of Management Literature (RML)",
      description: "Emerald Publishing – Scopus Q2 Indexed",
      tier: "Platinum",
      note: "ABDC Listed, UGC Care"
    },
    {
      name: "South Asian Journal of Business and Management Cases (SAJBMC)",
      description: "Sage Publications – Scopus Q3 Indexed",
      tier: "Platinum",
      note: "ABDC Listed, UGC Care"
    },
    {
      name: "Prabandhan: Indian Journal of Management",
      description: "Scopus Indexed Journal",
      tier: "Gold",
      note: "UGC Care Listed"
    },
    {
      name: "IBMRD's Journal of Management & Research",
      description: "UGC Care Listed Journal",
      tier: "Gold",
      note: "Peer Reviewed"
    },
    {
      name: "The Journal of Business Perspective",
      description: "Sage Publications – UGC Care Listed",
      tier: "Gold",
      note: "Peer Reviewed"
    },
    {
      name: "Journal of Management Research and Analysis (JMRA)",
      description: "UGC Care Listed Journal",
      tier: "Silver",
      note: "Peer Reviewed"
    }
  ];

  const sponsorshipTiers = [
    {
      tier: "Platinum Sponsor",
      amount: "₹5,00,000",
      color: "from-[#E5E7EB] to-[#9CA3AF]",
      benefits: [
        "Prime logo placement on all conference materials",
        "Keynote speaking opportunity",
        "Exhibition booth (Premium location)",
        "5 complimentary conference registrations",
        "Full-page advertisement in conference proceedings",
        "Logo on conference website (featured)",
        "Social media promotion",
        "Exclusive networking session with speakers"
      ]
    },
    {
      tier: "Gold Sponsor",
      amount: "₹3,00,000",
      color: "from-[#FCD34D] to-[#F59E0B]",
      benefits: [
        "Logo placement on conference materials",
        "Exhibition booth (Standard location)",
        "3 complimentary conference registrations",
        "Half-page advertisement in proceedings",
        "Logo on conference website",
        "Social media mentions",
        "Access to delegate list"
      ]
    },
    {
      tier: "Silver Sponsor",
      amount: "₹1,50,000",
      color: "from-[#D1D5DB] to-[#6B7280]",
      benefits: [
        "Logo on conference materials",
        "Exhibition space (Table-top)",
        "2 complimentary conference registrations",
        "Quarter-page advertisement in proceedings",
        "Logo on website",
        "Social media recognition"
      ]
    },
    {
      tier: "Bronze Sponsor",
      amount: "₹75,000",
      color: "from-[#D97706] to-[#92400E]",
      benefits: [
        "Logo on selected materials",
        "1 complimentary conference registration",
        "Logo on website",
        "Social media mention",
        "Access to conference proceedings"
      ]
    }
  ];

  const associationPartners = [
    "Association of Indian Management Schools (AIMS)",
    "Indian Institute of Management Alumni Association",
    "Computer Society of India (CSI)",
    "Indian Society for Technical Education (ISTE)",
    "National HRD Network",
    "Management Teachers Consortium"
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
              Sponsors & <span className="text-[#F97316]">Partners</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] max-w-[800px] mx-auto leading-relaxed px-4">
              Join us as a sponsor and connect with leading academics and industry professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publication Partners */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Publication <span className="text-[#F97316]">Partners</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-10 lg:mb-12 px-4">
              Prestigious publishers supporting quality research dissemination
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {publicationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 ${
                    partner.tier === "Platinum" 
                      ? "bg-gradient-to-r from-[#E5E7EB] to-[#9CA3AF] text-[#1F2937]"
                      : partner.tier === "Gold"
                      ? "bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] text-[#78350F]"
                      : "bg-gradient-to-r from-[#D1D5DB] to-[#6B7280] text-white"
                  }`}>
                    <span className="text-[12px] sm:text-[14px] font-bold">{partner.tier}</span>
                  </div>
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-[#475569] text-[13px] sm:text-[14px] lg:text-[15px] mb-2">{partner.description}</p>
                  {partner.note && (
                    <p className="text-[#F97316] text-[12px] sm:text-[13px] font-semibold">{partner.note}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-[#FEF3C7] rounded-lg border border-[#F59E0B]">
              <p className="text-[#78350F] text-[13px] sm:text-[14px] text-center">
                <strong>Note:</strong> The publication opportunities listed are subject to the journal's selection and review process. Acceptance of the paper for publication is not guaranteed merely by participation in the conference.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Sponsorship <span className="text-[#F97316]">Opportunities</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-10 lg:mb-12 max-w-[800px] mx-auto px-4">
              Partner with us to showcase your brand to 300+ academics, researchers, and industry professionals from across the globe
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E2E8F0] hover:border-[#F97316] transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${tier.color} p-5 sm:p-6 lg:p-8 text-center`}>
                    <h3 className="text-white text-[20px] sm:text-[26px] lg:text-[32px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
                      {tier.tier}
                    </h3>
                    <p className="text-white text-[28px] sm:text-[34px] lg:text-[40px] font-bold">{tier.amount}</p>
                  </div>
                  <div className="p-5 sm:p-6 lg:p-8">
                    <h4 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[20px] font-semibold mb-4 sm:mb-5 lg:mb-6">Benefits Included:</h4>
                    <ul className="space-y-3 sm:space-y-4">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 sm:gap-3">
                          <span className="text-[#F97316] text-[16px] sm:text-[18px] lg:text-[20px] mt-0.5">✓</span>
                          <span className="text-[#0F172A] text-[12px] sm:text-[13px] lg:text-[15px] leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 sm:mt-10 lg:mt-12 text-center"
            >
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
                <h3 className="text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
                  Interested in Sponsoring?
                </h3>
                <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto px-2">
                  Contact us to discuss customized sponsorship packages tailored to your organization's objectives
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("contact")}
                    className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
                  >
                    Become a Sponsor
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-2 border-white/30 hover:bg-white/20 transition-colors"
                  >
                    Download Brochure
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Association Partners */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Association <span className="text-[#F97316]">Partners</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-10 lg:mb-12 px-4">
              Supported by leading professional and academic associations
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {associationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-xl p-5 sm:p-6 lg:p-8 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] hover:shadow-xl transition-all text-center"
                >
                  <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-white text-[20px] sm:text-[24px] lg:text-[28px]">🤝</span>
                  </div>
                  <p className="text-[#0B1F3A] text-[13px] sm:text-[14px] lg:text-[16px] font-semibold">{partner}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-8 sm:mb-10 lg:mb-12 text-center">
              Why <span className="text-[#F97316]">Sponsor</span> This Conference?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: "👥",
                  title: "Target Audience",
                  description: "Connect with 300+ faculty, researchers, PhD scholars, and industry professionals"
                },
                {
                  icon: "🌏",
                  title: "International Reach",
                  description: "Participants from multiple countries and leading institutions worldwide"
                },
                {
                  icon: "🎯",
                  title: "Brand Visibility",
                  description: "Comprehensive branding across all conference materials and digital platforms"
                },
                {
                  icon: "🤝",
                  title: "Networking",
                  description: "Exclusive access to networking sessions with keynote speakers and delegates"
                },
                {
                  icon: "📊",
                  title: "Thought Leadership",
                  description: "Position your organization as an industry leader in innovation and management"
                },
                {
                  icon: "📈",
                  title: "Business Opportunities",
                  description: "Explore partnerships, recruitment, and business development opportunities"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-lg border border-[#E2E8F0] text-center"
                >
                  <div className="text-[40px] sm:text-[48px] lg:text-[56px] mb-3 sm:mb-4">{benefit.icon}</div>
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[24px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#475569] text-[12px] sm:text-[13px] lg:text-[15px] leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
