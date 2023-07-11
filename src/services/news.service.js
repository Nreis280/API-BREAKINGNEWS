import News from "../models/news";

const createService = (body) => News.create(body)

const findAllService = () => News.find()

export default {
  createService, findAllService
}