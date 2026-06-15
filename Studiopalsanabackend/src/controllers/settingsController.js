const StudioSettings = require("../Models/StudioSettings");

const defaultSettings = {
  studioName: "",
  email: "",
  phone: "",
  address: "",
  heroImage: "",
  instagram: "",
  facebook: "",
  youtube: "",
};

function normalizeSettings(settings = {}) {
  return {
    studioName: settings.studioName || "",
    email: settings.email || "",
    phone: settings.phone || "",
    address: settings.address || "",
    heroImage: settings.heroImage || "",
    instagram: settings.instagram || "",
    facebook: settings.facebook || "",
    youtube: settings.youtube || "",
  };
}

exports.getSettings = async (_req, res) => {
  try {
    const settings = await StudioSettings.findOne({ key: "main" }).lean();
    return res.json(normalizeSettings(settings || defaultSettings));
  } catch (error) {
    console.error("getSettings error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    if (!req.admin) return res.status(401).json({ message: "Not Authenticated" });

    const payload = normalizeSettings(req.body);
    const settings = await StudioSettings.findOneAndUpdate(
      { key: "main" },
      { $set: { key: "main", ...payload } },
      { new: true, upsert: true }
    );

    return res.json(normalizeSettings(settings.toObject()));
  } catch (error) {
    console.error("updateSettings error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};