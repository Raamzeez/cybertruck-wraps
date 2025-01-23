const directDownload = (url: string, fileName: string) => {
  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "image/png" });
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((err) => {
      console.error("Error downloading file:", err);
    });
};

export default directDownload;
