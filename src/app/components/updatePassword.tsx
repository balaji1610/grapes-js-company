"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack } from "@mui/material";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import userservice from "@/app/userservice/userservice";
import { updatePasswordType } from "@/app/interface/interface";
import { useApplicationContext } from "@/app/context/applicationContext";

export default function UpdatePassword() {
  const router = useRouter();
  const { resetUserID, resetUsername, loadingButton } = useApplicationContext();
  const { updateNewPassword } = userservice();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isValidID, setIsValidID] = useState<null | boolean>(null);
  const [updatePassword, setUpdatePassword] = useState<updatePasswordType>({
    password: null,
    confirmpassword: null,
  });

  const handleClickShowPassword = (field: string) => {
    if (field == "Password") {
      setShowPassword((showPassword) => !showPassword);
    } else {
      setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
    }
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUpdatePassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (!resetUserID._id) {
      setIsValidID(false);
      toast.error("Unauthorized Route");
      setTimeout(() => {
        router.push("./");
      }, 2000);
    } else {
      setIsValidID(true);
    }
    /* eslint-disable */
  }, []);
  const formik = useFormik({
    initialValues: {
      password: null,
      confirmpassword: null,
    },

    validationSchema: Yup.object({
      password: Yup.string().matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        "Required:At least one uppercase, lowercase, number, special character and 8–15 characters"
      ),
      confirmpassword: Yup.string().test(
        "passwords-match",
        "Password must match",
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),

    onSubmit: () => {
      const userUpdatePassword = { ...resetUserID, ...updatePassword };
      updateNewPassword(userUpdatePassword);
    },
  });

  return (
    <>
      {isValidID ? (
        <Box>
          <Stack
            direction="column"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Box
              sx={{
                border: "3px solid #E4E0E1",
                padding: "2rem",
                borderRadius: "20px",
              }}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <Stack
                direction="column"
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <EnhancedEncryptionIcon color="primary" fontSize="large" />
                </Box>
                <Box>
                  {" "}
                  <Typography variant="h6">Create New Password</Typography>
                </Box>

                <Box>
                  {" "}
                  <TextField
                    value={resetUsername.username}
                    disabled
                    sx={{ width: "16rem" }}
                  />
                </Box>
                <Box>
                  <Box>
                    {" "}
                    <FormControl variant="outlined" required>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handleClickShowPassword("Password")
                              }
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={(event) => {
                          handleOnChangePassword(event);
                          formik.handleChange(event);
                        }}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ width: "14vw", height: "5vh" }}>
                    {formik.touched.password && formik.errors.password && (
                      <FormHelperText error sx={{ width: "17rem" }}>
                        {formik.errors.password}
                      </FormHelperText>
                    )}
                  </Box>
                </Box>
                <Box>
                  <FormControl variant="outlined" required>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleClickShowPassword("Confirm password")
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="confirm password"
                      name="confirmpassword"
                      value={formik.values.confirmpassword}
                      onChange={(event) => {
                        handleOnChangePassword(event);
                        formik.handleChange(event);
                      }}
                      error={
                        formik.touched.confirmpassword &&
                        Boolean(formik.errors.confirmpassword)
                      }
                    />
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword && (
                        <FormHelperText error>
                          {formik.errors.confirmpassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
                <Box>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loadingButton.isSavePasswordLoading}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <ToastContainer position="top-right" autoClose={2000} />
        </Box>
      ) : (
        <>
          {" "}
          <ToastContainer position="top-center" autoClose={2000} />
        </>
      )}
    </>
  );
}
