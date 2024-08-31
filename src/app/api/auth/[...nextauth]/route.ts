import nextAuth from "next-auth";
import { options } from "./options";

const authHandler = nextAuth(options)

export { authHandler as GET, authHandler as POST };