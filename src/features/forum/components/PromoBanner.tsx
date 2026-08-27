import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PromoBanner = () => {
  return (
    <Card className="mt-4 border-primary/50 bg-primary/20">
      <CardContent className="space-y-4 p-5 sm:flex-row sm:items-center sm:justify-between">

       
        <div className=" space-y-4 items-center gap-4">
         
          <AvatarGroup className="shrink-0">
            <Avatar size="lg">
              <AvatarFallback className="bg-slate-200  text-gray-500">
                <User className="size-4 " />
              </AvatarFallback>
            </Avatar>

            <Avatar size="lg">
              <AvatarFallback className="bg-slate-200 text-gray-500">
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>

            <Avatar size="lg">
              <AvatarFallback className="bg-slate-200 text-gray-500">
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>

            <AvatarGroupCount className="bg-primary-dark text-xs font-semibold text-white">
              20+
            </AvatarGroupCount>
          </AvatarGroup>

          
          <div>
            <p className="font-semibold text-text-foreground">
              Need guidance on your case?
            </p>

            <p className="text-sm text-muted-foreground">
              Discuss your case with verified professionals and get trusted
              recommendations.
            </p>
          </div>
        </div>

        
           <Button
          asChild
          variant="outline"
          size="sm"
          width="full"
          icon={<ArrowRight className="size-4" />}
          iconPosition="right"
          className="shrink-0 border-primary bg-white text-primary-dark cursor-pointer"
        >
          <Link href="/forum/ask">Ask a professional</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromoBanner;