import { z } from "zod"

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""))

export const contactSubmissionSchema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: optionalText(50),
    service: optionalText(100),
    projectType: optionalText(100),
    address: optionalText(240),
    message: z.string().trim().min(1).max(5000),
    type: z.enum(["contact", "estimate", "consultation", "virtual_quote"]).optional(),
    preferredDate: optionalText(10),
    preferredTime: optionalText(40),
    website: optionalText(200),
})

export const partnerApplicationSchema = z.object({
    company: z.string().trim().min(2).max(160),
    contactName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(7).max(50),
    trade: z.string().trim().min(2).max(100),
    serviceAreas: z.string().trim().min(2).max(500),
    website: optionalText(200),
    licenseNumber: optionalText(100),
    insuranceProvider: optionalText(160),
    yearsInBusiness: optionalText(20),
    message: optionalText(3000),
    websiteTrap: optionalText(200),
    directoryConsent: z.boolean().optional().default(false),
    acceptTerms: z.literal(true),
})