"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logger } from "@/lib/logger";

interface ContactSectionProps {
  statusText?: string;
  mainHeading?: string;
  gradientText?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  phone?: string;
  message?: string;
  submit?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  statusText = "Ready to Transform ?",
  mainHeading = "Let&apos;s Create",
  gradientText = "Something Epic",
  description = "Transform your boldest ideas into extraordinary digital experiences that captivate, inspire, and drive meaningful results for your business.",
  buttonText = "Contact Us",
  className = "",
  isModalOpen,
  openModal,
  closeModal,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Rate limiting: prevent multiple submissions within 30 seconds
  const RATE_LIMIT_DURATION = 30000; // 30 seconds

  // Focus management and modal accessibility
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    // Focus trap implementation
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);
    document.body.style.overflow = "hidden";

    // Focus first input when modal opens
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, closeModal]);

  // Close modal when clicking outside
  useEffect(() => {
    if (!isModalOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  // Focus restoration when modal closes
  useEffect(() => {
    if (!isModalOpen && openerRef.current) {
      openerRef.current.focus();
    }
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const isValidPhone = (phone: string): boolean => {
    if (!phone.trim()) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters long";
    }

    // Phone validation (optional)
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_DURATION) {
      setErrors({
        submit: "Please wait a moment before sending another message.",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(now);

    try {
      // EmailJS integration with proper error handling
      if (typeof window !== "undefined" && (window as any).emailjs) {
        const { emailjs } = window as any;

        // Get EmailJS configuration from environment variables
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateAdmin = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN;
        const templateAutoReply = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTO_REPLY;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        // Validate all credentials exist
        if (!serviceId || !templateAdmin || !templateAutoReply || !publicKey) {
          throw new Error('EmailJS configuration missing. Please set environment variables.');
        }

        // Template parameters for admin notification
        const adminTemplateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          phone: formData.phone || "Not provided",
          message: formData.message,
          submission_date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          user_agent: navigator.userAgent,
          ip_address: "Client-side (not available)",
        };

        // Template parameters for auto-reply to user
        const autoReplyParams = {
          to_name: formData.name,
          user_email: formData.email,
          subject: formData.subject,
        };

        // Send email to admin with timeout
        const adminPromise = emailjs.send(
          serviceId,
          templateAdmin,
          adminTemplateParams,
          publicKey
        );

        // Send auto-reply to user with timeout
        const autoReplyPromise = emailjs.send(
          serviceId,
          templateAutoReply,
          autoReplyParams,
          publicKey
        );

        // Wait for both emails to be sent with timeout
        await Promise.all([
          Promise.race([
            adminPromise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Admin email timeout")), 10000)
            ),
          ]),
          Promise.race([
            autoReplyPromise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Auto-reply timeout")), 10000)
            ),
          ]),
        ]);

        // Show success animation
        setIsSuccess(true);

        // Reset form after showing success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
          });
          setErrors({});
          setIsSuccess(false);
          closeModal();
        }, 3000);
      } else {
        // Fallback for development/testing
        logger.info("EmailJS unavailable; simulating send", {
          admin_notification: {
            to: "admin@ecell-iet.com",
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            phone: formData.phone,
            message: formData.message,
            submission_date: new Date().toLocaleString(),
          },
          auto_reply: {
            to: formData.email,
            to_name: formData.name,
            subject: formData.subject,
          },
        });

        // Show success animation
        setIsSuccess(true);

        // Reset form after showing success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
          });
          setErrors({});
          setIsSuccess(false);
          closeModal();
        }, 3000);
      }

      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      logger.error("Error sending email", { 
        error, 
        message: error instanceof Error ? error.message : String(error) 
      });

      // More specific error messages
      let errorMessage = "Failed to send message. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          errorMessage =
            "Request timed out. Please check your connection and try again.";
        } else if (error.message.includes("network")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`w-full flex items-center justify-center p-2 md:p-4 pt-6 md:pt-8 ${className}`}
        id="contact"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="group relative backdrop-blur-2xl hover:backdrop-blur-3xl transition-all duration-700 bg-white/5 border border-white/20 rounded-3xl p-4 md:p-12 lg:p-16 hover:shadow-2xl hover:shadow-white/10">
            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-start">
              {/* Left Content */}
              <div className="space-y-4 md:space-y-8">
                {/* Status Badge - Above heading */}
                <div className="animate-fade-in animate-delay-200">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-yellow-200 tracking-wide uppercase">
                        {statusText}
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                {/* Main Heading */}
                <div className="animate-slide-up animate-delay-400">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.85] tracking-[-0.03em] text-white">
                    {mainHeading}{" "}
                    <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-shift font-light">
                      {gradientText}
                    </span>
                  </h1>
                </div>
                {/* Description */}
                <div className="animate-fade-in animate-delay-600">
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl font-light">
                    {description}
                  </p>
                </div>
              </div>
              {/* Right Content - CTA Button moved to bottom right */}
              <div className="flex justify-end items-end h-full lg:pt-20">
                <div className="animate-fade-in animate-delay-1000">
                  <button
                    onClick={() => {
                      openerRef.current = document.activeElement as HTMLElement;
                      openModal();
                    }}
                    className="group relative grid overflow-hidden rounded-full px-8 py-4 transition-all duration-200 shadow-[0_1000px_0_0_hsl(0_0%_85%)_inset] hover:shadow-lg min-w-[180px] bg-white text-black hover:scale-105"
                  >
                    <span className="spark absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)] before:rotate-[-90deg] before:animate-rotate before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                    <span className="backdrop absolute inset-px rounded-[22px] transition-colors duration-200 bg-neutral-100 group-hover:bg-neutral-200" />
                    <span className="z-10 flex items-center justify-center gap-2 text-sm font-medium">
                      <span>{buttonText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/5 group-hover:to-white/5 transition-all duration-700 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12"
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
              onClick={closeModal}
            />

            {/* Modal */}
            <div
              ref={modalRef}
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100 max-h-[85vh] sm:max-h-[85vh] md:max-h-[80vh] lg:max-h-[75vh] overflow-hidden mt-16 sm:mt-12 md:mt-8 lg:mt-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              aria-describedby="contact-modal-description"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800">
                <h2 id="contact-modal-title" className="text-xl font-semibold text-white">
                  {isSuccess ? "Success!" : "Contact Us"}
                </h2>
                <button
                  ref={closeButtonRef}
                  onClick={closeModal}
                  className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-neutral-800 relative z-10 min-w-[40px] min-h-[40px] flex items-center justify-center focus:outline-none"
                  aria-label="Close contact modal"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div 
                id="contact-modal-description" 
                className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(85vh-120px)] md:max-h-[calc(80vh-120px)] lg:max-h-[calc(75vh-120px)]"
              >
                {/* Live region for form status announcements */}
                <div aria-live="assertive" aria-atomic="true" className="sr-only">
                  {isSubmitting && "Submitting form, please wait..."}
                  {isSuccess && "Form submitted successfully!"}
                  {errors.submit && `Error: ${errors.submit}`}
                </div>
                {isSuccess ? (
                  // Success Animation
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    {/* Animated Checkmark */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-10 h-10 text-white animate-bounce" />
                      </div>
                      {/* Ripple effect */}
                      <div className="absolute inset-0 w-16 h-16 bg-green-500 rounded-full animate-ping opacity-75"></div>
                      <div
                        className="absolute inset-0 w-16 h-16 bg-green-500 rounded-full animate-ping opacity-50"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>

                    {/* Success Message */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        Message Sent!
                      </h3>
                      <p className="text-white/70 text-sm">
                        Thank you for reaching out. We&apos;ll get back to you
                        soon!
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full animate-pulse"
                        style={{ animationDuration: "3s" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  // Contact Form
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    role="form"
                    aria-label="Contact form"
                    noValidate
                  >
                    <fieldset className="space-y-4">
                      <legend className="sr-only">Contact Information</legend>
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 ${
                          errors.name ? "border-red-500" : "border-neutral-700"
                        }`}
                        placeholder="Enter your name"
                        aria-required="true"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Email <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 ${
                            errors.email
                              ? "border-red-500"
                              : "border-neutral-700"
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 ${
                            errors.subject
                              ? "border-red-500"
                              : "border-neutral-700"
                          }`}
                          placeholder="Enter subject"
                        />
                      </div>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Phone Number{" "}
                        <span className="text-neutral-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 ${
                            errors.phone
                              ? "border-red-500"
                              : "border-neutral-700"
                          }`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-2 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 resize-none ${
                          errors.message
                            ? "border-red-500"
                            : "border-neutral-700"
                        }`}
                        placeholder="Enter your message (minimum 10 characters)"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-neutral-400">
                        Minimum 10 characters required
                      </p>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.submit}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neutral-800 hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none"
                      aria-describedby={isSubmitting ? "submit-status" : undefined}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                          <span id="submit-status">Sending...</span>
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    </fieldset>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      {showSuccess && (
        <div 
          className="fixed bottom-6 right-6 z-[9998] animate-fade-in"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Message sent successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
