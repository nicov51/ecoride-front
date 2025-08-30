export interface Notification {
  id: number;
  message: string;
  userId: number;
  type: 'REVIEW_SUBMITTED' | 'REVIEW_APPROVED' | 'REVIEW_REJECTED';
  isRead: boolean;
  relatedId: number | null;
  createdAt: string;
}
