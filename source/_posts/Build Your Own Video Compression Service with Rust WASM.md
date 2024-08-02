---
title: Build Your Own Video Compression Service with Rust WASM
date: 2024-08-02 03:15:24
categories: CS
tags:
  - FFMPEG
  - Rust
  - WASM
---

Yesterday I explained how to use FFMPEG to compress video efficiently. How to deploy a video compression service? Here we can try to leverage the existing technologies like Rust, Wasm.

To create a Rust application that compiles to WebAssembly (WASM) and runs the ffmpeg command to convert an MP4 file, you will need to use a few crates and tools:

- FFmpeg: To manipulate video files.
- Wasm-pack: To build the Rust code into WebAssembly.
- wasm-bindgen: To interact between Rust and JavaScript.
- WebAssembly System Interface (WASI): To enable system calls from WebAssembly.

However, directly running ffmpeg from within WASM is quite complex due to the nature of WASM and the need for system calls. Instead, it's more common to call out to an existing ffmpeg WebAssembly port or use an appropriate WebAssembly-compatible library.

For this example, we'll use the ffmpeg.wasm project, which provides FFmpeg compiled to WebAssembly. The Rust part will focus on preparing the environment and handling the necessary JavaScript interop.

First, let's create a Rust project:

1. Create a new Rust project:

```bash
cargo new wasm_ffmpeg
cd wasm_ffmpeg
```

2. Add the necessary dependencies to your Cargo.toml:

```toml
[dependencies]
wasm-bindgen = "0.2"
```

3. Install wasm-pack if you haven't already:

```bash
cargo install wasm-pack
```

4. Update src/lib.rs to define a function that will be called from JavaScript:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_video(input_file: &str, output_file: &str) -> String {
    format!(
        "ffmpeg -i {} -c:v libx264 -tag:v avc1 -movflags faststart -crf 30 -preset superfast {}",
        input_file, output_file
    )
}
```

5. Build the project using wasm-pack:

```bash
wasm-pack build --target web
```

6. Set up html to consume the js above

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WASM FFmpeg Example</title>
  </head>
  <body>
    <h1>WASM FFmpeg Example</h1>
    <input type="file" id="inputFile" accept="video/mp4" />
    <button id="convertButton">Convert</button>
    <script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js"></script>
    <script type="module">
      import init, { process_video } from "./pkg/wasm_ffmpeg.js";

      const { createFFmpeg, fetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({ log: true });

      async function main() {
        await init();

        document
          .getElementById("convertButton")
          .addEventListener("click", async () => {
            const inputFileElement = document.getElementById("inputFile");
            const inputFile = inputFileElement.files[0];
            if (inputFile) {
              const inputFilePath = URL.createObjectURL(inputFile);

              await ffmpeg.load();
              ffmpeg.FS(
                "writeFile",
                "input.mp4",
                await fetchFile(inputFilePath)
              );

              const ffmpegCommand = process_video("input.mp4", "output.mp4");
              console.log(`Running command: ${ffmpegCommand}`);

              await ffmpeg.run(
                "-i",
                "input.mp4",
                "-c:v",
                "libx264",
                "-tag:v",
                "avc1",
                "-movflags",
                "faststart",
                "-crf",
                "30",
                "-preset",
                "superfast",
                "output.mp4"
              );

              const data = ffmpeg.FS("readFile", "output.mp4");
              const video = document.createElement("video");
              video.src = URL.createObjectURL(
                new Blob([data.buffer], { type: "video/mp4" })
              );
              video.controls = true;
              document.body.appendChild(video);
            } else {
              alert("Please select an input file.");
            }
          });
      }

      main();
    </script>
  </body>
</html>
```

7. We also need to set up a server to serve this html file. Let's try `express`.

```nodejs
const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static(path.join(__dirname, './dist')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

```

We just need to copy the js and html files under dist folder.

Here is the code base https://github.com/blessdyb/video-compression-wasm-app
