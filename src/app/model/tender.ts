import { Supplier } from './supplier';
import { Qualification } from './qualification';
import { Evidence } from './evidence';
import { DigitalSignature } from './digitalSignature';

export class Tender {
    supplier: Supplier;
    qualifications: Qualification[];
    evidences: Evidence[];
    digitalSignature: DigitalSignature;
}