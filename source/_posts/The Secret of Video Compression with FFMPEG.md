---
title: NodeJS Http-Proxy with WebSocket
date: 2024-08-01 23:15:24
categories: CS
tags:
  - FFMPEG
---

Recently there's a hot tweet talking about video compression (https://x.com/mortenjust/status/1817991110544744764). The author shows that how he could compress most of the MP4 videos down to 10% of the original size.

If you check the site https://tools.rotato.app/compress, actually he didn't invent anything new. It's a WASM version of ffmpeg which is using command

```
ffmpeg -i "input.mp4" -c:v libx264 -tag:v avc1 -movflags faststart -crf 30 -preset superfast "output.mp4"
```

Let's explain the command below:

The FFmpeg command you provided is used to transcode a video file (`input.mp4`) into another video file (`output.mp4`) using specific encoding settings. Here's a breakdown of what each part of the command does:

### Command Breakdown

1.  **`ffmpeg`**:

    - This is the command-line tool used for processing video and audio files.

2.  **`-i "input.mp4"`**:

    - `-i` specifies the input file. In this case, it is `"input.mp4"`. This is the video file you want to convert or process.

3.  **`-c:v libx264`**:

    - `-c:v` specifies the video codec to use for the output. `libx264` is a widely used library for encoding H.264 video, which is known for its good compression and quality.

4.  **`-tag:v avc1`**:

    - This sets the codec tag for the video stream to `avc1`, which is the identifier used in MP4 containers for H.264 video. It ensures compatibility with certain players and devices that require this tag.

5.  **`-movflags faststart`**:

    - This option moves some metadata to the beginning of the output file. This makes the video start playing faster when streamed over the internet because the metadata needed to start playback is located at the start of the file, rather than at the end.

6.  **`-crf 30`**:

    - `-crf` stands for Constant Rate Factor. This option controls the quality of the output video when using the x264 encoder. The CRF value ranges from 0 to 51, where lower values result in better quality at the cost of larger file sizes, and higher values result in worse quality and smaller file sizes. A CRF value of `30` is relatively high, indicating a moderate quality level, resulting in a smaller file size.

7.  **`-preset superfast`**:

    - `-preset` determines the speed of the encoding process and the compression efficiency. The `superfast` preset prioritizes speed over compression efficiency, resulting in faster encoding times at the expense of a larger file size. This is useful if you need a quick encoding process and are not as concerned about file size.

8.  **`"output.mp4"`**:

    - This specifies the name of the output file. In this case, the processed video will be saved as `"output.mp4"`.

### Summary

This command takes an input video file and transcodes it to H.264 format using the `libx264` encoder. It sets the video stream tag for compatibility, optimizes the file for streaming, and uses a preset that balances speed and quality. The output will be a moderately compressed video suitable for streaming or uploading where file size and encoding speed are more important than the highest possible quality.
