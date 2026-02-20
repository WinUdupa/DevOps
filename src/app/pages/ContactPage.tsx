import { motion } from "motion/react";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      question: "What is the conference theme?",
      answer: "The conference theme is 'Strategic Agility and Resilience: Best Practices in Technology and Management for a Digital Era'. We welcome research across eight tracks covering digital transformation, innovation, sustainability, and management."
    },
    {
      question: "What are the important dates?",
      answer: "Paper submission opens: January 15, 2026 | Submission deadline: February 27, 2026 | Acceptance notification: March 18, 2026 | Final paper & registration: June 20, 2026 | Conference dates: April 16-17, 2026"
    },
    {
      question: "What is the registration fee?",
      answer: "Registration fees vary by participant category and timing (early bird vs regular). For Indian participants: Faculty/Industry (₹8,000-10,000), Research Scholars (₹5,000-6,500), Students (₹3,000-4,000). International participants: Faculty/Industry ($200-250), Research Scholars ($150-180), Students ($100-120)."
    },
    {
      question: "How do I submit my paper?",
      answer: "Papers should be submitted through our online portal. Please ensure your paper follows the conference template, is formatted according to guidelines, and is submitted as an anonymous PDF for blind review. Select the appropriate track during submission."
    },
    {
      question: "What is included in the registration fee?",
      answer: "Registration includes conference kit, all meals (breakfast, lunch, tea/coffee), conference proceedings with ISBN, attendance certificate, and access to all sessions. At least one author per accepted paper must register at the full (non-student) rate."
    },
    {
      question: "Can I present virtually?",
      answer: "The conference is primarily an in-person event. However, in exceptional circumstances, virtual presentation options may be considered. Please contact the organizing committee for specific requests."
    },
    {
      question: "Are there publication opportunities?",
      answer: "Yes! Conference proceedings will be published with ISBN. Selected high-quality papers will be invited for publication in special issues of indexed journals. Best paper awards will be given in each track."
    },
    {
      question: "What accommodation options are available?",
      answer: "We have partnered with several nearby hotels offering special conference rates. Details will be provided upon registration. Bangalore has numerous accommodation options to suit all budgets."
    }
  ];

  
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We'll get back to you soon!");
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
              Contact <span className="text-[#F97316]">Us</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] max-w-[800px] mx-auto leading-relaxed px-4">
              Have questions? We're here to help. Reach out to our team for any assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">


          {/* Institution Address */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center"
          >
            <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-4 sm:mb-6">
              BNM Institute of Technology
            </h2>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-2">Department of Business Administration</p>
            <p className="text-[13px] sm:text-[14px] lg:text-[16px] text-white/90 mb-4 sm:mb-6">
              27th Main, BSK II Stage, Banashankari<br />
              Bangalore - 560070, Karnataka, India
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="https://maps.app.goo.gl/TTJqSdLEynZtzHoG6"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F97316] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-[14px] sm:text-[16px] shadow-lg hover:bg-[#ea580c] transition-colors"
              >
                Get Directions
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("venue")}
                className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-[14px] sm:text-[16px] border-2 border-white/30 hover:bg-white/20 transition-colors"
              >
                Venue Details
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Send Us a <span className="text-[#F97316]">Message</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-10 lg:mb-12 px-4">
              Fill out the form below and we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-10 shadow-2xl border-2 border-[#E2E8F0]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[13px] sm:text-[14px]">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-10 sm:h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[13px] sm:text-[14px]">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-10 sm:h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4 sm:mb-6">
                <Label htmlFor="subject" className="text-[13px] sm:text-[14px]">Subject *</Label>
                <Select value={formData.subject} onValueChange={(value: string) => handleInputChange("subject", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="submission">Paper Submission</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="accommodation">Accommodation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-6 sm:mb-8">
                <Label htmlFor="message" className="text-[13px] sm:text-[14px]">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[120px] sm:min-h-[150px]"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white py-3 sm:py-4 rounded-lg font-semibold text-[14px] sm:text-[16px] lg:text-[18px] shadow-lg hover:shadow-xl transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0B1F3A] text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-['Montserrat',sans-serif] font-bold mb-3 sm:mb-4 text-center">
              Frequently Asked <span className="text-[#F97316]">Questions</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] lg:text-[18px] text-center mb-8 sm:mb-10 lg:mb-12 px-4">
              Find quick answers to common questions about the conference
            </p>

            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden hover:border-[#F97316] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:no-underline text-left">
                    <h3 className="text-[#0B1F3A] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] font-['Montserrat',sans-serif] font-bold pr-4">
                      {faq.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6">
                    <p className="text-[#0F172A] text-[13px] sm:text-[14px] lg:text-[16px] leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8 sm:mt-10 lg:mt-12">
              <p className="text-[#475569] text-[13px] sm:text-[14px] lg:text-[16px] mb-3 sm:mb-4">
                Can't find what you're looking for?
              </p>
              <p className="text-[#0B1F3A] text-[13px] sm:text-[14px] lg:text-[16px]">
                Contact us at <a href="mailto:bnmitconference@bnmit.in" className="text-[#1E4ED8] font-semibold hover:underline">bnmitconference@bnmit.in</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}