export type ApiPayload<T, V> = {
  endpoint: string | ((variables: V) => string);
  key: string;
  params?: unknown;
};
