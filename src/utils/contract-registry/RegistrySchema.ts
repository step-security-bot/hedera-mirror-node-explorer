import {SolcOutput} from "./solc/SolcOutput";

export interface RegisterResponse {
    status: RegistrationStatus,
    rejectReason?: RejectReason,    // if status == rejected
    solcOutput?: SolcOutput         // if status == rejected and rejectReason == compilationFailure
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
    fileId: string,
    compilationRequest: CompilationRequest,
    bytecode: string,
    abi: [],
    creationTime: number
}

export interface CompilationRequest {

    solcVersion: string
    source: string
    targetContract: string
    importSources: Record<string, string>

}
