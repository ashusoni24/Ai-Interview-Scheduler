import { Copy, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import moment from "moment";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  const url = `${window.location.origin}/scheduled-interview/${interview?.interview_id}`;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };

  const onSend = () => {
    window.location.href = `mailto:24ashusoni@gmail.com?subject=Aicruiter Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="bg-white rounded-2xl border shadow-md hover:shadow-xl transition-shadow p-6 mb-4 flex flex-col gap-2 hover:-translate-y-1 duration-150">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-900">{interview?.jobPosition}</h2>
        <span className="text-xs text-gray-400">{moment(interview?.created_at).format("DD MMM YYYY")}</span>
      </div>
      <div className="flex items-center justify-between mt-2 text-gray-500">
        <span>{interview.duration}</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          {Array.isArray(interview['interview-feedback']) ? interview['interview-feedback'].length : 0} Candidate
        </span>
      </div>
      {!viewDetail ? (
        <div className="flex gap-3 w-full mt-5">
          <Button variant="outline" className="flex-1" onClick={copyLink}>
            <Copy /> Copy Link
          </Button>
          <Button className="flex-1 bg-gradient-to-r bg-blue-400 text-white" onClick={onSend}>
            <Send /> Send
          </Button>
        </div>
      ) : (
        <Link href={`/scheduled-interview/${interview?.interview_id}/details`}>
          <Button className="mt-5 w-full">
            View Detail <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;