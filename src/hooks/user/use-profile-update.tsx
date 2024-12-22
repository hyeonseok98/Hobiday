import axios from "axios";

const updateProfile = async (data: { [key: string]: string | string[] }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in localStorage.");
    }

    const response = await axios.put("/api/profiles/update", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export default updateProfile;
