// adminService
export const fetchAdminManagement = async () => {
  const response = await fetch(
    "http://psychonnect-api.runasp.net/api/Auth/users?roles=Admin"
  ); // Adjust URL and query as needed
  if (!response.ok) throw new Error("Failed to fetch admin data");
  return response.json();
};
