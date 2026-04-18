import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

export const getAllSubreddits = async (req, res) => {
  try {
  const subreddits = await fetchAllSubreddits()
  if (subreddits.length === 0) {
    const output = {success: false, data: null, message: "No subreddits found"}
    return res.status(404).json(output)
  }
  const output = {success: true, data: subreddits, message: "Subreddits found"}
  res.json(output)
  } catch (error) {
    const output = {success: false, data: null, message: "Error fetching subreddits"}
    res.status(500).json(output)
  }
};

export const createSubreddit = async (req, res) => {
  try {
    if (!req.body.name){
      return res.status(400).json({
        success: false,
        data: null,
        message: "Subreddit name is required"
      })
    }
    if (!req.body.author){
      return res.status(400).json({
        success: false,
        data: null,
        message: "Subreddit author is required"
      })
    }
    const subreddit = await createNewSubreddit(req.body.name, req.body.description, req.body.author)
    if (!subreddit) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Subreddit already exists"
      })
    }
    res.status(201).json({
      success: true,
      data: subreddit,
      message: "Subreddit created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Error creating subreddit"
    })
  }
};



export const getSubredditWithThreads = async (req, res) => {
  try {
    const subreddit = await fetchSubredditWithThreads(req.params.id);

    if (!subreddit) {
      return res.status(404).json({
        success: false,
        message: "Subreddit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subreddit and its threads fetched successfully",
      data: subreddit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching subreddit with threads",
    });
  }
};
