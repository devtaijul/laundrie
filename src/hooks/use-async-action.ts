"use client";

import { useCallback, useState, useTransition } from "react";

import { useMounted } from "./use-mounted";
import { ActionError, type ActionErrorOrSuccess } from "@/lib/server/utils";
import { toast } from "sonner";

interface AsyncActionOptions<TData> {
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (message: string, error?: Error) => void | Promise<void>;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A hook for handling async operations with loading states and toast notifications.
 *
 * @example
 * ```tsx
 * const { runAction, isProcessing } = useAsyncAction<User, [FormData]>(
 *   createUser,
 *   { successMessage: 'User created', onSuccess: () => closeModal(); }
 * );
 * await runAction(formData);
 * ```
 */
export function useAsyncAction<
  TData extends ActionErrorOrSuccess<unknown>,
  TArgs extends unknown[] = []
>(
  action: (...args: TArgs) => Promise<TData>,
  options?: AsyncActionOptions<TData>
) {
  const isMounted = useMounted();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const runAction = useCallback(
    async (...args: TArgs): Promise<void | undefined> => {
      if (!isMounted()) return;

      startTransition(() => setIsLoading(true));

      startTransition(async () => {
        try {
          if (isMounted()) {
            const response = await action(...args);

            if (response.success) {
              if (options?.successMessage ?? response.message) {
                toast.success(options?.successMessage ?? response.message);
              }
              await options?.onSuccess?.(response);
            }
            if (!response.success) {
              if (options?.errorMessage ?? response.message) {
                toast.error(options?.errorMessage ?? response.message);
              }
              await options?.onError?.(
                response.message,
                new ActionError(response.message)
              );
            }
          }
        } catch (error) {
          if (isMounted()) {
            const normalizedError =
              error instanceof Error ? error : new Error(String(error));

            startTransition(() => {
              if (options?.errorMessage) {
                toast.error(options.errorMessage);
              }
            });

            if (options?.onError) {
              startTransition(async () => {
                try {
                  await options.onError?.(
                    normalizedError.message,
                    normalizedError
                  );
                } catch (callbackError) {
                  toast.error(
                    (callbackError as Error)?.message || "Something went wrong"
                  );
                }
              });
            }
          }
        } finally {
          if (isMounted()) {
            startTransition(() => setIsLoading(false));
          }
        }
      });
    },
    [action, isMounted, options]
  );

  const isProcessing = isPending || isLoading;

  return {
    runAction,
    isProcessing,
  } as const;
}
