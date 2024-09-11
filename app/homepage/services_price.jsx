"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Service_price() {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("monthly");

  useEffect(() => {
    axios
      .get("https://virtualseoweb.pythonanywhere.com/serviceplans/")
      .then((response) => {
        setPricingData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pricing data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Get unique Plan_type values
  const planTypes = [...new Set(pricingData.map((plan) => plan.plan_type))];

  // Filter plans based on the selected tab
  const filteredPlans = pricingData.filter(
    (plan) => plan.plan_type === activeTab
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="md:px-[10em] p-2">
      <p className="text-xl md:text-4xl text-black text-center mb-5 font-bold md:mt-20">
        The Best Solutions for Our Clients
      </p>

      {/* Tabs */}
      <div className="flex justify-center items-center max-w-[40rem] mx-auto text-center md:mt-10 mb-8 lg:mb-16">
        <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-900">
          {planTypes.map((type) => (
            <button
              key={type}
              className={`relative flex-1 text-xl font-bold h-8 rounded-full transition-colors duration-150 ease-in-out ${
                activeTab === type
                  ? "bg-blue-500 text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              onClick={() => setActiveTab(type)}
              aria-pressed={activeTab === type}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing tabs */}
      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="h-full">
            <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200 shadow shadow-slate-950/5">
              <div className="mb-5">
                <div className="text-black font-semibold mb-1 text-3xl">
                  {plan.plan_name}
                </div>
                <div className="inline-flex items-baseline mb-2">
                  <span className="text-black font-bold text-3xl">
                    ${plan.plan_price}
                  </span>
                  <span className="text-black font-medium">
                    &nbsp;/{plan.plan_type === "annual" ? "Yearly" : "Monthly"}
                  </span>
                </div>
              </div>
              <div className="text-black font-medium mb-3">Includes:</div>
              <ul className="text-black text-sm space-y-3 grow">
                {plan.include_items.length === 0 ? (
                  <li>No items included</li>
                ) : (
                  plan.include_items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <svg
                        className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{item.name}</span>
                    </li>
                  ))
                )}
              </ul>
              <a
                className="w-full mt-5 inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                href="#0"
              >
                Purchase Plan
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service_price;
