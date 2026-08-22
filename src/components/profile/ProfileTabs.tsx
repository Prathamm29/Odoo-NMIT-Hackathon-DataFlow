"use client";

import { useState } from "react";
import type { EmployeeProfileDTO } from "@/lib/types";

export default function ProfileTabs({ profile }: { profile: EmployeeProfileDTO }) {
  const [activeTab, setActiveTab] = useState("salary");

  const tabs = [
    { id: "salary", label: "Salary Info" },
    { id: "resume", label: "Resume" },
    { id: "private", label: "Private Info" },
    { id: "security", label: "Security" },
  ];

  
  const monthlyWage = profile.baseMonthlyWage;
  const yearlyWage = monthlyWage * 12;
  const basicSalary = monthlyWage * 0.6;
  const houseRentAllowance = monthlyWage * 0.25;
  const specialAllowance = monthlyWage * 0.15;
  const federalTax = monthlyWage * 0.15;
  const stateTax = monthlyWage * 0.05;
  const healthInsurance = 150;
  const totalDeductions = federalTax + stateTax + healthInsurance;
  const netPay = monthlyWage - totalDeductions;

  return (
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
        {activeTab === "salary" && (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Compensation Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Monthly Wage</label>
                  <input type="text" readOnly value={`$${monthlyWage.toFixed(2)}`} className="w-full border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Yearly Wage</label>
                  <input type="text" readOnly value={`$${yearlyWage.toFixed(2)}`} className="w-full border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 font-mono text-sm" />
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
                    <span className="text-gray-600">Basic Salary (60%)</span>
                    <span className="font-mono text-gray-900">${basicSalary.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">House Rent Allowance (25%)</span>
                    <span className="font-mono text-gray-900">${houseRentAllowance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Special Allowance (15%)</span>
                    <span className="font-mono text-gray-900">${specialAllowance.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-900">Total Earnings</span>
                    <span className="font-mono text-green-700">${monthlyWage.toFixed(2)}</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Tax & Deductions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Federal Tax (15%)</span>
                    <span className="font-mono text-gray-900">-${federalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">State Tax (5%)</span>
                    <span className="font-mono text-gray-900">-${stateTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Health Insurance</span>
                    <span className="font-mono text-gray-900">-${healthInsurance.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-900">Total Deductions</span>
                    <span className="font-mono text-red-700">-${totalDeductions.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Net Pay</span>
                <span className="text-xl font-bold font-mono text-gray-900">${netPay.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "resume" && (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-2">About</h3>
              <p className="text-gray-700 text-sm">Profile information for {profile.firstName} {profile.lastName}. Add resume content here.</p>
            </section>
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
  );
}
