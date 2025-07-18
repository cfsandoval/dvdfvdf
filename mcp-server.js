const express = require('express');
const fetch = globalThis.fetch;

const app = express();

app.get('/ping', (req, res) => {
  res.send('MCP server is running');
});

app.get('/courses', async (req, res) => {
  const { MOODLE_URL, MOODLE_TOKEN } = process.env;
  if (!MOODLE_URL || !MOODLE_TOKEN) {
    return res.status(500).json({ error: 'MOODLE_URL or MOODLE_TOKEN not set' });
  }
  const url = `${MOODLE_URL}/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${MOODLE_TOKEN}&wsfunction=core_course_get_courses`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.MCP_PORT || process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
