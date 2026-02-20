import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import UPI from "@/assets/UPICODE.png";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface RegistrationPageProps {
  onNavigate: (page: string) => void;
}

const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+[0-9]{10,15}$/;
  const cleanedPhone = phone.replace(/[\s-]/g, '');
  return phoneRegex.test(cleanedPhone);
};

interface FieldErrors {
  name?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  affiliation?: string;
  placeOfAffiliation?: string;
  paperTitle?: string;
  trackNumber?: string;
  paperId?: string;
  amountPaid?: string;
  paymentAccount?: string;
  transactionId?: string;
  paymentProof?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  // Fields that can be edited before email verification
  const preVerificationFields = ['name', 'nationality', 'phone'];

  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    phone: "",
    email: "",
    affiliation: "",
    placeOfAffiliation: "",
    paperTitle: "",
    trackNumber: "",
    paperId: "",
    amountPaid: "",
    paymentAccount: "",
    transactionId: "",
    paymentProof: null as File | null
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Email verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifyStep, setVerifyStep] = useState<'idle' | 'sent' | 'verified'>('idle');

  const formRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  // Check for magic link in URL
  useEffect(() => {
    const checkMagicLink = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEmailVerified(true);
        setVerifyStep('verified');
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
        setTouched(prev => ({ ...prev, email: true }));
      }
    };
    checkMagicLink();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        setEmailVerified(true);
        setVerifyStep('verified');
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
        setTouched(prev => ({ ...prev, email: true }));
        setVerifyMessage('Email verified successfully!');
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSendMagicLink = async () => {
    setIsVerifying(true);
    setVerifyMessage('');

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setVerifyMessage(emailValidation.error || '');
      setIsVerifying(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`
        }
      });

      if (error) {
        setVerifyMessage(error.message);
      } else {
        setVerifyMessage('Magic link sent! Check your email and click the link to verify.');
        setVerifyStep('sent');
      }
    } catch (err) {
      setVerifyMessage('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const registrationFees = [
    {
      category: "Indian Participants",
      types: [
        { type: "Student (Indian)", earlyBird: "₹800", regular: "₹1,200" },
        { type: "Faculty/Researcher (Indian)", earlyBird: "₹2,000", regular: "₹3,000" },
        { type: "Industry/Practitioner (Indian)", earlyBird: "₹3,000", regular: "₹4,000" }
      ]
    },
    {
      category: "International Participants",
      types: [
        { type: "Student (International)", earlyBird: "$60", regular: "$80" },
        { type: "Faculty/Researcher (International)", earlyBird: "$80", regular: "$100" },
        { type: "Industry/Practitioner (International)", earlyBird: "$120", regular: "$150" }
      ]
    }
  ];

  const feeOptions = [
    { value: "800", label: "Student (Indian) - Early Bird: ₹800" },
    { value: "1200", label: "Student (Indian) - Regular: ₹1,200" },
    { value: "2000", label: "Faculty/Researcher (Indian) - Early Bird: ₹2,000" },
    { value: "3000-faculty", label: "Faculty/Researcher (Indian) - Regular: ₹3,000" },
    { value: "3000-industry", label: "Industry/Practitioner (Indian) - Early Bird: ₹3,000" },
    { value: "4000", label: "Industry/Practitioner (Indian) - Regular: ₹4,000" },
    { value: "60", label: "Student (International) - Early Bird: $60" },
    { value: "80-student", label: "Student (International) - Regular: $80" },
    { value: "80-faculty", label: "Faculty/Researcher (International) - Early Bird: $80" },
    { value: "100", label: "Faculty/Researcher (International) - Regular: $100" },
    { value: "120", label: "Industry/Practitioner (International) - Early Bird: $120" },
    { value: "150", label: "Industry/Practitioner (International) - Regular: $150" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (!touched[field] && field !== 'email') {
      setTouched({ ...touched, [field]: true });
    }
    if (field === 'email') {
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
      return;
    }
    validateField(field, value);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: any): string | undefined => {
    let error: string | undefined;

    switch (field) {
      case 'name':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'nationality':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'phone':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        } else if (!validatePhone(value)) {
          error = 'Enter a valid phone number with country code (e.g., +91 9876543210)';
        }
        break;
      case 'email':
        const emailValidation = validateEmail(value || '');
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
      case 'affiliation':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'placeOfAffiliation':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'paperTitle':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'trackNumber':
        if (!value) {
          error = 'Please select a research track';
        }
        break;
      case 'paperId':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'amountPaid':
        if (!value) {
          error = 'Please select the amount you paid';
        }
        break;
      case 'paymentAccount':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'transactionId':
        if (!value || value.trim() === '') {
          error = 'This field is required';
        }
        break;
      case 'paymentProof':
        if (!value) {
          error = 'Please upload proof of payment';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field as keyof FieldErrors] = error;
        isValid = false;
      }
    });

    const allTouched: TouchedFields = {};
    Object.keys(formData).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const checkValidity = () => {
      if (!emailVerified) {
        setIsFormValid(false);
        return;
      }

      const requiredFields = ['name', 'nationality', 'phone', 'email', 'affiliation', 'placeOfAffiliation', 'paperTitle', 'trackNumber', 'paperId', 'amountPaid', 'paymentAccount', 'transactionId', 'paymentProof'];
      
      for (const field of requiredFields) {
        const value = formData[field as keyof typeof formData];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          setIsFormValid(false);
          return;
        }
      }
      
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid || !validatePhone(formData.phone)) {
        setIsFormValid(false);
        return;
      }
      
      setIsFormValid(true);
    };
    
    checkValidity();
  }, [formData, emailVerified]);

  const isFieldDisabled = (field: string): boolean => {
    return !emailVerified && !preVerificationFields.includes(field);
  };

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setErrors(prev => ({ ...prev, paymentProof: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` }));
        return;
      }
      setFormData({ ...formData, paymentProof: file });
      setErrors(prev => ({ ...prev, paymentProof: undefined }));
      setTouched({ ...touched, paymentProof: true });
    }
  };

  const uploadFileToSupabase = async (file: File, userEmail: string): Promise<string | null> => {
    try {
      // Generate unique filename: email_timestamp_originalname
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `${userEmail.replace('@', '_').replace('.', '_')}_${timestamp}.${fileExt}`;
      const filePath = `payment-proofs/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('conference-registration') // bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      return filePath; // Return the path for storing in database
    } catch (err) {
      console.error('File upload failed:', err);
      return null;
    }
  };

  const getFileDownloadUrl = async (filePath: string): Promise<string | null> => {
    try {
      const { data } = supabase.storage
        .from('conference-registration')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error('Failed to get file URL:', err);
      return null;
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const isValid = validateAllFields();
    
    if (!isValid) {
      const errorFields = Object.keys(errors).filter(key => errors[key as keyof FieldErrors]);
      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0];
        const fieldElement = fieldRefs.current[firstErrorField];
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setShakeField(firstErrorField);
          setTimeout(() => setShakeField(null), 500);
        }
      }
      setIsSubmitting(false);
      return;
    }
    
    // Upload file and save registration data
    uploadAndSaveRegistration();
  };

const uploadAndSaveRegistration = async () => {
  try {
    let paymentProofPath = null;

    // Upload payment proof file if exists
    if (formData.paymentProof) {
      paymentProofPath = await uploadFileToSupabase(formData.paymentProof, formData.email);
      
      if (!paymentProofPath) {
        setErrors(prev => ({ ...prev, paymentProof: 'Failed to upload file. Please try again.' }));
        setIsSubmitting(false);
        return;
      }
    }

    // Save registration data to Supabase database
    const { data, error } = await supabase
      .from('conference_registrations')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          institution: formData.affiliation,
          place_of_affiliation: formData.placeOfAffiliation,
          country: formData.nationality,
          paper_title: formData.paperTitle,
          paper_id: formData.paperId,
          track_number: formData.trackNumber,
          payment_status: 'pending',
          amount_paid: formData.amountPaid,
          payment_account: formData.paymentAccount,
          transaction_id: formData.transactionId,
          payment_proof_path: paymentProofPath
        }
      ]);

    if (error) {
      console.error('Database error:', error);
      alert('Error saving registration. Please try again.');
      setIsSubmitting(false);
      return;
    }

    alert("Registration submitted successfully! We will verify your payment and send confirmation to your email.");
    setIsSubmitting(false);

  
    setFormData({
      name: "",
      nationality: "",
      phone: "",
      email: formData.email, 
      affiliation: "",
      placeOfAffiliation: "",
      paperTitle: "",
      trackNumber: "",
      paperId: "",
      amountPaid: "",
      paymentAccount: "",
      transactionId: "",
      paymentProof: null
    });
   
  } catch (err) {
    console.error('Registration error:', err);
    alert('An error occurred. Please try again.');
    setIsSubmitting(false);
  }
};

  const getInputClassName = (field: string, baseClass: string = "h-10"): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    let className = baseClass;
    
    if (hasError) {
      className += " border-[#E53935] bg-[#FFF5F5] focus:border-[#E53935] focus:ring-[#E53935]";
    } else if (isValid) {
      className += " border-[#10B981] focus:border-[#10B981] focus:ring-[#10B981]";
    }
    
    if (shakeField === field) {
      className += " animate-shake";
    }
    
    return className;
  };

  const getSelectClassName = (field: string): string => {
    const hasError = touched[field] && errors[field as keyof FieldErrors];
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    let className = "h-10";
    
    if (hasError) {
      className += " border-[#E53935] bg-[#FFF5F5]";
    } else if (isValid) {
      className += " border-[#10B981]";
    }
    
    if (shakeField === field) {
      className += " animate-shake";
    }
    
    return className;
  };

  const ErrorMessage = ({ field }: { field: keyof FieldErrors }) => {
    if (!touched[field] || !errors[field]) return null;
    
    return (
      <p className="text-[#E53935] text-[11px] sm:text-[12px] mt-1 flex items-center gap-1" role="alert">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[field]}
      </p>
    );
  };

  const ValidIndicator = ({ field }: { field: string }) => {
    const isValid = touched[field] && !errors[field as keyof FieldErrors] && formData[field as keyof typeof formData];
    
    if (!isValid) return null;
    
    return (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#10B981]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-[28px] sm:text-[36px] lg:text-[44px] font-['Montserrat',sans-serif] font-bold mb-2 sm:mb-3">
              Conference <span className="text-[#F97316]">Registration</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16px] lg:text-[17px] max-w-[700px] mx-auto">
              Secure your spot at the premier conference on strategic management and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Fees */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 lg:mb-12"
          >
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-2 text-center">
              Registration <span className="text-[#F97316]">Fees</span>
            </h2>
            <p className="text-[#475569] text-[14px] sm:text-[16px] text-center mb-8 lg:mb-10">
              Early bird rates valid until March 20, 2026
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {registrationFees.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F8FAFC] rounded-lg p-5 sm:p-6 border border-[#E2E8F0]"
                >
                  <h3 className="text-[#0B1F3A] text-[18px] sm:text-[20px] lg:text-[22px] font-['Montserrat',sans-serif] font-bold mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="bg-white rounded-md p-3 border border-[#E2E8F0]">
                        <p className="text-[#0F172A] text-[13px] sm:text-[14px] font-semibold mb-2">{type.type}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[10px] sm:text-[11px] mb-0.5">Early Bird</p>
                            <p className="text-[#1E4ED8] text-[16px] sm:text-[20px] font-bold">{type.earlyBird}</p>
                          </div>
                          <div className="w-px h-10 bg-[#E2E8F0]" />
                          <div className="text-center flex-1">
                            <p className="text-[#475569] text-[10px] sm:text-[11px] mb-0.5">Regular</p>
                            <p className="text-[#0B1F3A] text-[16px] sm:text-[20px] font-bold">{type.regular}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 bg-[#FFF7ED] border-l-4 border-[#F97316] rounded-md p-4"
            >
              <p className="text-[#0F172A] text-[13px] sm:text-[14px]">
                <strong>Note:</strong> Registration fee includes conference kit, meals, and access to all sessions. At least one author per accepted paper must register. Certificates for co-authors (not registered) will be provided upon payment of Rs. 500 per co-author.
              </p>
            </motion.div>

            {/* Bank Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-gradient-to-br from-[#0B1F3A] to-[#1E4ED8] rounded-xl p-6 sm:p-8 text-white"
            >
              <h3 className="text-[20px] sm:text-[24px] font-['Montserrat',sans-serif] font-bold mb-6">
                Bank Account Details
              </h3>
              
              {/* Bank Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Name</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">BNMIT-MBA</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Bank Name</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">Canara Bank</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Account Number</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">1147101031035</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">IFSC Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">CNRB0001147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">1147</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">MICR Code</p>
                  <p className="text-white text-[15px] sm:text-[16px] font-semibold">560015006</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:col-span-2">
                  <p className="text-white/70 text-[12px] sm:text-[13px] mb-1">Branch Address</p>
                  <p className="text-white text-[14px] sm:text-[15px] font-semibold">24/25, 27th Cross, Sevakshetra Complex, Banashankari II Stage, Bangalore - 560070</p>
                </div>
              </div>
              
              {/* UPI Note */}
              <div className="mt-6 bg-[#F97316] rounded-lg p-4">
                <p className="text-white text-[14px] sm:text-[15px] font-medium">
                  <strong>Note:</strong> While paying through UPI, please add a note as <span className="underline font-bold">'Towards BNMIT Conference 2026'</span>
                </p>
              </div>
              
              {/* QR Code - Below Bank Details */}
              <div className="mt-6 flex justify-center">
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg inline-block">
                  <img 
                    src={UPI} 
                    alt="UPI QR Code for Payment" 
                    className="w-[280px] sm:w-[320px] lg:w-[360px] h-auto mx-auto"
                  />
                  <p className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-bold mt-4 text-center">Scan to Pay via UPI</p>
                  <p className="text-[#475569] text-[13px] sm:text-[14px] text-center mt-1">Works with GPay, PhonePe, Paytm & all UPI apps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-10 sm:py-12 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[#0B1F3A] text-[24px] sm:text-[28px] lg:text-[32px] font-['Montserrat',sans-serif] font-bold mb-6 text-center">
              Cancellation & <span className="text-[#F97316]">Refund Policy</span>
            </h2>
            
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
              {/* Refund Policy Row */}
              <div className="flex flex-col sm:flex-row border-b border-[#E2E8F0]">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">Refund Policy</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#334155] text-[14px] sm:text-[15px]">
                      <span className="font-bold text-[#0B1F3A]">Before April 05, 2026:</span> Full refund will be provided (₹1,000 cancellation charges applicable)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-[#334155] text-[14px] sm:text-[15px]">
                      <span className="font-bold text-[#0B1F3A]">After April 05, 2026:</span> No refund will be provided
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Row */}
              <div className="flex flex-col sm:flex-row border-b border-[#E2E8F0]">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">Contact</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 flex items-center">
                  <p className="text-[#334155] text-[14px] sm:text-[15px]">
                    Submit cancellation requests in writing to <a href="mailto:bnmitconference@bnmit.in" className="text-[#1E4ED8] font-bold hover:underline">bnmitconference@bnmit.in</a>
                  </p>
                </div>
              </div>

              {/* No-Show Row */}
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 bg-[#0B1F3A] px-6 py-5 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-[16px] sm:text-[18px]">No-Show</span>
                  </div>
                </div>
                <div className="sm:w-3/4 px-6 py-5 flex items-center">
                  <p className="text-[#334155] text-[14px] sm:text-[15px]">
                    No refunds will be provided for attendees who fail to attend the conference without prior cancellation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <motion.section
        ref={contentRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-12 sm:py-16 lg:py-20 bg-white border-t border-[#E2E8F0]"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.h2
            variants={fadeInUp}
            className="text-[#0B1F3A] text-[24px] sm:text-[30px] lg:text-[36px] font-['Montserrat',sans-serif] font-bold mb-6 text-center"
          >
            Registration <span className="text-[#F97316]">Form</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="bg-[#F8FAFC] rounded-lg p-5 sm:p-6 lg:p-8 border border-[#E2E8F0]"
            ref={formRef}
          >
            <div className="space-y-5">
              {/* Personal Information Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['name'] = el; }}>
                    <Label htmlFor="name" className="text-[13px]">Full Name *</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Enter your full name"
                        className={getInputClassName("name")}
                        disabled={isFieldDisabled("name")}
                      />
                      <ValidIndicator field="name" />
                    </div>
                    <ErrorMessage field="name" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['nationality'] = el; }}>
                    <Label htmlFor="nationality" className="text-[13px]">Nationality *</Label>
                    <div className="relative">
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange("nationality", e.target.value)}
                        onBlur={() => handleBlur("nationality")}
                        placeholder="e.g., Indian"
                        className={getInputClassName("nationality")}
                        disabled={isFieldDisabled("nationality")}
                      />
                      <ValidIndicator field="nationality" />
                    </div>
                    <ErrorMessage field="nationality" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['phone'] = el; }}>
                    <Label htmlFor="phone" className="text-[13px]">Phone Number (with country code) *</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+91 9876543210"
                        className={getInputClassName("phone")}
                        disabled={isFieldDisabled("phone")}
                      />
                      <ValidIndicator field="phone" />
                    </div>
                    <ErrorMessage field="phone" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['email'] = el; }}>
                    <Label htmlFor="email" className="text-[13px]">Email ID *</Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="your.email@example.com"
                          className={getInputClassName("email")}
                          disabled={emailVerified}
                        />
                        <ValidIndicator field="email" />
                      </div>
                      
                      {!emailVerified && (
                        <motion.button
                          onClick={handleSendMagicLink}
                          disabled={isVerifying || !formData.email || !!errors.email}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 px-4 rounded-md font-semibold text-[13px] transition-all duration-200 bg-[#1E4ED8] text-white hover:bg-[#1a3eb3] disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isVerifying ? 'Sending...' : verifyStep === 'sent' ? 'Link Sent - Check Email' : 'Verify Email'}
                        </motion.button>
                      )}

                      {verifyMessage && (
                        <div className={`p-3 rounded-md text-[12px] ${
                          verifyStep === 'verified' 
                            ? 'bg-[#D1FAE5] text-[#065F46] border border-[#6EE7B7]' 
                            : verifyStep === 'sent'
                              ? 'bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD]'
                              : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                        }`}>
                          {verifyMessage}
                        </div>
                      )}

                      {emailVerified && (
                        <div className="flex items-center gap-2 text-[#10B981] text-[12px] font-medium">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Email verified successfully!
                        </div>
                      )}
                    </div>
                    <ErrorMessage field="email" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['affiliation'] = el; }}>
                    <Label htmlFor="affiliation" className="text-[13px]">Affiliation *</Label>
                    <div className="relative">
                      <Input
                        id="affiliation"
                        value={formData.affiliation}
                        onChange={(e) => handleInputChange("affiliation", e.target.value)}
                        onBlur={() => handleBlur("affiliation")}
                        placeholder="e.g., BNM Institute of Technology"
                        className={getInputClassName("affiliation")}
                        disabled={isFieldDisabled("affiliation")}
                      />
                      <ValidIndicator field="affiliation" />
                    </div>
                    <ErrorMessage field="affiliation" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['placeOfAffiliation'] = el; }}>
                    <Label htmlFor="placeOfAffiliation" className="text-[13px]">Place of Affiliation *</Label>
                    <div className="relative">
                      <Input
                        id="placeOfAffiliation"
                        value={formData.placeOfAffiliation}
                        onChange={(e) => handleInputChange("placeOfAffiliation", e.target.value)}
                        onBlur={() => handleBlur("placeOfAffiliation")}
                        placeholder="e.g., Bangalore, Karnataka, India"
                        className={getInputClassName("placeOfAffiliation")}
                        disabled={isFieldDisabled("placeOfAffiliation")}
                      />
                      <ValidIndicator field="placeOfAffiliation" />
                    </div>
                    <ErrorMessage field="placeOfAffiliation" />
                  </div>
                </div>
              </div>

              {/* Paper Details Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Paper Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2" ref={(el) => { fieldRefs.current['paperTitle'] = el; }}>
                    <Label htmlFor="paperTitle" className="text-[13px]">Title of the Paper *</Label>
                    <div className="relative">
                      <Input
                        id="paperTitle"
                        value={formData.paperTitle}
                        onChange={(e) => handleInputChange("paperTitle", e.target.value)}
                        onBlur={() => handleBlur("paperTitle")}
                        placeholder="Enter your paper title"
                        className={getInputClassName("paperTitle")}
                        disabled={isFieldDisabled("paperTitle")}
                      />
                      <ValidIndicator field="paperTitle" />
                    </div>
                    <ErrorMessage field="paperTitle" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['trackNumber'] = el; }}>
                    <Label htmlFor="trackNumber" className="text-[13px]">Sub-Theme Track *</Label>
                    <Select 
                      value={formData.trackNumber} 
                      onValueChange={(value: string) => {
                        handleInputChange("trackNumber", value);
                        setTouched({ ...touched, trackNumber: true });
                      }}
                      disabled={isFieldDisabled("trackNumber")}
                    >
                      <SelectTrigger className={getSelectClassName("trackNumber")} disabled={isFieldDisabled("trackNumber")}>
                        <SelectValue placeholder="Select research track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="track1">Track 1: Digital Transformation & Strategic Management</SelectItem>
                        <SelectItem value="track2">Track 2: Artificial Intelligence, Data & Decision-Making</SelectItem>
                        <SelectItem value="track3">Track 3: Innovation, Sustainability & Emerging Technologies</SelectItem>
                        <SelectItem value="track4">Track 4: Human Capital & Future of Work</SelectItem>
                        <SelectItem value="track5">Track 5: Digital Marketing, Platforms & Consumer Behavior</SelectItem>
                        <SelectItem value="track6">Track 6: Governance, Ethics & Risk in Tech-Driven Management</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorMessage field="trackNumber" />
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paperId'] = el; }}>
                    <Label htmlFor="paperId" className="text-[13px]">Paper ID/Code *</Label>
                    <div className="relative">
                      <Input
                        id="paperId"
                        value={formData.paperId}
                        onChange={(e) => handleInputChange("paperId", e.target.value)}
                        onBlur={() => handleBlur("paperId")}
                        placeholder="e.g., ICSAR-2026-001"
                        className={getInputClassName("paperId")}
                        disabled={isFieldDisabled("paperId")}
                      />
                      <ValidIndicator field="paperId" />
                    </div>
                    <ErrorMessage field="paperId" />
                  </div>
                </div>
              </div>

              {/* Payment Details Section */}
              <div className="border-b border-[#E2E8F0] pb-5">
                <h3 className="text-[#0B1F3A] text-[16px] sm:text-[18px] font-['Montserrat',sans-serif] font-bold mb-4">
                  Payment Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['amountPaid'] = el; }}>
                    <Label htmlFor="amountPaid" className="text-[13px]">Amount Paid *</Label>
                    <Select 
                      value={formData.amountPaid} 
                      onValueChange={(value: string) => {
                        handleInputChange("amountPaid", value);
                        setTouched({ ...touched, amountPaid: true });
                      }}
                      disabled={isFieldDisabled("amountPaid")}
                    >
                      <SelectTrigger className={getSelectClassName("amountPaid")} disabled={isFieldDisabled("amountPaid")}>
                        <SelectValue placeholder="Select the amount you paid" />
                      </SelectTrigger>
                      <SelectContent>
                        {feeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage field="amountPaid" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paymentAccount'] = el; }}>
                      <Label htmlFor="paymentAccount" className="text-[13px]">Account No. / UPI ID *</Label>
                      <div className="relative">
                        <Input
                          id="paymentAccount"
                          value={formData.paymentAccount}
                          onChange={(e) => handleInputChange("paymentAccount", e.target.value)}
                          onBlur={() => handleBlur("paymentAccount")}
                          placeholder="e.g., 1234567890 or yourname@upi"
                          className={getInputClassName("paymentAccount")}
                          disabled={isFieldDisabled("paymentAccount")}
                        />
                        <ValidIndicator field="paymentAccount" />
                      </div>
                      <ErrorMessage field="paymentAccount" />
                    </div>
                    <div className="space-y-1.5" ref={(el) => { fieldRefs.current['transactionId'] = el; }}>
                      <Label htmlFor="transactionId" className="text-[13px]">Transaction ID *</Label>
                      <div className="relative">
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange("transactionId", e.target.value)}
                          onBlur={() => handleBlur("transactionId")}
                          placeholder="Enter your payment transaction ID"
                          className={getInputClassName("transactionId")}
                          disabled={isFieldDisabled("transactionId")}
                        />
                        <ValidIndicator field="transactionId" />
                      </div>
                      <ErrorMessage field="transactionId" />
                    </div>
                  </div>
                  <div className="space-y-1.5" ref={(el) => { fieldRefs.current['paymentProof'] = el; }}>
                    <Label htmlFor="paymentProof" className="text-[13px]">Upload Proof of Payment *</Label>
                    <input
                      type="file"
                      id="paymentProof"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      disabled={isFieldDisabled("paymentProof")}
                      className={`block w-full text-[13px] text-[#475569] file:mr-3 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-[13px] file:font-semibold file:bg-[#1E4ED8] file:text-white hover:file:bg-[#1a3eb3] file:cursor-pointer cursor-pointer border rounded-md transition-colors duration-200 ${
                        touched.paymentProof && errors.paymentProof 
                          ? 'border-[#E53935] bg-[#FFF5F5]' 
                          : touched.paymentProof && formData.paymentProof 
                            ? 'border-[#10B981]' 
                            : 'border-[#E2E8F0]'
                      } ${isFieldDisabled("paymentProof") ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <p className="text-[11px] text-[#475569]">
                      Accepted: JPG, PNG, PDF (Max 50MB)
                    </p>
                    <ErrorMessage field="paymentProof" />
                    {formData.paymentProof && !errors.paymentProof && (
                      <p className="text-[13px] text-[#10B981] font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        File: {formData.paymentProof.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="button"
                  disabled={!isFormValid || !emailVerified}
                  whileHover={isFormValid && emailVerified ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && emailVerified ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  className={`w-full py-3.5 rounded-md font-semibold text-[15px] transition-all duration-200 ${
                    isFormValid && emailVerified
                      ? 'bg-[#1E4ED8] text-white hover:bg-[#1a3eb3] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {!emailVerified ? 'Verify Email to Continue' : isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </motion.button>
                <p className="text-center text-[12px] text-[#475569] mt-3">
                  By submitting, you agree to our terms and conditions. We will verify your payment and send confirmation to your email.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}