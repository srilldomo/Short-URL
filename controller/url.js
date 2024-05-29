const shortid = require("shortid");
const URL = require("../model/url");

async function HandleGenerateURL(req, res) {
  const ShortID = shortid();
  const body = req.body;
  if (!body.url)
    return res.status(404).json({ error: "All feild are require true" });
  await URL.create({
    shortId: ShortID,
    redirectURL: body.url,
    VisitHistory: [],
    createdBy:req.user._id
  });
  return res.render("home",{id:ShortID})
//   return res.json({ id: ShortID });
}

async function HandleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });
  return res.json({
    totalClicks: result.VisitHistory.length,
    analytics: result.VisitHistory,
  });
}

async function HandleGetByID(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        VisitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = { HandleGenerateURL, HandleGetAnalytics, HandleGetByID };
