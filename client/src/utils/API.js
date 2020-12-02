import axios from "axios";

export default {
  getArticles: function(params) {
    return axios.get("/api/azc");
  },
  getSelectedArticle: function(selectedResult){
    return axios.post("/api/azc/selected", {selectedResult})
  },
  saveArticle: function(articleData) {
    axios.post("/api/article", articleData);
  },
  deleteArticle: function(articleId) {
    axios.delete(`/api/article/${articleId}`);
  },
  getSavedArticles: function(userId) {
    return axios.get(`/api/article/user/${userId}`);
  }
};
