import express from "express";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    if (!req.session) throw Error("Please sign in to view this page");
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get one job by id
router.get("/:id", async (req, res) => {
  const jobId = req.params.id; // Use req.params.id to get the job ID from the URL parameter

  try {
    const job = await Job.findById(jobId); // Use findById to search by a specific ID
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.status(200).send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a Job
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const new_job = await Job.create(data);

    const user_id = req.session.user.user_id;
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $push: { jobList: new_job._id } },
      { new: true }
    );

    if (!user) {
      throw Error("Can not find user");
    }

    res.status(201).send(new_job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a job by id
router.put("/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a job by id
router.delete("/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const deleted_job = await Job.findByIdAndDelete(jobId);

    if (!deleted_job) {
      return res.status(404).send({ error: "Job not found" });
    }

    const user_id = req.session.user.user_id;
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { jobList: deleted_job._id } },
      { new: true }
    );

    if (!user) {
      throw Error("User not found");
    }

    res.status(200).send({ sucess: "Job has been deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
