export interface Coupon {
    id: number;
    code: string;
    discountAmount: number;
    discountType: 'PERCENTAGE' | 'AMOUNT'; 
    validFrom: string;
    validTill: string;
    isActive: boolean;
  }
  