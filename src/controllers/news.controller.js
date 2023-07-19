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
      user: req.userId,
    });

    res.send({ menssage: "news created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await newsService.findAllService(offset, limit);
    const total = await newsService.countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ menssage: "there are no registered news" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        userName: Item.user.username,
        userAvatar: Item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await newsService.topNewsService();

    if (!news) {
      return res.status(400).send({ menssage: "There is no registered post" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findeById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await newsService.findByIdService(id);

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await newsService.searchByTitleService(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ menssage: "There are no news whit this title" });
    }

    return res.send({
      results: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        userName: Item.user.username,
        userAvatar: Item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await newsService.byUserService(id);

    return res.send({
      results: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        comments: Item.comments,
        name: Item.user.name,
        userName: Item.user.username,
        userAvatar: Item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, topNews, findeById, searchByTitle, byUser};
