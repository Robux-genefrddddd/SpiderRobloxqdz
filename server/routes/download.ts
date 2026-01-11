import { RequestHandler } from "express";

/**
 * Proxy endpoint for downloading files from Firebase Storage
 * This bypasses CORS issues by routing through the backend
 *
 * Usage: GET /api/download?filePath=assets/assetId/filename.ext&fileName=display-name.ext
 */
export const handleDownload: RequestHandler = async (req, res) => {
  try {
    const { filePath, fileName } = req.query as Record<string, string>;

    if (!filePath) {
      return res.status(400).json({
        error: "Missing filePath parameter",
      });
    }

    // Security: Validate the file path to prevent directory traversal
    if (filePath.includes("..") || filePath.startsWith("/")) {
      return res.status(400).json({
        error: "Invalid file path",
      });
    }

    // Encode the path for URL
    const encodedPath = encodeURIComponent(filePath);
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/keysystem-d0b86-8df89.firebasestorage.app/o/${encodedPath}?alt=media`;

    console.log(`Proxying download: ${filePath}`);

    // Fetch the file from Firebase Storage
    const response = await fetch(firebaseUrl);

    if (!response.ok) {
      console.error(
        `Firebase Storage error: ${response.status} ${response.statusText}`,
      );

      if (response.status === 404) {
        return res.status(404).json({
          error: "File not found",
          code: "OBJECT_NOT_FOUND",
        });
      } else if (response.status === 403) {
        return res.status(403).json({
          error: "Access denied",
          code: "UNAUTHORIZED",
        });
      }

      return res.status(response.status).json({
        error: "Firebase Storage error",
        code: response.status,
      });
    }

    // Get file as buffer
    const buffer = await response.arrayBuffer();

    // Set response headers for file download
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName || filePath.split("/").pop() || "file"}"`,
    );
    res.setHeader("Content-Length", buffer.byteLength);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Accept-Ranges", "bytes");

    // Send file
    res.send(Buffer.from(buffer));
  } catch (error: any) {
    console.error("Download proxy error:", error);

    res.status(500).json({
      error: "Failed to download file",
      message: error?.message || "Unknown error",
    });
  }
};
