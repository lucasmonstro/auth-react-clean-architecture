export type PostInput<Input> = { url: string; body: Input };
export type HttpOutput<Output> = Output;
export type Http = {
  post: <Input, Output>(input: PostInput<Input>) => Promise<HttpOutput<Output>>;
};
