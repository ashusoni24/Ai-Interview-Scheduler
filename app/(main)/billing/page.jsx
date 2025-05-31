import BillingCredits from './_components/BillingCredits';
import BillingPlans from './_components/BillingPlans';

export default function BillingPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-1">Billing</h2>
      <p className="text-gray-500 mb-6">Manage your Payment and credits</p>
      <div className="flex flex-col md:flex-row gap-8">
        <BillingCredits />
        <BillingPlans />
      </div>
    </div>
  );
}