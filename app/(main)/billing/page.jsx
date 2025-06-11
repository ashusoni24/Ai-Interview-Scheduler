import BillingCredits from "./_components/BillingCredits";
import { CreditCard, CheckCircle2 } from "lucide-react";

const plans = [
	{
		name: "Basic",
		price: "$5",
		credits: 20,
		features: ["Basic interview templates", "Email support"],
		color: "from-blue-100 to-blue-50",
	},
	{
		name: "Standard",
		price: "$12",
		credits: 50,
		features: ["All interview templates", "Priority support", "Basic analytics"],
		color: "from-purple-100 to-purple-50",
	},
	{
		name: "Pro",
		price: "$25",
		credits: 120,
		features: [
			"All interview templates",
			"24/7 support",
			"Advanced analytics",
		],
		color: "from-green-100 to-green-50",
	},
];

export default function BillingPage() {
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-1">Billing</h2>
			<p className="text-gray-500 mb-6">Manage your Payment and credits</p>
			<div className="flex flex-col md:flex-row gap-8">
				<BillingCredits />
				<div className="flex-[2] grid grid-cols-1 md:grid-cols-3 gap-6">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`bg-gradient-to-br ${plan.color} rounded-2xl shadow-lg p-6 flex flex-col items-start border hover:shadow-2xl transition`}
						>
							<div className="flex items-center gap-2 mb-2">
								<CreditCard className="text-blue-500" size={24} />
								<span className="font-bold text-lg">{plan.name}</span>
							</div>
							<div className="text-2xl font-bold mb-1">{plan.price}</div>
							<div className="text-gray-500 mb-3">{plan.credits} interviews</div>
							<ul className="mb-4 space-y-1">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
										<CheckCircle2 className="text-green-500" size={16} /> {feature}
									</li>
								))}
							</ul>
							<button className="w-full mt-auto bg-gradient-to-r bg-blue-400 text-white font-semibold py-2 rounded-lg shadow hover:scale-105 transition">
								Purchase Credits
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}