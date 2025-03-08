// Common utilities for API services

// Common fetch options for all requests
export const fetchOptions = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

// Helper function to format a date for the API
export const formatDateForApi = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.toLocaleString("en-US", { month: "long" }), // "January", "February", etc.
    day: date.getDate(),
  };
};

// Helper function to make API requests
export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      method,
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error making ${method} request to ${url}:`, error);
    throw error;
  }
};

// Error handler for API errors
export const handleApiError = (error: any, context?: string): string => {
  const contextPrefix = context ? `${context}: ` : "";

  if (error instanceof Error) {
    if (error.message.startsWith("Error: 400")) {
      // Check for specific error messages
      if (error.message.includes("exceed")) {
        return `${contextPrefix}Cannot exceed the maximum count for this habit`;
      } else if (error.message.includes("future")) {
        return `${contextPrefix}Cannot log habits for future dates`;
      }
      return `${contextPrefix}Invalid data provided`;
    } else if (error.message.startsWith("Error: 401")) {
      return `${contextPrefix}You must be logged in`;
    } else if (error.message.startsWith("Error: 404")) {
      return `${contextPrefix}Resource not found`;
    } else if (error.message.startsWith("Error: ")) {
      return `${contextPrefix}An error occurred while processing your request`;
    }
  }

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return `${contextPrefix}No response from server. Please check your internet connection`;
  }

  return `${contextPrefix}An unexpected error occurred`;
};
