declare module 'uniqid' {
    /**
     * Generate a unique ID with optional prefix and/or suffix.
     * 
     * @param prefix A string to prefix the unique ID with.
     * @param suffix A string to suffix the unique ID with.
     * @returns A unique ID string.
     */
    function uniqid(prefix?: string, suffix?: string): string;
  
    export default uniqid;
  }
  