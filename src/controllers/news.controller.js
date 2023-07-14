import newsService from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for regsitration" });
    }

    const news = await newsService.createService({
      title,
      text,
      banner,
      user: req.user.id,
    });

    res.send({menssage: "news created"});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await newsService.findAllService();
  if (news.length === 0) {
    return res.status(400).send({ menssage: "there are no registered news" });
  }
  res.send(news);
};
export default { create, findAll };
