interface MissingFields {
  hasMissing: boolean;
  missing_field?: string;
}

export const requiredFieldsValidation = (input: any): MissingFields => {
  const required_fields = Object.entries(input);
  const hasMissing = false;

  for (const [key, value] of required_fields) {
    if (
      (key && typeof value === undefined) ||
      typeof value === null ||
      value === ""
    ) {
      return {
        hasMissing: true,
        missing_field: key,
      };
    }
  }

  return {
    hasMissing,
  };
};
