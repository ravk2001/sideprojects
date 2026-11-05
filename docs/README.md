# Meeting Scribe Web

This folder is the ready-to-publish browser application. No npm install, API key, build command, or backend is required on GitHub Pages.

## Upload and publish

1. Upload this entire **docs** folder to the root of your repository. Keep the folder structure: your repository should contain `docs/index.html`, `docs/assets/app.js`, and the remaining files under `docs/assets/`.
2. In GitHub, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose **main**, and choose **/docs**. Save.
4. Open the HTTPS site URL GitHub shows after deployment completes. Do not open `index.html` directly from your computer.

If you prefer publishing from the repository root, upload the contents of this folder to the root and select **/(root)** instead. Keep all assets together.

## Use

Use desktop Chrome or Edge. Click **Prepare speech model** once; the app downloads about 40 MB of English Whisper Tiny weights from Hugging Face and caches them in the browser. Audio is processed on the user's device and is never uploaded. The included ONNX WebAssembly runtime runs with one thread so this works on standard GitHub Pages without special isolation headers. Processing can be slower than the desktop app and may fall behind on slower computers.

For YouTube, enable shared computer audio, click Start recording, select the YouTube tab in the browser's sharing dialog, and enable **Share tab audio**. Your microphone is optional. If the browser does not provide an audio track, the app asks you to share again with audio enabled. Whole-screen/window audio availability depends on your browser and operating system.

Captions update in five-second batches plus inference time. The browser provides the source picker and screen-sharing indicator; a website cannot draw the desktop app's custom border around other windows. The in-page preview is muted and is not saved.

Use Pause/Resume/Stop. After stopping, pending captions finish processing. Edit the transcript and export Word, plain text, or WAV audio. Choose folder works when File System Access is supported and granted; downloads work as a fallback. The app may ask you to choose the folder again in a later session.

Meetings and recorded audio are kept in IndexedDB in this browser, on this site origin. Clearing browser site data removes the library. Export important recordings and transcripts. This app has no user accounts or shared meeting storage. A folder selected inside a cloud-sync location remains subject to that service's sync settings.

## Dependencies

Transformers.js 3.8.1, ONNX Runtime Web, and docx 9.5.1 are bundled. Whisper Tiny English weights are downloaded on demand from https://huggingface.co/Xenova/whisper-tiny.en. See THIRD-PARTY-NOTICES.txt and the model card for licenses.
