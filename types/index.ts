// WebAssembly内存接口
export interface WebAssemblyMemory extends WebAssembly.Memory {
    buffer: ArrayBuffer;
}

// 事件接口
export interface PendingEvent {
    id: number;
    this: any;
    args: any[];
    result?: any;
}

// 基础类型定义
export type WasmExitError = symbol;
export type BoxedValue = number | undefined | null | boolean | object | Function;

// 文件系统接口
export interface FileSystem {
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

// 进程接口
export interface Process {
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

// 全局对象接口
export interface GlobalThis {
    fs: FileSystem;
    process: Process;
    crypto: Crypto;
    performance: Performance;
    TextEncoder: TextEncoder;
    TextDecoder: TextDecoder;
}