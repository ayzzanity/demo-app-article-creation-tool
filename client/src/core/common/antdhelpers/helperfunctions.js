export const required = (message) => {
  return { required: true, message };
};

export const numeric = (message) => {
  return { type: "number", message };
};

export const email = (message) => {
  return { type: "email", message };
};

export const length = (min, max, message) => {
  return { type: "email", message };
};
export const min = (min, message) => {
  return { min, message };
};
export const max = (max, message) => {
  return { max, message };
};
export const similarTo = (inputName, getFieldValue, t) => ({
  validator(_, value) {
    if (!value || getFieldValue(inputName) === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(t("The two passwords that you entered do not match!")));
  },
});
