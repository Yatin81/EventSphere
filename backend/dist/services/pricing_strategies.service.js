export class StandardPricing {
    calculatePrice(basePrice, _occupancyRate) {
        return basePrice;
    }
}
export class DynamicPricing {
    calculatePrice(basePrice, occupancyRate) {
        // Increase price by 50% if occupancy is > 80%
        if (occupancyRate > 0.8) {
            return basePrice * 1.5;
        }
        return basePrice;
    }
}
