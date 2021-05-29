export default (req, res) => {
  res.status(200).write(`User-agent: *
Allow: /
Disallow: /admin/`);
  res.end();
};
