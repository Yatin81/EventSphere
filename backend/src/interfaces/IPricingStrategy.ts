export interface IPricingStrategy {
  calculatePrice(basePrice: number, occupancyRate: number): number;
}
