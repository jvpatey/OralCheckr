// Common utilities for API services
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Local timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Common fetch options
export const fetchOptions = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

// Format date for API requests
export const formatDateForApi = (date: Date) => {
  // Convert to zoned time for consistent timezone handling
  const zonedDate = toZonedTime(date, TIMEZONE);

  return {
    year: zonedDate.getFullYear(),
    month: format(zonedDate, "MMMM"),
    day: zonedDate.getDate(),
  };
};

// Make API requests with proper error handling
export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      method,
      ...(body && { body: JSON.stringify(body) }),
    });

    // For welcome page, silently handle 401 errors from auth endpoints
    if (
      response.status === 401 &&
      (url.includes("/auth/validate") || url.includes("/auth/profile"))
    ) {
      return null as unknown as T;
    }

    const data = await response.json();

    if (!response.ok) {
      // If the server returns an error message, use it
      if (data && typeof data === "object" && "message" in data) {
        throw new Error(data.message);
      }
      // Otherwise, throw a generic error with the status code
      throw new Error(`Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // Silently handle 401 errors for auth endpoints
    if (
      error instanceof Error &&
      error.message.includes("401") &&
      (url.includes("/auth/validate") || url.includes("/auth/profile"))
    ) {
      return null as unknown as T;
    }

    console.error(`Error making ${method} request to ${url}:`, error);
    throw error;
  }
};

// Convert API errors to user-friendly messages
export const handleApiError = (error: unknown, context?: string): string => {
  const contextPrefix = context ? `${context}: ` : "";

  if (error instanceof Error) {
    if (error.message.startsWith("Error: 400")) {
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

  // Handle network errors
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "TypeError" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.includes("fetch")
  ) {
    return `${contextPrefix}No response from server. Please check your internet connection`;
  }

  return `${contextPrefix}An unexpected error occurred`;
};
