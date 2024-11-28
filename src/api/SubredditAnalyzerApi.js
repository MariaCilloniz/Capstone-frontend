import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getSubredditAnalysis = async (subreddit) => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/reddit/${subreddit}`);
        return data;
    } catch (error) {
        console.error("Could not fetch subreddit analysis:", error);
        throw new Error("Error fetching subreddit analysis.");
    }
};

export { getSubredditAnalysis };