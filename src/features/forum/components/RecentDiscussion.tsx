import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Discussion } from '../types/forum.types';
import DiscussionCard from './DiscussionCard';

type RecentDiscussionsProps = {
  discussions: Discussion[];
};

const RecentDiscussions = ({ discussions }: RecentDiscussionsProps) => {
  return (
    <div>
      
      <div className="flex items-center justify-between">
        <h2 className="mt-6 mb-3 text-base font-semibold text-text-foreground">
          Recent discussions
        </h2>

        <Select>
          <SelectTrigger className="h-11 w-37.5 rounded-xl">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent className="rounded-xl">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="ca">CA</SelectItem>
            <SelectItem value="cs">CS</SelectItem>
            <SelectItem value="lawyer">Lawyer</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      {discussions.length === 0 ? (
        <Card className="border-dashed border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-base font-medium text-text-foreground">
              No discussions yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to ask a professional and start a discussion.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div  className="space-y-4">
          {discussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentDiscussions;