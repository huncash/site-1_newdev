import {
  BIM_INSTRUMENT_CLAIMS,
  type InstrumentClaim,
} from "@/config/bim-instrument-claims";

function hasRequiredFields(claim: InstrumentClaim): boolean {
  return Boolean(
    claim.instrumentType.trim() &&
      claim.configuration.trim() &&
      claim.metricName.trim() &&
      Number.isFinite(claim.value) &&
      claim.unit.trim() &&
      claim.measurementConditions.trim() &&
      claim.manufacturerSourceUrl.trim() &&
      /^\d{4}-\d{2}-\d{2}$/.test(claim.verifiedOn)
  );
}

/** Teljes, jóváhagyott rekord → nyilvános szolgáltatási állítás. */
export function isPublishableServiceClaim(claim: InstrumentClaim): boolean {
  return (
    claim.kind === "service" &&
    claim.currentlyAssurable &&
    claim.ownerApproved &&
    claim.accessConfirmed &&
    hasRequiredFields(claim)
  );
}

/**
 * Oktató jellegű gyártói mutató: csak külön, egyértelműen elválasztott
 * technológiai ismertetőben, soha főoldali szolgáltatási bizonyítékként.
 */
export function isPublishableEducationalClaim(claim: InstrumentClaim): boolean {
  return (
    claim.kind === "educational" &&
    claim.ownerApproved &&
    claim.accessConfirmed &&
    hasRequiredFields(claim) &&
    !claim.currentlyAssurable
  );
}

export function listPublishableServiceClaims(): InstrumentClaim[] {
  return BIM_INSTRUMENT_CLAIMS.filter(isPublishableServiceClaim);
}

export function listPublishableEducationalClaims(): InstrumentClaim[] {
  return BIM_INSTRUMENT_CLAIMS.filter(isPublishableEducationalClaim);
}

export function listWithheldInstrumentClaims(): InstrumentClaim[] {
  return BIM_INSTRUMENT_CLAIMS.filter(
    (claim) => !isPublishableServiceClaim(claim) && !isPublishableEducationalClaim(claim)
  );
}
