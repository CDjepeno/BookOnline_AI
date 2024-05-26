import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const UseQueryWorkflowCallback = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccessCommon = useCallback(
    (message?: string, redirection?: string) => {
      const successMessage =  message;

      enqueueSnackbar(successMessage, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        style: {
          color: "white",
          minWidth: "100%",
        },
      });
      if (redirection) {
        navigate(redirection);

      }
    },
    [enqueueSnackbar, navigate]
  );

  const onErrorCommon = useCallback(
    (message?: string) => {
      const successMessage =  message;

      enqueueSnackbar(successMessage, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        style: {
          color: "white",
          minWidth: "100%",
        },
      });
    },
    [enqueueSnackbar]
  );

  return {
    onSuccessCommon,
    onErrorCommon
  };
};
