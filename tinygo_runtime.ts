const enosys = (): Error => {
    const err = new Error("not implemented");
    (err as any).code = "ENOSYS";
    return err;
};

// 定义WebAssembly内存接口
interface WebAssemblyMemory extends WebAssembly.Memory {
    buffer: ArrayBuffer;
}

// 定义事件接口
interface PendingEvent {
    id: number;
    this: any;
    args: any[];
    result?: any;
}

// 定义一些必要的类型
type WasmExitError = symbol;
type BoxedValue = number | undefined | null | boolean | object | Function;

interface FileSystem {
    constants: {
        O_WRONLY: number;
        O_RDWR: number;
        O_CREAT: number;
        O_TRUNC: number;
        O_APPEND: number;
        O_EXCL: number;
    };
    writeSync(fd: number, buf: Uint8Array): number;
    write(fd: number, buf: Uint8Array, offset: number, length: number, position: number | null, callback: (err: Error | null, written?: number) => void): void;
    chmod(path: string, mode: number, callback: (err: Error | null) => void): void;
    chown(path: string, uid: number, gid: number, callback: (err: Error | null) => void): void;
    close(fd: number, callback: (err: Error | null) => void): void;
    fchmod(fd: number, mode: number, callback: (err: Error | null) => void): void;
    fchown(fd: number, uid: number, gid: number, callback: (err: Error | null) => void): void;
    fstat(fd: number, callback: (err: Error | null) => void): void;
    fsync(fd: number, callback: (err: Error | null) => void): void;
    ftruncate(fd: number, length: number, callback: (err: Error | null) => void): void;
    lchown(path: string, uid: number, gid: number, callback: (err: Error | null) => void): void;
    link(path: string, link: string, callback: (err: Error | null) => void): void;
    lstat(path: string, callback: (err: Error | null) => void): void;
    mkdir(path: string, perm: number, callback: (err: Error | null) => void): void;
    open(path: string, flags: number, mode: number, callback: (err: Error | null) => void): void;
    read(fd: number, buffer: Uint8Array, offset: number, length: number, position: number | null, callback: (err: Error | null) => void): void;
    readdir(path: string, callback: (err: Error | null) => void): void;
    readlink(path: string, callback: (err: Error | null) => void): void;
    rename(from: string, to: string, callback: (err: Error | null) => void): void;
    rmdir(path: string, callback: (err: Error | null) => void): void;
    stat(path: string, callback: (err: Error | null) => void): void;
    symlink(path: string, link: string, callback: (err: Error | null) => void): void;
    truncate(path: string, length: number, callback: (err: Error | null) => void): void;
    unlink(path: string, callback: (err: Error | null) => void): void;
    utimes(path: string, atime: number, mtime: number, callback: (err: Error | null) => void): void;
}

interface Process {
    getuid(): number;
    getgid(): number;
    geteuid(): number;
    getegid(): number;
    getgroups(): number[];
    pid: number;
    ppid: number;
    umask(): number;
    cwd(): string;
    chdir(): void;
}
interface GlobalThis {
    fs: FileSystem;
    process: Process;
    crypto: Crypto;
    performance: Performance;
    TextEncoder: TextEncoder;
    TextDecoder: TextDecoder;
}

declare const globalThis: GlobalThis;

