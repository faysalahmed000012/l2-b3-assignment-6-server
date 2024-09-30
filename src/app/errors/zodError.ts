import { ZodError, ZodIssue } from "zod";
import { IGenericErrorResponse, TErrorSources } from "../interface/error";

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorMessages: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleZodError;
