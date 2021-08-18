import { lazy } from "react";

const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));
const CountdownComponent = lazy(() => import("./Countdown"));

export { ResetPasswordForm, CountdownComponent };