if (!globalThis.fs) {
    let outputBuf = "";
    globalThis.fs = {
        constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
        writeSync(fd: number, buf: Uint8Array) {
            outputBuf += new TextDecoder().decode(buf);
            const nl = outputBuf.lastIndexOf("\n");
            if (nl != -1) {
                console.log(outputBuf.substr(0, nl));
                outputBuf = outputBuf.substr(nl + 1);
            }
            return buf.length;
        },
        write(fd: number, buf: Uint8Array, offset: number, length: number, position: number | null, callback: (err: Error | null, written: number, buffer: Uint8Array) => void) {
            if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys(), 0, buf);
                return;
            }
            const n = this.writeSync(fd, buf);
            callback(null, n, buf);
        },
        chmod: (path: string, mode: number, callback: (err: Error | null) => void) => { enosys() },
        chown: (path: string, uid: number, gid: number, callback: (err: Error | null) => void) => { enosys() },
        close: (fd: number, callback: (err: Error | null) => void) => { enosys() },
        fchmod: (fd: number, mode: number, callback: (err: Error | null) => void) => { enosys() },
        fchown: (fd: number, uid: number, gid: number, callback: (err: Error | null) => void) => { enosys() },
        fstat: (fd: number, callback: (err: Error | null) => void) => { enosys() },
        fsync: (fd: number, callback: (err: Error | null) => void) => { enosys() },
        ftruncate: (fd: number, length: number, callback: (err: Error | null) => void) => { enosys() },
        lchown: (path: string, uid: number, gid: number, callback: (err: Error | null) => void) => { enosys() },
        link: (path: string, link: string, callback: (err: Error | null) => void) => { enosys() },
        lstat: (path: string, callback: (err: Error | null) => void) => { enosys() },
        mkdir: (path: string, perm: number, callback: (err: Error | null) => void) => { enosys() },
        open: (path: string, flags: number, mode: number, callback: (err: Error | null) => void) => { enosys() },
        read: (fd: number, buffer: Uint8Array, offset: number, length: number, position: number | null, callback: (err: Error | null) => void) => { enosys() },
        readdir: (path: string, callback: (err: Error | null) => void) => { enosys() },
        readlink: (path: string, callback: (err: Error | null) => void) => { enosys() },
        rename: (from: string, to: string, callback: (err: Error | null) => void) => { enosys() },
        rmdir: (path: string, callback: (err: Error | null) => void) => { enosys() },
        stat: (path: string, callback: (err: Error | null) => void) => { enosys() },
        symlink: (path: string, link: string, callback: (err: Error | null) => void) => { enosys() },
        truncate: (path: string, length: number, callback: (err: Error | null) => void) => { enosys() },
        unlink: (path: string, callback: (err: Error | null) => void) => { enosys() },
        utimes: (path: string, atime: number, mtime: number, callback: (err: Error | null) => void) => { enosys() },
    };
}

if (!globalThis.process) {
    globalThis.process = {
        getuid() { return -1; },
        getgid() { return -1; },
        geteuid() { return -1; },
        getegid() { return -1; },
        getgroups() { throw new Error("not implemented"); },
        pid: -1,
        ppid: -1,
        umask() { throw new Error("not implemented"); },
        cwd() { throw new Error("not implemented"); },
        chdir() { throw new Error("not implemented"); },
    };
}

if (!globalThis.crypto) {
    throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
}

if (!globalThis.performance) {
    throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
}

if (!globalThis.TextEncoder) {
    throw new Error("globalThis.TextEncoder is not available, polyfill required");
}

if (!globalThis.TextDecoder) {
    throw new Error("globalThis.TextDecoder is not available, polyfill required");
}

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

// 创建并导出Go类
export class Go {
    private _inst: WebAssembly.Instance = undefined as any;
    private _values!: BoxedValue[];
    private _goRefCounts!: number[];
    private _ids: Map<any, bigint> = new Map();
    private _idPool!: bigint[];
    public exited: boolean;
    public exitCode: number;
    private _callbackTimeouts: Map<number, any>;
    private _nextCallbackTimeoutID: number;
    private _resolveExitPromise!: () => void;
    private _pendingEvent: PendingEvent | null;
    public importObject: WebAssembly.Imports;
    private wasmExit: WasmExitError = Symbol('wasmExit');

