export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/((?!signin|signup|api/v1/users).*)"
  ]
}