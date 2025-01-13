"use client";

import React, { useState } from "react";

type PolicyType = "terms" | "refund" | "privacy" | "shipping";

interface PolicyContent {
  title: string;
  updateDate: string;
  content: React.ReactNode;
}

const PolicySidebar = ({
  activePolicy,
  onPolicyChange,
}: {
  activePolicy: PolicyType;
  onPolicyChange: (policy: PolicyType) => void;
}) => {
  const navItems: { id: PolicyType; label: string }[] = [
    { id: "terms", label: "Terms & Conditions" },
    { id: "refund", label: "Return & Refund Policy" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "shipping", label: "Shipping & Payment Policy" },
  ];

  return (
    <div className="w-full md:w-64">
      <div className="bg-gray-800 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-600">
          {navItems.map(({ id, label }) => (
            <li
              key={id}
              className={`p-4 cursor-pointer transition-colors ${
                activePolicy === id
                  ? "bg-gray-600 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
              onClick={() => onPolicyChange(id)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PolicyContent = ({
  title,
  updateDate,
  children,
}: {
  title: string;
  updateDate: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 text-sm">Updated at {updateDate}</p>
    </div>
    <div className="prose prose-invert max-w-none">{children}</div>
  </div>
);

const policies: Record<PolicyType, PolicyContent> = {
  terms: {
    title: "Terms & Conditions",
    updateDate: "2023-05-18",
    content: (
      <div className="space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">
          General Terms - Orders
        </h2>
        <ol className="list-decimal space-y-4 ml-4">
          <li className="pl-2">
            Original receipt needs to be presented at the time of taking
            delivery of garments.
          </li>
          <li className="pl-2">
            Customers are requested to examine the garments at the time of
            delivery; we will not be responsible for any damages indicated after
            delivery.
          </li>
          <li className="pl-2">
            We are not responsible for fastness / running of color / shrinkage /
            damage to embellishments / embroidery work on the garments during
            process.
          </li>
          <li className="pl-2">
            Every effort is made to remove stains. If stains are not removable,
            the customer shall not have any rights to claim deduction in
            charges.
          </li>
          <li className="pl-2">
            We follow a &quot;No claim&quot; policy. All articles are accepted
            at customer&apos;s risk. We shall not be held responsible for damage
            to garments that cannot withstand the normal cleaning process due to
            age / quality of garments.
          </li>
          <li className="pl-2">
            We shall not be held responsible for any ornaments / Jewelry
            fittings on the garment.
          </li>
        </ol>
      </div>
    ),
  },
  refund: {
    title: "Return & Refund Policy",
    updateDate: "2023-05-18",
    content: (
      <div className="space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">
          Return & Refund Guidelines
        </h2>
        <div className="space-y-4">
          <p>
            We strive to provide the highest quality dry cleaning services.
            However, if you&apos;re not satisfied with our service, please note
            the following policy:
          </p>
          <ol className="list-decimal space-y-4 ml-4">
            <li className="pl-2">
              All complaints must be reported within 24 hours of garment pickup.
            </li>
            <li className="pl-2">
              Refunds or reprocessing will be offered for services that
              don&apos;t meet our quality standards.
            </li>
            <li className="pl-2">
              The garment must be returned unworn and in the same condition as
              delivered.
            </li>
            <li className="pl-2">
              Refunds will be processed in the same form as the original
              payment.
            </li>
            <li className="pl-2">
              For damaged items, we may offer compensation based on the age and
              condition of the garment.
            </li>
          </ol>
        </div>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    updateDate: "2023-05-18",
    content: (
      <div className="space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">Privacy Guidelines</h2>
        <div className="space-y-4">
          <p>
            Your privacy is important to us. This policy outlines how we collect
            and use your information:
          </p>
          <h3 className="font-semibold text-white mt-4">
            Information We Collect
          </h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>Contact information (name, address, phone number, email)</li>
            <li>Service preferences and history</li>
            <li>Payment information</li>
          </ul>
          <h3 className="font-semibold text-white mt-4">
            How We Use Your Information
          </h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>To provide and improve our dry cleaning services</li>
            <li>To communicate about your orders</li>
            <li>To send service updates and promotional offers</li>
            <li>To maintain your account and preferences</li>
          </ul>
        </div>
      </div>
    ),
  },
  shipping: {
    title: "Shipping & Payment Policy",
    updateDate: "2023-05-18",
    content: (
      <div className="space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">
          Shipping & Payment Information
        </h2>
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Delivery Services</h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>Standard delivery: 3-4 business days</li>
            <li>
              Express service: 24-hour turnaround (additional charges apply)
            </li>
            <li>Free pickup and delivery for orders above $50</li>
          </ul>

          <h3 className="font-semibold text-white mt-4">Payment Methods</h3>
          <ul className="list-disc ml-4 space-y-2">
            <li>Credit/Debit cards</li>
            <li>Cash on delivery</li>
            <li>Digital wallets</li>
            <li>Monthly billing for regular customers</li>
          </ul>

          <h3 className="font-semibold text-white mt-4">Service Areas</h3>
          <p>
            We currently serve the following areas with free pickup and
            delivery:
          </p>
          <ul className="list-disc ml-4 space-y-2">
            <li>Downtown - All locations</li>
            <li>Suburban areas - Within 10 mile radius</li>
            <li>
              Additional charges may apply for locations outside service areas
            </li>
          </ul>
        </div>
      </div>
    ),
  },
};

const PolicyPage = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>("terms");

  return (
    <div className="min-h-screen bg-gray-700 pt-12">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <PolicySidebar
            activePolicy={activePolicy}
            onPolicyChange={setActivePolicy}
          />
          <div className="flex-1">
            <PolicyContent
              title={policies[activePolicy].title}
              updateDate={policies[activePolicy].updateDate}
            >
              {policies[activePolicy].content}
            </PolicyContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
