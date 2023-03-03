/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export abstract class Cache<K, E, C> {

    private readonly promises = new Map<K, Promise<E>>()

    //
    // Public
    //

    public async lookup(key: K, context: C): Promise<E> {
        let result: Promise<E>

        const currentPromise = this.promises.get(key)
        if (currentPromise) {
            result = currentPromise
        } else {
            const newPromise = this.load(key, context)
            this.promises.set(key, newPromise)
            result = newPromise
        }

        return result
    }

    public forget(key: K): void {
        this.promises.delete(key)
    }

    public clear(): void {
        this.promises.clear()
    }

    //
    // Protected (to be subclassed)
    //

    protected async load(key: K, context: C): Promise<E> {
        throw new Error("Must be subclassed to load " + key + " with context " + context)
    }

}