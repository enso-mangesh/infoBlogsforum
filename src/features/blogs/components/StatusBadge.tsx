import { CircleCheck, Clock3, FileText } from "lucide-react";

type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    PUBLISHED: {
      icon: CircleCheck,
      className: "bg-green-100 text-green-700",
    },
    DRAFT: {
      icon: FileText,
      className: "bg-blue-100 text-blue-700",
    },
    PENDING_REVIEW: {
      icon: Clock3,
      className: "bg-yellow-100 text-yellow-700",
    },
  };

  const config =
    styles[status as keyof typeof styles] ?? {
      icon: Clock3,
      className: "bg-gray-100 text-gray-700",
    };

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${config.className}`}
    >
      <Icon className="h-4 w-4" />
      {status}
    </div>
  );
}