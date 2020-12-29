import { DigitalSignature } from "./digitalSignature";
import { Hospital } from "./hospital";
import { Person } from "./person";
import { TenderDuration } from "./tenderDuration";

export class CallForTender {
    person: Person;
    hospital: Hospital;
    tenderRequirements: [];
    digitalSignature: DigitalSignature;
    tenderDuration: TenderDuration
}