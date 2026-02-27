import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import type { TokenResponse } from "@livemeet/shared-types";
import type { Request } from "express";

import { TokenRequestDto } from "./dto/token-request.dto.js";
import { AuthService } from "./auth.service.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("token")
  @HttpCode(HttpStatus.OK)
  async createToken(@Body() body: TokenRequestDto, @Req() request: Request): Promise<TokenResponse> {
    return this.authService.createToken(body, this.resolveIpAddress(request));
  }

  private resolveIpAddress(request: Request): string | null {
    const forwardedFor = request.headers["x-forwarded-for"];

    if (typeof forwardedFor === "string") {
      return forwardedFor.split(",")[0]?.trim() ?? null;
    }

    if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
      return forwardedFor[0] ?? null;
    }

    return request.ip ?? null;
  }
}
