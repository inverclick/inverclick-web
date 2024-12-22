// https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ElementType<T> = T extends Array<infer U> ? U : never;

export type CommonKeys<T, U> = keyof T & keyof U;

export type MatchingProperties<T, U> = {
  [K in CommonKeys<T, U>]: T[K];
};
