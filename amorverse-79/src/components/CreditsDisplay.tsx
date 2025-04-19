
import React from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress"; 
import { Link } from 'react-router-dom';

interface CreditsDisplayProps {
  credits: number;
  maxCredits?: number;
}

const CreditsDisplay = ({ credits, maxCredits = 20 }: CreditsDisplayProps) => {
  // Calculate percentage for progress bar
  const percentage = Math.min(100, (credits / maxCredits) * 100);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 border-love-500/30 bg-love-50/50 dark:bg-love-950/30">
            <BadgeDollarSign size={14} className="text-love-500" />
            <span className="font-medium">{credits} Credits</span>
            <div className="w-16 ml-1">
              <Progress value={percentage} className="h-1.5 bg-love-100 dark:bg-love-900/30">
                <div className="h-full bg-love-500" style={{ width: `${percentage}%` }} />
              </Progress>
            </div>
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Your AmorAI Credits</h4>
          <p className="text-sm">You have <span className="font-semibold text-love-500">{credits} credits</span> remaining. Use them to create personalized love songs.</p>
          {credits === 0 && (
            <p className="text-xs text-love-500 font-medium">You're out of credits! Purchase more to continue creating songs.</p>
          )}
          <p className="text-xs text-muted-foreground">
            <Link to="/pricing" className="text-love-500 hover:underline">Purchase more credits</Link> from the Pricing page.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CreditsDisplay;
