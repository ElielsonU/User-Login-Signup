import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if(req.nextUrl.pathname == "/" && req.cookies.get("loggedin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  if(req.nextUrl.pathname == "/dashboard" && !req.cookies.get("loggedin")) {
    return NextResponse.redirect(new URL("/", req.url))
  }
}