    constructor() {
        this._callbackTimeouts = new Map();
        this._nextCallbackTimeoutID = 1;
        this.exited = false;
        this.exitCode = 0;
        this._pendingEvent = null;
        let reinterpretBuf = new DataView(new ArrayBuffer(8));
        let logLine: number[] = [];
        const wasmExit = this.wasmExit;

        const mem = () => {
            return new DataView((this._inst.exports.memory as WebAssembly.Memory).buffer);
        };

        // 辅助函数定义
        const unboxValue = (v_ref: bigint): any => {
            reinterpretBuf.setBigInt64(0, v_ref, true);
            const f = reinterpretBuf.getFloat64(0, true);
            if (f === 0) {
                return undefined;
            }
            if (!isNaN(f)) {
                return f;
            }

            const id = Number(v_ref & 0xffffffffn);
            return this._values[id];
        };

        const loadValue = (addr: number): any => {
            const v_ref = mem().getBigUint64(addr, true);
            return unboxValue(v_ref);
        };

        const boxValue = (v: any): bigint => {
            const nanHead = 0x7FF80000n;

            if (typeof v === "number") {
                if (isNaN(v)) {
                    return nanHead << 32n;
                }
                if (v === 0) {
                    return (nanHead << 32n) | 1n;
                }
                reinterpretBuf.setFloat64(0, v, true);
                return reinterpretBuf.getBigInt64(0, true);
            }

            switch (v) {
                case undefined:
                    return 0n;
                case null:
                    return (nanHead << 32n) | 2n;
                case true:
                    return (nanHead << 32n) | 3n;
                case false:
                    return (nanHead << 32n) | 4n;
            }

            let id = this._ids.get(v);
            if (id === undefined) {
                id = this._idPool.pop();
                if (id === undefined) {
                    id = BigInt(this._values.length);
                }
                this._values[Number(id)] = v;
                this._goRefCounts[Number(id)] = 0;
                this._ids.set(v, id);
            }
            this._goRefCounts[Number(id)]++;
            let typeFlag = 1n;
            switch (typeof v) {
                case "string":
                    typeFlag = 2n;
                    break;
                case "symbol":
                    typeFlag = 3n;
                    break;
                case "function":
                    typeFlag = 4n;
                    break;
            }
            return id | ((nanHead | typeFlag) << 32n);
        };

        const loadString = (ptr: number, len: number): string => {
            return decoder.decode(new DataView((this._inst.exports.memory as WebAssembly.Memory).buffer, ptr, len));
        };

        const loadSlice = (array: number, len: number, cap: number = 0): Uint8Array => {
            return new Uint8Array((this._inst.exports.memory as WebAssembly.Memory).buffer, array, len);
        };

        const loadSliceOfValues = (array: number, len: number, cap: number): any[] => {
            const a = new Array(len);
            for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
            }
            return a;
        };

        const storeValue = (addr: number, v: any) => {
            const v_ref = boxValue(v);
            mem().setBigUint64(addr, v_ref, true);
        };

        const timeOrigin = Date.now() - performance.now();

