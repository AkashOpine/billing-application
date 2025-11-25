export function downloadBase64File(dataUrl : any, fileName : any) {
  // Extract MIME type and Base64 data
  const [metadata, base64Data] = dataUrl.split(",");
  const mimeType = metadata.match(/:(.*?);/)[1];
 
  // Create a Blob from the Base64 data
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
 
  // Create a download link and trigger download
  const downloadLink = document.createElement("a");
  const url = URL.createObjectURL(blob);
 
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
 
  // Cleanup
  URL.revokeObjectURL(url);
}