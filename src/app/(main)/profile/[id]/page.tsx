"use client";

import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("resume");

  const tabs = [
    { id: "resume", label: "Resume" },
    { id: "private", label: "Private Info" },
    { id: "salary", label: "Salary Info" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white border border-gray-300 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Jane Doe</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="block text-gray-500 font-medium">Login ID / Email</span>
              <span className="block text-gray-900">janedoe@example.com</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Mobile</span>
              <span className="block text-gray-900">+1 (555) 123-4567</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Company</span>
              <span className="block text-gray-900">Dayflow Inc.</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Department</span>
              <span className="block text-gray-900">Engineering</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Manager</span>
              <span className="block text-gray-900">John Smith</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Location</span>
              <span className="block text-gray-900">San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-white border border-gray-300">
        <div className="border-b border-gray-300 flex space-x-1 p-1 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-bold border ${
                activeTab === tab.id 
                  ? "bg-white border-gray-300 text-gray-900 border-b-transparent relative top-[1px]" 
                  : "border-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "resume" && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">About</h3>
                <p className="text-gray-700 text-sm">Passionate software engineer with 5 years of experience in building scalable web applications. I enjoy tackling complex problems and learning new technologies.</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">What I love about my job</h3>
                <p className="text-gray-700 text-sm">The constant challenge and the collaborative environment with brilliant peers.</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">My interests and hobbies</h3>
                <p className="text-gray-700 text-sm">Hiking, Photography, Open-source contribution, and reading Sci-Fi novels.</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-xs font-bold text-gray-700">React</span>
                  <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-xs font-bold text-gray-700">TypeScript</span>
                  <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-xs font-bold text-gray-700">Node.js</span>
                  <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-xs font-bold text-gray-700">GraphQL</span>
                </div>
              </section>
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>AWS Certified Developer - Associate</li>
                  <li>Google Cloud Professional Cloud Architect</li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === "salary" && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Compensation Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Monthly Wage</label>
                    <input type="text" readOnly value="$8,500.00" className="w-full border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Yearly Wage</label>
                    <input type="text" readOnly value="$102,000.00" className="w-full border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">No. of working days / month</label>
                    <input type="text" readOnly value="22" className="w-full border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 text-sm" />
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Salary Components</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Basic Salary</span>
                      <span className="font-mono text-gray-900">$5,000.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">House Rent Allowance</span>
                      <span className="font-mono text-gray-900">$2,000.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Special Allowance</span>
                      <span className="font-mono text-gray-900">$1,500.00</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
                      <span className="text-gray-900">Total Earnings</span>
                      <span className="font-mono text-green-700">$8,500.00</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Tax & Deductions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Federal Tax</span>
                      <span className="font-mono text-gray-900">-$1,200.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">State Tax</span>
                      <span className="font-mono text-gray-900">-$450.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Health Insurance</span>
                      <span className="font-mono text-gray-900">-$150.00</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
                      <span className="text-gray-900">Total Deductions</span>
                      <span className="font-mono text-red-700">-$1,800.00</span>
                    </div>
                  </div>
                </section>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Net Pay</span>
                  <span className="text-xl font-bold font-mono text-gray-900">$6,700.00</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "private" && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 border-2 border-dashed border-gray-300">
              <p>Private information is hidden for mock display.</p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 border-2 border-dashed border-gray-300">
              <p>Security settings are hidden for mock display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
