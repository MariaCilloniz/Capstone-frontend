import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const analyzeText = async (text) => {
    try {
        const { data } = await axios.post(`${baseUrl}/api/analysis`, { text });
        return data; 
    } catch (error) {
        console.error("Could not analyze text:", error);
        throw new Error("Error analyzing text.");
    }
};

export { analyzeText };
