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
    // Standard fetch options with credentials included
    const options = {
      ...fetchOptions,
      method,
      credentials: "include" as RequestCredentials,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, options);

    // Handle 401/403 for auth validation quietly
    if (
      (response.status === 401 || response.status === 403) &&
      url.includes("/auth/validate")
    ) {
      return null as unknown as T;
    }

    // For questionnaire endpoints, handle 404 errors silently
    if (
      response.status === 404 &&
      (url.includes("/questionnaire/response") ||
        url.includes("/questionnaire/progress"))
    ) {
      return null as unknown as T;
    }

    // Parse response based on content type
    const contentType = response.headers.get("content-type");

    // JSON response
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        // Use server error message if available
        if (data && typeof data === "object" && "message" in data) {
          throw new Error(data.message);
        }
        // Default error with status code
        throw new Error(`Request failed with status ${response.status}`);
      }

      return data;
    }
    // No content response
    else if (response.status === 204) {
      return null as unknown as T;
    }
    // Other response types
    else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(
          text || `Request failed with status ${response.status}`
        );
      }

      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    }
  } catch (error) {
    // Silent handling for expected auth errors
    if (
      error instanceof Error &&
      (error.message.includes("401") || error.message.includes("403")) &&
      url.includes("/auth/validate")
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
    } else if (error.message.startsWith("Error: 403")) {
      return `${contextPrefix}You don't have permission to access this resource`;
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
