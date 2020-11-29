import axios from "axios";
// import filterParams from "./filterParams";

export default {
  // Gets articles from the NYT API
  // getArticles: function(params) {
  //   return axios.get("/api/nyt", { params: filterParams(params) });
  // },
  getArticles: function(params) {
    return axios.get("/api/nyt");
  },
  getSelectedArticle: function(id){
    return axios.get("/api/articles/" + id)
  },
  getScrapedArticle: function(id) {
    return axios.get(`/api/articles/${id}/scraped`)
  },
  
  // Gets all saved articles
  getAllArticles: function() {
    return axios.get("/api/articles");
  },
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the saved article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    console.log("=====================")
    console.log(articleData)
    console.log("=====================")
    return axios.post("/api/articles", articleData);
  }
};
