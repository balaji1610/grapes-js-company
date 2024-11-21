"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Box, Stack } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

import userservice from "@/app/userservice/userservice";
import { resetUsernameType } from "@/app/interface/interface";
import { useApplicationContext } from "@/app/context/applicationContext";
export default function ResetPassword() {
  const router = useRouter();
  const { resetPassword } = userservice();

  const { resetUsername, setResetUsername, isActionLoading } =
    useApplicationContext();

  const handleOnChangeResetPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setResetUsername((prev: resetUsernameType) => {
      return { ...prev, [name]: value };
    });
  };

  const formik = useFormik({
    initialValues: {
      username: null,
    },

    validationSchema: Yup.object({
      username: Yup.string().email(),
    }),

    onSubmit: () => {
      resetPassword(resetUsername);
    },
  });
  return (
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
              <HttpsIcon color="primary" fontSize="large" />
            </Box>
            <Box>
              {" "}
              <Typography variant="h6">Reset Your Password</Typography>
            </Box>
            <Box>
              {" "}
              <TextField
                required
                label="Enter Your Email"
                name="username"
                type="email"
                value={formik.values.username}
                onChange={(event) => {
                  handleOnChangeResetPassword(event);
                  formik.handleChange(event);
                }}
                helperText={formik.touched.username && formik.errors.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
            </Box>
            <Box>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isActionLoading}
                size="large"
                sx={{ width: "14rem" }}
              >
                Reset Password
              </LoadingButton>
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                {" "}
                <ArrowBackIcon color="primary" />
                <Typography
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push("./")}
                >
                  Back to login
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer position="top-right" autoClose={2000} />
    </Box>
  );
}
