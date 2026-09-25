export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  editorialContributors?: string;
  category: string;
  discipline: string;
  rating: number;
  reviewsCount: number;
  isCurriculumStandard?: boolean;
  coverUrl: string;
  altText: string;
  shelfLocation: string;
  shelfDetails: string;
  callNumber: string;
  barcodeId: string;
  deweyDecimal: string;
  publisher: string;
  edition: string;
  isbn: string;
  pages: number;
  format: 'Hardcover' | 'Paperback' | 'E-Book' | 'Arsip';
  isAvailable: boolean;
  availableCopies: number;
  totalCopies: number;
  year: number;
  synopsis: string;
  tags: string[];
  dueNotice?: string;
  isPopular?: boolean;
  isStaffPick?: boolean;
  isReference?: boolean;
  isDigitalInstant?: boolean;
  relatedBook?: {
    title: string;
    author: string;
  };
}

export interface LoanItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverUrl: string;
  altText: string;
  format: string;
  shelf?: string;
  dueDate: string;
  dueDaysLeft: number;
  currentPages?: number;
  totalPages?: number;
  isDigital: boolean;
  canRenew: boolean;
}

export interface CartItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverUrl: string;
  altText: string;
  format: 'Hardcover' | 'Paperback' | 'E-Book' | 'Arsip';
  publisher: string;
  callNumber: string;
  shelf: string;
  barcodeId: string;
  durationDays: number;
  pickupLocation: string;
  dueDate: string;
  isDigital: boolean;
  isHighDemand?: boolean;
}

export interface MemberProfile {
  name: string;
  memberId: string;
  status: string;
  avatarUrl: string;
  role: string;
  quotaUsed: number;
  quotaTotal: number;
  finesBalance: number;
  monthlyGoalCompleted: number;
  monthlyGoalTarget: number;
  email: string;
  preferredBranch: string;
}

export type ActiveTab = 'dashboard' | 'browse' | 'detail' | 'cart' | 'history' | 'profile' | 'figma-tokens' | 'login';
