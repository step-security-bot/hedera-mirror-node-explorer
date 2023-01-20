const worker = self

worker.onmessage = (e) => {
    const { compilerURL, compilerInput } = e.data

    console.log("Importing compiler " + compilerURL)
    importScripts(compilerURL)

    const soljson = worker.Module

    if ('_solidity_compile' in soljson) {
        console.log("Running compiler " + compilerURL)
        const compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number'])
        const output = JSON.parse(compile(JSON.stringify(compilerInput)))
        worker.postMessage(output)
    }
}
