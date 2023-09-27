module.exports = {
  get: jest.fn((url: string): Promise<{ data: string }> => {
    return Promise.resolve({ data: url });
  }),
  post: jest.fn((url: string): Promise<{ data: string }> => {
    return Promise.resolve({ data: url });
  }),
  put: jest.fn((url: string): Promise<{ data: string }> => {
    return Promise.resolve({ data: url });
  }),
  create: jest.fn(function () {
    return this;
  }),
};
