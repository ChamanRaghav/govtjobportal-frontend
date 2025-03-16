const createQueryString = (params) => {
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== "" && value !== null && value !== undefined) // Remove empty values
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // Encode keys & values
      .join("&");
  
    return queryString ? `?${queryString}` : "";
  };
  