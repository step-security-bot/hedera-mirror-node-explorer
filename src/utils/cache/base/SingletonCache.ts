/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2024 Hedera Hashgraph, LLC
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

import {Ref, ref} from "vue";
import {Lookup} from "@/utils/cache/base/Lookup";

export class SingletonCache<E> {

    protected promise: Promise<E>|null = null
    private time: number = -1

    //
    // Public
    //

    public async lookup(forceLoad = false): Promise<E> {
        let result: Promise<E>

        const fresh = (Date.now() - this.time) < 500 // ms
        if (this.promise !== null && (fresh || !forceLoad)) {
            result = this.promise
        } else {
            result = this.load()
            this.promise = result
        }
        return result
    }

    public clear(): void {
        this.promise = null
        this.time = - 1
    }

    public makeLookup(): SingletonLookup<E> {
        return new SingletonLookup(this)
    }

    public makeAutoRefreshLookup(refreshPeriod: number): SingletonAutoRefreshLookup<E> {
        return new SingletonAutoRefreshLookup(this, refreshPeriod)
    }


    //
    // Protected (to be subclassed)
    //

    protected async load(): Promise<E> {
        throw new Error("Must be subclassed")
    }
}

export class SingletonLookup<E> implements Lookup<E>{

    public readonly entity: Ref<E|null> = ref(null)

    private readonly cache: SingletonCache<E>

    constructor(cache: SingletonCache<E>) {
        this.cache = cache
    }

    public mount(): void {
        this.cache.lookup()
            .then((s: E) => this.entity.value = s)
            .catch(() => this.entity.value = null)
    }

    public unmount(): void {
        this.entity.value = null
    }
}

export class SingletonAutoRefreshLookup<E> implements Lookup<E> {

    public readonly entity: Ref<E|null> = ref(null)
    public readonly refreshPeriod: number // milliseconds
    private readonly cache: SingletonCache<E>
    private mounted = false
    private timeout: number = -1

    constructor(cache: SingletonCache<E>, refreshPeriod: number) {
        this.cache = cache
        this.refreshPeriod = refreshPeriod
    }

    public mount(): void {
        this.mounted = true
        this.startRefresh()
    }

    public unmount(): void {
        this.stopRefresh()
        this.mounted = false
    }

    //
    // Private
    //

    private startRefresh() {
        this.cache.lookup(true)
            .then((s: E) => {
                this.lookupDidComplete(s)
            })
            .catch(() => {
                this.lookupDidComplete(null)
            })
    }

    private stopRefresh() {
        if (this.timeout !== -1) {
            window.clearTimeout(this.timeout)
            this.timeout = -1
        }
        this.entity.value = null
    }

    private lookupDidComplete(e: E|null) {
        if (this.mounted) {
            this.entity.value = e
            this.timeout = window.setTimeout(() => {
                this.startRefresh()
            }, this.refreshPeriod)
        } // else we silently exit because everything is already setup by unmount()
    }
}