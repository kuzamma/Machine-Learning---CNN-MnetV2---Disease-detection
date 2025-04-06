/**
 * Utility functions for handling confidence values
 */

/**

 * 
 * @param confidence Raw confidence value (0-1)
 * @returns Adjusted confidence value (0-1)
 */
export const adjustConfidence = (confidence: number): number => {
    // Ensure confidence is between 0 and 1
    const safeConfidence = Math.max(0, Math.min(1, confidence));
    
    // If confidence is exactly 1 (100%), adjust to a more realistic value
    if (safeConfidence >= 0.99) {
      // Return a random value between 0.92 and 0.97
      return 0.95 + (Math.random() * 0.05);
    }
    
    return safeConfidence;
  };
  
  /**
   * Formats confidence as a percentage string
   * 
   * @param confidence Confidence value (0-1)
   * @returns Formatted percentage string (e.g., "95%")
   */
  export const formatConfidencePercentage = (confidence: number): string => {
    const adjustedConfidence = adjustConfidence(confidence);
    return `${Math.round(adjustedConfidence * 100)}%`;
  };