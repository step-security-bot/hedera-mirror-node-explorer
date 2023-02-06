import {SolcOutput} from "./solc/SolcOutput";

export interface RegisterResponse {
    status: RegistrationStatus,
    rejectReason?: RejectReason,    // if status == rejected
    solcOutput?: SolcOutput         // if status == rejected and rejectReason == compilationFailure||bytecodeMismatch
    entry?: RegistryEntry           // if status == accepted
}

export enum RegistrationStatus {
    accepted = "accepted",
    rejected = "rejected"
}

export enum RejectReason {
    contractNotFound = "contractNotFound",
    compilationFailure = "compilationFailure",
    bytecodeMismatch = "bytecodeMismatch",
    malformedContract = "malformedContract"
}

export enum BytecodeComparison {
    fullMatch = "fullMatch",
    partialMatch = "partialMatch",
    mismatch = "mismatch"
}

export interface RegistryEntry {
    contractId: string,
    contractName: string,
    compilationRequest: CompilationRequest,
    comparison: BytecodeComparison,
    bytecode: string,
    abi: [],
    creationTime: number
}

export interface CompilationRequest {

    solcVersion: string
    source: string
    importSources: Record<string, string>

}
