import { IPricingStrategy } from "../interfaces/IPricingStrategy";

export class StandardPricing implements IPricingStrategy {
  calculatePrice(basePrice: number, _occupancyRate: number): number {
    return basePrice;
  }
}

export class DynamicPricing implements IPricingStrategy {
  calculatePrice(basePrice: number, occupancyRate: number): number {
    // Increase price by 50% if occupancy is > 80%
    if (occupancyRate > 0.8) {
      return basePrice * 1.5;
    }
    return basePrice;
  }
}
