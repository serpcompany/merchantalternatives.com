import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import * as adminProcedures from "../admin/procedures";
import * as authProcedures from "../auth/procedures";
import * as billingProcedures from "../billing/procedures";
import * as newsletterProcedures from "../newsletter/procedures";
import * as teamProcedures from "../team/procedures";
import * as uploadsProcedures from "../uploads/procedures";
import * as glossaryProcedures from "../glossary/procedures";
import * as blogProcedures from "../blog/procedures";
import * as companyProcedures from "../company/procedures";
import * as industryProcedures from "../industry/procedures";
import { router } from "./trpc";

export const apiRouter = router({
  auth: router(authProcedures),
  billing: router(billingProcedures),
  team: router(teamProcedures),
  newsletter: router(newsletterProcedures),
  uploads: router(uploadsProcedures),
  admin: router(adminProcedures),
  glossary: router(glossaryProcedures),
  blog: router(blogProcedures),
  company: router(companyProcedures),
  industry: router(industryProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;
