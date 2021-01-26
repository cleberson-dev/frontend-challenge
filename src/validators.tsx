import validator from "is-my-json-valid";

type ValidationResult = { valid: boolean; message: string };

const validatePlace = validator({
  required: true,
  type: "object",
  properties: {
    countryCode: {
    type: "string",
    required: true,
      minLength: 3,
      maxLength: 3,
    },
    name: {
      type: "string",
      required: true,
    },
    goal: {
      type: "string",
      format: "mm/yyyy",
    },
  },
}, {
  formats: {
    "mm/yyyy": /\d{2}\/\d{4}/,
  },
});

export function placeValidator(data: object): ValidationResult {
  if (!validatePlace(data))
    return {
      valid: false,
      message: validatePlace.errors[0].message,
    };

  // As datas precisam ser válidas
  let monthMatch = data.goal?.match(/^\d{2}/);
  if (!monthMatch)
    return {
      valid: false,
      message: "Parte de mês em 'meta' inválida",
    };

  monthMatch = [...monthMatch];
  const month = Number(monthMatch[0]);
  const isValidMonth = month >= 1 && month <= 12;

  return isValidMonth
    ? { valid: true, message: "" }
    : { valid: false, message: "O mês deve estar entre 1 e 12" };
}
