export type APIResponse<T> = EmptyAPIResponse & {
  data: T;
};

export type EmptyAPIResponse = {
  success: boolean;
  message: string;
  code: string | null;
};
