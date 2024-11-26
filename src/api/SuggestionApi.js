import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const submitSuggestion = async (suggestionData) => {
    try {
        const { data } = await axios.post(`${baseUrl}/api/suggestion/score`, suggestionData);
        return data;
    } catch (error) {
        console.error("Error submitting suggestion:", error);
        throw new Error("Could not submit suggestion.");
    }
};

export { submitSuggestion };