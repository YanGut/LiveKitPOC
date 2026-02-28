import {
  TokenRequestSchema,
  TokenResponseSchema,
  type TokenRequest,
  type TokenResponse,
} from "@livemeet/shared-types";
import axios from "axios";
import { useCallback, useState } from "react";

import { apiClient } from "../libs/api/client";

function normalizeAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseMessage =
      typeof error.response?.data === "object" && error.response?.data !== null && "message" in error.response.data
        ? String(error.response.data.message)
        : null;

    if (responseMessage) {
      return responseMessage;
    }

    if (error.message) {
      return error.message;
    }

    return "Token request failed.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error while requesting token.";
}

export function useToken() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestToken = useCallback(async (payload: TokenRequest): Promise<TokenResponse> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const requestBody = TokenRequestSchema.parse(payload);
      const response = await apiClient.post<TokenResponse>("/auth/token", requestBody);

      return TokenResponseSchema.parse(response.data);
    } catch (error) {
      const message = normalizeAxiosError(error);
      setErrorMessage(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    errorMessage,
    requestToken,
  };
}
