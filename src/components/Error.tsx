import { AxiosError } from "axios";
import { ValidationErrors } from "../types/api-errors";
import { parseValidationErrors } from "../utils/parseValidationErrors";
import { useEffect, useRef } from "react";

const Error = ({
  error,
  customMsg,
}: {
  error: AxiosError | null;
  customMsg?: string;
}) => {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Solusi alternatif focus ke element error
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Memberi waktu untuk render
    }
  }, [error]);

  if (!error) return null;

  if (error.response?.status === 422) {
    const data = error.response?.data as { errors: ValidationErrors[] };
    const parsedErrors = parseValidationErrors(data.errors);

    return (
      <div>
        {parsedErrors.map((err, index) => (
          <p key={index} className="text-red-500 text-sm text-center">
            {err.message}
          </p>
        ))}
      </div>
    );
  }

  if (customMsg) {
    return (
      <p className="text-red-500 text-sm text-center">
        {customMsg} - CODE:{error.response?.status || "Unknown"}
      </p>
    );
  }

  if (error.status === 400) {
    return (
      <p className="text-red-500 text-sm text-center">
        Email Atau Password Salah - CODE:{error.response?.status || "Unknown"}
      </p>
    );
  }

  return (
    <p className="text-red-500 text-sm text-center">
      Terjadi Kesalahan - CODE:{error.response?.status || "Unknown"}
    </p>
  );
};

export default Error;
