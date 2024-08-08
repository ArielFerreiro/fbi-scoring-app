export const calculateImpacts = (total, value, index, array) => {
    if (value > 0) {
        total += 1;
    } 
    return total;
}