        // 导入对象定义
        this.importObject = {
            wasi_snapshot_preview1: {
                fd_write: (fd: number, iovs_ptr: number, iovs_len: number, nwritten_ptr: number): number => {
                    let nwritten = 0;
                    if (fd == 1) {
                        for (let iovs_i = 0; iovs_i < iovs_len; iovs_i++) {
                            let iov_ptr = iovs_ptr + iovs_i * 8;
                            let ptr = mem().getUint32(iov_ptr + 0, true);
                            let len = mem().getUint32(iov_ptr + 4, true);
                            nwritten += len;
                            for (let i = 0; i < len; i++) {
                                let c = mem().getUint8(ptr + i);
                                if (c == 13) {
                                    // ignore CR
                                } else if (c == 10) {
                                    let line = decoder.decode(new Uint8Array(logLine));
                                    logLine = [];
                                    console.log(line);
                                } else {
                                    logLine.push(c);
                                }
                            }
                        }
                    } else {
                        console.error('invalid file descriptor:', fd);
                    }
                    mem().setUint32(nwritten_ptr, nwritten, true);
                    return 0;
                },
                fd_close: () => 0,
                fd_fdstat_get: () => 0,
                fd_seek: () => 0,
                proc_exit: (code: number) => {
                    this.exited = true;
                    this.exitCode = code;
                    this._resolveExitPromise();
                    throw wasmExit;
                },
                random_get: (bufPtr: number, bufLen: number) => {
                    crypto.getRandomValues(loadSlice(bufPtr, bufLen));
                    return 0;
                },
            },

            gojs: {
                // Go runtime functions
                "runtime.ticks": (): number => {
                    return timeOrigin + performance.now();
                },

                "runtime.sleepTicks": (timeout: number): void => {
                    setTimeout(() => {
                        if (this.exited) return;
                        try {
                            (this._inst.exports.go_scheduler as Function)?.();
                        } catch (e) {
                            if (e !== wasmExit) throw e;
                        }
                    }, timeout);
                },

                // Syscall/js functions
                "syscall/js.finalizeRef": (v_ref: bigint): void => {
                    // Note: TinyGo does not support finalizers so this is only called
                    // for one specific case, by js.go:jsString. and can/might leak memory.
                    const id = v_ref & 0xffffffffn;
                    const numId = Number(id);
                    if (this._goRefCounts?.[numId] !== undefined) {
                        this._goRefCounts[numId]--;
                        if (this._goRefCounts[numId] === 0) {
                            const v = this._values[numId];
                            this._values[numId] = null;
                            this._ids.delete(v);
                            this._idPool.push(id);
                        }
                    } else {
                        console.error("syscall/js.finalizeRef: unknown id", numId);
                    }
                },

                "syscall/js.stringVal": (value_ptr: number, value_len: number): bigint => {
                    const s = loadString(value_ptr, value_len);
                    return boxValue(s);
                },

                "syscall/js.valueGet": (v_ref: bigint, p_ptr: number, p_len: number): bigint => {
                    const prop = loadString(p_ptr, p_len);
                    const v = unboxValue(v_ref);
                    const result = Reflect.get(v, prop);
                    return boxValue(result);
                },

                "syscall/js.valueSet": (v_ref: bigint, p_ptr: number, p_len: number, x_ref: bigint): void => {
                    const v = unboxValue(v_ref);
                    const p = loadString(p_ptr, p_len);
                    const x = unboxValue(x_ref);
                    Reflect.set(v, p, x);
                },

                "syscall/js.valueDelete": (v_ref: bigint, p_ptr: number, p_len: number): void => {
                    const v = unboxValue(v_ref);
                    const p = loadString(p_ptr, p_len);
                    Reflect.deleteProperty(v, p);
                },

                "syscall/js.valueIndex": (v_ref: bigint, i: number): bigint => {
                    return boxValue(Reflect.get(unboxValue(v_ref), i));
                },

                "syscall/js.valueSetIndex": (v_ref: bigint, i: number, x_ref: bigint): void => {
                    Reflect.set(unboxValue(v_ref), i, unboxValue(x_ref));
                },

                "syscall/js.valueCall": (ret_addr: number, v_ref: bigint, m_ptr: number, m_len: number, args_ptr: number, args_len: number, args_cap: number): void => {
                    const v = unboxValue(v_ref);
                    const name = loadString(m_ptr, m_len);
                    const args = loadSliceOfValues(args_ptr, args_len, args_cap);
                    try {
                        const m = Reflect.get(v, name);
                        storeValue(ret_addr, Reflect.apply(m, v, args));
                        mem().setUint8(ret_addr + 8, 1);
                    } catch (err) {
                        storeValue(ret_addr, err);
                        mem().setUint8(ret_addr + 8, 0);
                    }
                },

                "syscall/js.valueInvoke": (ret_addr: number, v_ref: bigint, args_ptr: number, args_len: number, args_cap: number): void => {
                    try {
                        const v = unboxValue(v_ref);
                        const args = loadSliceOfValues(args_ptr, args_len, args_cap);
                        storeValue(ret_addr, Reflect.apply(v, undefined, args));
                        mem().setUint8(ret_addr + 8, 1);
                    } catch (err) {
                        storeValue(ret_addr, err);
                        mem().setUint8(ret_addr + 8, 0);
                    }
                },

                "syscall/js.valueNew": (ret_addr: number, v_ref: bigint, args_ptr: number, args_len: number, args_cap: number): void => {
                    const v = unboxValue(v_ref);
                    const args = loadSliceOfValues(args_ptr, args_len, args_cap);
                    try {
                        storeValue(ret_addr, Reflect.construct(v, args));
                        mem().setUint8(ret_addr + 8, 1);
                    } catch (err) {
                        storeValue(ret_addr, err);
                        mem().setUint8(ret_addr + 8, 0);
                    }
                },

                "syscall/js.valueLength": (v_ref: bigint): number => {
                    return (unboxValue(v_ref) as any).length;
                },

                "syscall/js.valuePrepareString": (ret_addr: number, v_ref: bigint): void => {
                    const s = String(unboxValue(v_ref));
                    const str = encoder.encode(s);
                    storeValue(ret_addr, str);
                    mem().setInt32(ret_addr + 8, str.length, true);
                },

                "syscall/js.valueLoadString": (v_ref: bigint, slice_ptr: number, slice_len: number, slice_cap: number): void => {
                    const str = unboxValue(v_ref);
                    loadSlice(slice_ptr, slice_len, slice_cap).set(str);
                },

                "syscall/js.valueInstanceOf": (v_ref: bigint, t_ref: bigint): boolean => {
                    return unboxValue(v_ref) instanceof unboxValue(t_ref);
                },

                "syscall/js.copyBytesToGo": (ret_addr: number, dest_addr: number, dest_len: number, dest_cap: number, src_ref: bigint): void => {
                    const dst = loadSlice(dest_addr, dest_len);
                    const src = unboxValue(src_ref);
                    if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                        mem().setUint8(ret_addr + 4, 0); // Return "not ok" status
                        return;
                    }
                    const toCopy = src.subarray(0, dst.length);
                    dst.set(toCopy);
                    mem().setUint32(ret_addr, toCopy.length, true);
                    mem().setUint8(ret_addr + 4, 1); // Return "ok" status
                },

                "syscall/js.copyBytesToJS": (ret_addr: number, dst_ref: bigint, src_addr: number, src_len: number, src_cap: number): void => {
                    const dst = unboxValue(dst_ref);
                    const src = loadSlice(src_addr, src_len);
                    if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                        mem().setUint8(ret_addr + 4, 0); // Return "not ok" status
                        return;
                    }
                    const toCopy = src.subarray(0, dst.length);
                    dst.set(toCopy);
                    mem().setUint32(ret_addr, toCopy.length, true);
                    mem().setUint8(ret_addr + 4, 1); // Return "ok" status
                },
            }
        };

        // 为了兼容性，复制gojs到env
        this.importObject.env = this.importObject.gojs;
    }

    public async run(instance: WebAssembly.Instance): Promise<number> {
        this._inst = instance;
        this._values = [
            NaN,
            0,
            null,
            true,
            false,
            globalThis,
            this,
        ];
        this._goRefCounts = [];
        this._ids = new Map();
        this._idPool = [];
        this.exited = false;
        this.exitCode = 0;

        if (this._inst.exports._start) {
            const exitPromise = new Promise<number>((resolve) => {
                this._resolveExitPromise = () => resolve(this.exitCode);
            });

            try {
                (this._inst.exports._start as Function)();
            } catch (e) {
                if (e !== this.wasmExit) throw e;
            }

            return exitPromise;
        } else {
            (this._inst.exports._initialize as Function)?.();
            return 0;
        }
    }

    private _resume(): void {
        if (this.exited) {
            throw new Error("Go program has already exited");
        }
        try {
            (this._inst.exports.resume as Function)?.();
        } catch (e) {
            if (e !== this.wasmExit) throw e;
        }
        if (this.exited) {
            this._resolveExitPromise();
        }
    }

    private _makeFuncWrapper(id: number): Function {
        return (...args: any[]) => {
            const event: PendingEvent = { id, this: this, args };
            this._pendingEvent = event;
            this._resume();
            return event.result;
        };
    }
}
