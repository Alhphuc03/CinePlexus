import axios from "axios";

const API_KEY = "5744c461b4e9a5730311b1bacdc9a337";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = {
  // Lấy các phim theo thể loại (ví dụ: popular, top_rated)
  getMoviesByCategory: async (category) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy các TV Shows theo thể loại (ví dụ: popular, top_rated)
  getTvsByCategory: async (category) => {
    const response = await axios.get(
      `${BASE_URL}/tv/${category}?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy các phim đang thịnh hành trong tuần
  getTrending: async () => {
    const response = await axios.get(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy thông tin chi tiết về một bộ phim
  getMovieDetails: async (id) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy thông tin chi tiết về một TV Show
  getTvDetail: async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    return response.data;
  },

  // Lấy danh sách thể loại phim
  getGenerMovies: async () => {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy danh sách thể loại TV Shows
  getGenerTvs: async () => {
    const response = await axios.get(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy các phim theo thể loại
  getMoviesByGenre: async (genreId) => {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy các TV Shows theo thể loại
  getTvsByGenre: async (genreId) => {
    const response = await axios.get(
      `${BASE_URL}/discover/tv?with_genres=${genreId}&api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy chi tiết review của phim hoặc TV Show
  getReviewDetails: async (cate, id) => {
    const response = await axios.get(
      `${BASE_URL}/${cate}/${id}/reviews?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy thông tin chi tiết của tài khoản
  getAccountDetails: async (sessionId) => {
    const response = await axios.get(
      `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
    return response.data;
  },

  // Lấy danh sách các phim hoặc TV Show tương tự
  getSimilar: async (cate, Id) => {
    const response = await axios.get(
      `${BASE_URL}/${cate}/${Id}/similar?api_key=${API_KEY}`
    );
    return response.data;
  },

  // Lấy thông tin diễn viên và đội ngũ sản xuất của phim hoặc TV Show
  getCredits: async (cate, id) => {
    const response = await axios.get(
      `${BASE_URL}/${cate}/${id}/credits?api_key=${API_KEY}`
    );
    return response.data;
  },

  //sort by
  sort: async (cate, sortby) => {
    const response = await axios.get(
      `${BASE_URL}/discover/${cate}/${sortby}?api_key=${API_KEY}`
    );
    return response.data;
  },

  getTvsByCategoryAndSort: async (category, sortby) => {
    const response = await axios.get(
      `${BASE_URL}/discover/tv?sort_by=${sortby}&with_genres=${category}&api_key=${API_KEY}`
    );
    return response.data;
  },

  // Tìm kiếm phim theo từ khóa
  searchMovies: async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: "en-US",
        page: 1,
        include_adult: false,
      },
    });
    return response.data;
  },

  getWatchListMovie: async (accountID, media_type) => {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.get(
      `${BASE_URL}/account/${accountID}/watchlist/${media_type}?api_key=${API_KEY}&session_id=${sessionId}`
    );
    return response.data;
  },

  getRatedMovie: async (accountID, media_type) => {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.get(
      `${BASE_URL}/account/${accountID}/rated/${media_type}?api_key=${API_KEY}&session_id=${sessionId}`
    );
    return response.data;
  },

  getFavoriteMovie: async (accountID, media_type) => {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.get(
      `${BASE_URL}/account/${accountID}/favorite/${media_type}?api_key=${API_KEY}&session_id=${sessionId}`
    );
    return response.data;
  },

  /// add favorite
  postFavoriteMovie: async (accountID, mediaType, mediaId, favorite) => {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.post(
      `${BASE_URL}/account/${accountID}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        media_type: mediaType,
        media_id: mediaId,
        favorite: favorite,
      }
    );
    return response.data;
  },

  //add watchlist
  postWatchListMovie: async (accountID, mediaType, mediaId, watchlist) => {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.post(
      `${BASE_URL}/account/${accountID}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: watchlist,
      }
    );
    return response.data;
  },

  // Thêm đánh giá cho một bộ phim
  addRating: async (mediaType,movieId, rating) => {
    const sessionId = localStorage.getItem("sessionId");
    try {
      const response = await axios.post(
        `${BASE_URL}/${mediaType}/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          value: rating,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding rating:", error);
      throw error;
    }
  },
};

export default tmdbApi;
