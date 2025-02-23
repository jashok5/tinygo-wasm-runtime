# TinyGo WebAssembly Runtime

这是一个用于JavaScript和TypeScript的TinyGo WebAssembly运行时库。它提供了必要的运行时支持，使TinyGo编译的WebAssembly模块能够在JavaScript环境中运行。

## 特性

- 完整的TinyGo WebAssembly运行时支持
- TypeScript类型定义
- 简单易用的API
- 支持Node.js和浏览器环境

## 安装

```bash
npm install tinygo-wasm-runtime
```

## 使用方法

```typescript
import { Go } from 'tinygo-wasm-runtime';

// 创建Go运行时实例
const go = new Go();

// 加载并运行WebAssembly模块
WebAssembly.instantiateStreaming(fetch('your-wasm-file.wasm'), go.importObject)
  .then((result) => {
    go.run(result.instance);
  });
```

## API文档

### Go类

主要的运行时类，用于加载和运行TinyGo编译的WebAssembly模块。

#### 方法

- `constructor()`: 创建一个新的Go运行时实例
- `run(instance: WebAssembly.Instance): Promise<number>`: 运行WebAssembly实例

#### 属性

- `importObject`: 包含所有必要的导入函数的对象，用于WebAssembly实例化

## 许可证

MIT