const mockedErrors = {
  array() {
    return [
      {
        value: undefined,
        msg: "Email is required",
        param: "email",
        location: "body",
      },
      {
        value: undefined,
        msg: "Password is required",
        param: "password",
        location: "body",
      },
    ];
  },
};

const mockCreateUserOne = {
  name: "John Doe",
  email: "john@gmail.com",
  password: "test123",
};

const mockCreateUserTwo = {
  name: "Mary Doe",
  email: "mary@gmail.com",
  password: "test123",
};

module.exports = {
  mockedErrors,
  mockCreateUserOne,
  mockCreateUserTwo,
};
