import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// 인기 포스트를 가져오는 비동기 액션
export const fetchHitPost = createAsyncThunk(
  'category/fetchHitPosts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/boards');
    return response.data.Maxview[0];
  }
);

// 전체 포스트를 가져오는 비동기 액션
export const fetchAllPosts = createAsyncThunk(
  'category/fetchAllPosts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/boards');
    return response.data.result;
  }
);

// 비동기 액션 (Thunk): 카테고리 데이터 가져오기
export const fetchCategoryPost = createAsyncThunk(
  'category/fetchCategoryPost',
  async (tagId) => {
    const response = await axios.get(`http://localhost:5000/api/boards${tagId}`);
    return response.data;
  }
);

// 슬라이스 정의
const CategorySlice = createSlice({
  name: 'category',
  initialState: {
    selectedTag: '# 전체', // 전체 태그를 기본값으로 설정
    categoryData: [], // 빈 배열로 초기화
    allPosts: [], // 빈 배열로 초기화
    Maxview: [],
    loading: false,
    error: null,
  },

  reducers: {
    resetSelectedTag: (state) => {
      state.selectedTag = '# 전체'; // selectedTag를 초기화
    },

    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // 전체
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //전체-성공시 처리
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // 카테고리 
      .addCase(fetchCategoryPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       //카테고리-성공시 처리
      .addCase(fetchCategoryPost.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //인기글
      .addCase(fetchHitPost.pending, (state) => {
        state.loading = true; // 로딩 상태 처리
        state.error = null; // 오류 초기화

      })
      .addCase(fetchHitPost.fulfilled, (state, action) => {
        state.loading = false; // 로딩 상태 해제
        state.Maxview = action.payload; 
      })
      .addCase(fetchHitPost.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
      });
      ;
  },
});

export const { setSelectedTag, resetSelectedTag } = CategorySlice.actions;
export default CategorySlice.reducer;
