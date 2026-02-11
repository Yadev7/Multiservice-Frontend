"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Wrench, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function BecomeTaskerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    // p-4 ensures the card doesn't touch screen edges on mobile
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center md:p-8">

      {/* Container: Max-width increases on desktop for a "premium" feel */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Section: Visual Sidebar (Hidden on small mobile, visible on tablet+) */}
        <div className="hidden md:flex md:w-1/3 relative overflow-hidden flex-col justify-between text-white p-10">

          {/* Background Image */}
          <Image
            src="/become_tasker.png"
            alt="Service provider working"
            width={400}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay (Darkens the image so text stays readable) */}
          <div className="absolute inset-0" />

          {/* Content (Z-index ensures it stays above the image/overlay) */}
          <div className="relative z-10">
            {/* <Briefcase className="w-12 h-12 mb-6 text-blue-200" /> */}
            <h2 className="text-2xl font-bold leading-tight">
              {/* {t('become_tasker_page.sidebar_title', 'Join our community of experts')} */}
            </h2>
            <p className="mt-4 text-blue-50 text-sm leading-relaxed font-medium">
              {/* {t('become_tasker_page.sidebar_description')} */}
            </p>
          </div>

          <div className="relative z-10 text-xs opacity-70">
            {/* You can add a logo or extra info here */}
            Khadamat Platform © 2026
          </div>
        </div>

        {/* Right Section: The Form */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {t('become_tasker_page.title')}
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {t('become_tasker_page.description')}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Grid: 1 col on mobile, 2 cols on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                  {t('become_tasker_page.form.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('become_tasker_page.form.name_placeholder')}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                  {t('become_tasker_page.form.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('become_tasker_page.form.email_placeholder')}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                {t('become_tasker_page.form.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('become_tasker_page.form.phone_placeholder')}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                {t('become_tasker_page.form.skills')}
              </label>
              <div className="relative">
                <Wrench className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  id="skills"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm min-h-[120px]"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder={t('become_tasker_page.form.skills_placeholder')}
                  rows={4}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2"
            >
              <Send className="w-4 h-4" />
              {t("become_tasker_page.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}