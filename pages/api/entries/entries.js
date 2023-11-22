import { addEntry, getAllEntries } from "../../../utils/lib/localDB";

export default function handler(req, res) {
  if (req.method === "POST") {
    const entry = req.body;
    console.log("Received entry:", entry);

    try {
      addEntry(entry);
      res
        .status(200)
        .json({ success: true, message: "Entry stored successfully." });
    } catch (error) {
      console.error("Error storing entry:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  //   Get Method
  else if (req.method === "GET") {
    const entries = getAllEntries();
    res.status(200).json(entries);
  }
  // 405 Method Not Allowed
  else {
    return res.status(405).json({ error: "Method Not Allowed." });
    //method not supported.
  }
}
