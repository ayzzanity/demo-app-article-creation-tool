import { lazy } from "react"

const SecurityForm = lazy(() => import("./SecurityForm"))
const ProfileForm = lazy(() => import("./ProfileForm"))

export { SecurityForm, ProfileForm }
