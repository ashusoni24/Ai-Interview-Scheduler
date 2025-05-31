import React from 'react'

const plans = [
  {
    name: "Basic",
    price: "$5",
    interviews: 20,
    features: ["Basic interview templates", "Email support"],
  },
  {
    name: "Standard",
    price: "$12",
    interviews: 50,
    features: ["All interview templates", "Priority support", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$25",
    interviews: 120,
    features: ["All interview templates", "24/7 support", "Advanced analytics"],
  },
];

export default function BillingPlans() {
  return (
    <div className="bg-blue-50 rounded-xl shadow p-6 flex-1">
      <h3 className="font-semibold mb-2">Purchase Credits</h3>
      <p className="text-gray-500 mb-4 text-sm">Add more interview credits to your account</p>
      <div className="flex flex-col md:flex-row gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg p-4 flex-1 flex flex-col bg-white ">
            <div className="font-bold text-lg mb-1">{plan.name}</div>
            <div className="text-2xl font-bold mb-2">{plan.price}</div>
            <div className="mb-2 text-gray-500">{plan.interviews} interviews</div>
            <ul className="mb-4 text-sm text-gray-700 flex-1">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white rounded w-full py-2 font-semibold hover:bg-blue-700 transition mt-auto">
              Purchase Credits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}