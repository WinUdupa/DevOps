import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface SubmissionPageProps {
  onNavigate: (page: string) => void;
}

export function SubmissionPage({ onNavigate }: SubmissionPageProps) {
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

  const submissionTypes = [
    {
      title: "Full Paper",
      description: "Maximum 7000 words (including tables, figures, notes, and references)",
      requirements: [
        "Mandatory for eligibility for the Best Paper Award",
        "Original, unpublished research not under review elsewhere",
        "Include abstract of 200 words with 3-5 keywords",
        "Must be submitted as a single PDF document",
        "Follow formatting guidelines: Times New Roman, 12pt, double-spaced"
      ]
    },
    {
      title: "Extended Abstract",
      description: "Maximum 2500 words (including tables, figures, and references)",
      requirements: [
        "Must include methodology, key results, and implications",
        "Suitable for empirical papers in early stages",
        "Include abstract of 200 words with 3-5 keywords",
        "Clear theoretical framework and contribution",
        "Single PDF document submission"
      ]
    }
  ];

  const guidelines = [
    {
      id: "general-requirements",
      title: "General Submission Requirements",
      content: [
        "Submissions must contain original research that has not been previously presented, published, or under review elsewhere",
        "All submissions must include a short abstract of 200 words, followed by 3-5 keywords",
        "Use Times New Roman, 12-point font, double-spaced text",
        "1-inch (2.5 cm) margins on all sides, on an 8.5×11 page size",
        "Include figures, tables, graphs, appendices, and references using standard citation formats",
        "Submissions must be a single document in PDF format (.pdf)",
        "A maximum of three submissions per participant is allowed",
        "Only one author or co-author may present a paper (Hybrid Mode) at the conference"
      ]
    },
    {
      id: "who-should-participate",
      title: "Who Should Participate",
      content: [
        "Academics & Researchers",
        "Entrepreneurs & Startups",
        "Industry Professionals & Executives",
        "Technology Providers",
        "Consultants & Advisors",
        "Non-Profit Organizations & Policymakers",
        "Students (UG & PG)"
      ]
    },
    {
      id: "review-process",
      title: "Review Process",
      content: [
        "All shortlisted papers will undergo a double-blind peer review process",
        "Acceptance for presentation at the conference does not guarantee acceptance for publication",
        "The paper must meet additional, basic publication criteria",
        "Final publication is subject to further review and acceptance by the respective journal",
        "The registration fees do not include publication fees, which may apply to select publications",
        "All correspondence regarding publication will be handled separately with the author(s) after the conference"
      ]
    },
    {
      id: "publication-opportunities",
      title: "Publication Opportunities",
      content: [
        "Review of Management Literature (Emerald Publishing - Scopus-Q2)",
        "South Asian Journal of Business and Management Cases (Sage - Scopus-Q3)",
        "Advances in Emerging Markets and Business Operations (Taylor & Francis)",
        "European Economic Letters (ABDC Listed)",
        "Journal of Informatics Education and Research (ABDC Listed)",
        "IUP Journals (Peer Reviewed)",
        "All papers presented will be included in conference proceedings with ISBN number",
        "Discussions are underway with additional journals regarding publication opportunities"
      ]
    },
    {
      id: "best-paper-awards",
      title: "Best Paper Awards",
      content: [
        "Three \"Best Paper Awards\" will be presented in three categories",
        "Category 1: Review Papers",
        "Category 2: Case Studies",
        "Category 3: Empirical Papers",
        "Awards will be decided by a specifically designated committee of experts",
        "Only full papers (7000 words) are eligible for Best Paper Award"
      ]
    },
    {
      id: "co-author-certificates",
      title: "Co-Author Certificates",
      content: [
        "Certificates for co-authors (not registered) will be provided upon payment of Rs. 500 per co-author",
        "Co-author certificates will be issued after the conference",
        "Payment must be made during registration process"
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
              Submission <span className="text-[#F97316]">Guidelines</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] max-w-[800px] mx-auto leading-relaxed px-4">
              Everything you need to know about preparing and submitting your research paper
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
        className="py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Important Dates */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 text-center">
              Important Deadlines
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                  <p className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-1 sm:mb-2">Feb 27</p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[16px]">Submission Deadline</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                  <p className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-1 sm:mb-2">Mar 18</p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[16px]">Acceptance Notification</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                  <p className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-1 sm:mb-2">Mar 30</p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[16px]">Final Paper & Registration</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                  <p className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-1 sm:mb-2">Apr 16-17</p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[16px]">Conference Dates</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submission Types */}
          <motion.div variants={fadeInUp} className="mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 text-center">
              Submission <span className="text-[#F97316]">Types</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {submissionTypes.map((type, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#E2E8F0] shadow-lg hover:border-[#F97316] transition-all duration-300"
                >
                  <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] lg:text-[28px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
                    {type.title}
                  </h3>
                  <p className="text-[#475569] text-[13px] sm:text-[14px] lg:text-[16px] mb-4 sm:mb-5 lg:mb-6">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start gap-2 sm:gap-3">
                        <div className="bg-[#F97316] w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                        <p className="text-[#0F172A] text-[12px] sm:text-[13px] lg:text-[14px]">{req}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Guidelines */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-6 sm:mb-8 text-center">
              Detailed <span className="text-[#F97316]">Guidelines</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {guidelines.map((guideline, index) => (
                <AccordionItem
                  key={guideline.id}
                  value={guideline.id}
                  className="bg-white rounded-xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden hover:border-[#F97316] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:no-underline">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-lg w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[14px] sm:text-[16px] lg:text-[20px] font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] lg:text-[22px] xl:text-[24px] font-['Montserrat',sans-serif] font-bold text-left">
                        {guideline.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6">
                    <div className="bg-[#F8FAFC] rounded-lg p-4 sm:p-5 lg:p-6 mt-3 sm:mt-4">
                      <ul className="space-y-2 sm:space-y-3">
                        {guideline.content.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.05 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <div className="bg-[#F97316] w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                            <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px]">{item}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Download Section */}
          <motion.div variants={fadeInUp} className="mt-10 sm:mt-12 lg:mt-16">
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center">
              <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
                Ready to Submit?
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-6 sm:mb-8 max-w-[700px] mx-auto px-2">
                Download the paper template, prepare your manuscript according to the guidelines, and submit through our online portal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#F97316] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-xl hover:bg-[#ea580c] transition-colors"
                >
                  Download Template
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-2 border-white/30 hover:bg-white/20 transition-colors"
                >
                  Submit Paper
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Need Help */}
          <motion.div variants={fadeInUp} className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <h3 className="text-[#0B1F3A] text-[20px] sm:text-[24px] lg:text-[28px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4">
              Need Help with Your Submission?
            </h3>
            <p className="text-[#475569] text-[13px] sm:text-[14px] lg:text-[16px] mb-4 sm:mb-5 lg:mb-6 px-4">
              Our team is here to assist you with any questions about the submission process
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("contact")}
              className="bg-white text-[#0B1F3A] px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] border-2 border-[#0B1F3A] hover:bg-[#F8FAFC] transition-colors"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
