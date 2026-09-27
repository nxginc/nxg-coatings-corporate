const companyId = process.env.NXG_COMPANY_ID || "nxg-coatings"

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(companyId)) {
    throw new Error("NXG_COMPANY_ID must be a lowercase slug.")
}

export const NXG_COMPANY_ID = companyId