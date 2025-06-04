"use client";

import React, { useState } from "react";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">
        Legal Information
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/20 pb-2">
        <button
          className={`px-4 py-2 rounded-t font-semibold transition-colors ${
            activeTab === "privacy"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy Policy
        </button>
        <button
          className={`px-4 py-2 rounded-t font-semibold transition-colors ${
            activeTab === "terms"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
          onClick={() => setActiveTab("terms")}
        >
          Terms & Conditions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "privacy" ? <PrivacyPolicy /> : <TermsAndConditions />}
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">
        Privacy Policy
      </h2>
      <p className="mb-4">
        At Dr. San, your privacy is a top priority. We collect minimal personal
        data necessary to provide a secure and personalized healthcare
        experience.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>We do not sell or share your personal data with third parties.</li>
        <li>
          Data such as voice recordings or image uploads may be temporarily
          stored to assist with your session but are deleted after processing.
        </li>
        <li>
          All connections are end-to-end encrypted, and access is limited to the
          current session.
        </li>
        <li>
          You can request deletion of any data at any time by contacting
          support.
        </li>
      </ul>
    </section>
  );
}

function TermsAndConditions() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">
        Terms & Conditions
      </h2>
      <p className="mb-4">
        By using Dr. San, you agree to the following terms:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>This service is intended for informational purposes only.</li>
        <li>
          Dr. San is not a licensed medical practitioner. Always consult a
          qualified doctor for medical advice.
        </li>
        <li>
          You agree not to misuse the platform or upload inappropriate content.
        </li>
        <li>
          We reserve the right to suspend access if these terms are violated.
        </li>
      </ul>
      <p className="mt-4 text-sm text-gray-400">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </section>
  );
}
