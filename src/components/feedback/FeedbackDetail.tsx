import { MessagesSquare, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FeedbackMetadata } from "@/components/feedback/FeedbackMetadata";
import type { FeedbackItem } from "@/types/feedback";

interface FeedbackDetailProps {
  item: FeedbackItem | null;
  onDelete: (id: string) => void;
}

export function FeedbackDetail({ item, onDelete }: FeedbackDetailProps) {
  if (!item) {
    return (
      <EmptyState
        icon={<MessagesSquare />}
        title="No feedback selected"
        description="Select an item from the list to read the full message and its details."
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-semibold tracking-tight text-foreground">
            {item.summary}
          </h2>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            {item.customerName} · {item.customerRole} · {item.company}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Delete feedback"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete feedback</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8" aria-label="More actions">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-[13px]">Copy reference</DropdownMenuItem>
              <DropdownMenuItem className="text-[13px]">Open customer profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <Tabs defaultValue="feedback">
          <TabsList className="h-8">
            <TabsTrigger value="feedback" className="text-[12.5px]">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="details" className="text-[12.5px]">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="mt-4 max-w-2xl">
            <p className="whitespace-pre-line text-[13.5px] leading-7 text-foreground/90">
              {item.message}
            </p>
          </TabsContent>

          <TabsContent value="details" className="mt-4 max-w-md">
            <FeedbackMetadata item={item} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
