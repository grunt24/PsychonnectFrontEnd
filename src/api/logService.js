export const fetchLogs = async () => {
  const response = await fetch("http://psychonnect-api.runasp.net/api/Logs"); // Replace with your API endpoint
  if (!response.ok) throw new Error("Failed to fetch logs");
  return response.json();
};
