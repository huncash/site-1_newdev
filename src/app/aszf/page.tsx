import { COMPANY_INFO } from "@/config/company-data";
import { AszfTemplate } from "@/templates/ASZF-template";

export default function AszfPage() {
  return (
    <AszfTemplate
      companyInfo={COMPANY_INFO}
      siteSpecificInfo={{
        siteName: "VRGO",
        siteUrl: "https://vrgo.hu",
        activityDescription:
          "3D virtuális túrák, VR megoldások és digitális iker szolgáltatások B2B partnereknek.",
      }}
    />
  );
}
