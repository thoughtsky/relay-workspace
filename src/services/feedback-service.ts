import { seedFeedback } from "@/data/feedback";
import type { FeedbackItem } from "@/types/feedback";

/**
 * Local, in-memory service boundary for feedback.
 * The starter product supports loading and deleting only.
 * There is no persistence: a browser refresh restores the seeded data.
 */
let items: FeedbackItem[] = [...seedFeedback];

export const feedbackService = {
  listFeedback(): FeedbackItem[] {
    return [...items];
  },

  getFeedback(id: string): FeedbackItem | undefined {
    return items.find((item) => item.id === id);
  },

  deleteFeedback(id: string): FeedbackItem[] {
    items = items.filter((item) => item.id !== id);
    return [...items];
  },
};
