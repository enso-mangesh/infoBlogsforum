type CategoryBadgeProps = {
  category: string;
};

export default function CategoryBadge({
  category,
}: CategoryBadgeProps) {
  return (
     <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-gray-600">
      {category}
    </span>
  );
}