import Vue from 'vue'
import Vuex from 'vuex'

import { costGetFinanceItem } from '@/api/api'
import { deleteNullAttr } from '@/common/util.js'

Vue.use(Vuex)

// 应用初始状态
const state = {
  currentEditProductState: 0,
  currentEditProduct: {},
  currentAddProductState: 0,
  currentAddProduct: {},

  currentEditPlanState: 0,
  currentEditPlan: {},
  currentAddPlanState: 0,
  currentAddPlan: {},

  currentEditCostState: 0,
  currentEditCost: {},
  currentAddCostState: 0,
  currentAddCost: {},

  finaceItemCodeArr: [],

  productInIdList: []
}

// 定义所需的 mutations
const mutations = {
  saveProductIdList(state, arr) {
    state.productInIdList = arr
  },
  deleteProductIdList(state) {
    state.productInIdList = []
  },
  changeCurrentEditPlan(state, plan) {
    state.currentEditPlanState = 1;
    state.currentAddPlanState = 0;
    state.currentEditPlan = plan;
  },
  cancelCurrentEditPlan(state) {
    state.currentEditPlanState = 0;
    state.currentEditPlan = {};
  },
  changeCurrentAddPlan(state, plan) {
    state.currentEditPlanState = 0;
    state.currentAddPlanState = 1;
    // state.currentAddPlan = plan;
  },
  cancelCurrentAddPlan(state) {
    state.currentAddPlanState = 0;
  },

  changeCurrentEditProduct(state, product) {
    state.currentEditProductState = 1;
    state.currentAddProductState = 0;
    state.currentEditProduct = product;
  },
  cancelCurrentEditProduct(state) {
    state.currentEditProductState = 0;
    state.currentEditProduct = {};
  },
  changeCurrentAddProduct(state) {
    state.currentEditProductState = 0;
    state.currentAddProductState = 1
  },
  cancelCurrentAddProduct(state) {
    state.currentAddProductState = 0;
  },

  changeCurrentEditCost(state, cost) {
    state.currentEditCostState = 1;
    state.currentAddCostState = 0;
    state.currentEditCost = cost;
  },
  cancelCurrentEditCost(state) {
    state.currentEditCostState = 0;
    state.currentEditCost = {};
  },
  changeCurrentAddCost(state) {
    state.currentEditCostState = 0;
    state.currentAddCostState = 1
  },
  cancelCurrentAddCost(state) {
    state.currentAddCostState = 0;
  }
}

// 创建 store 实例
export default new Vuex.Store({
  state,
  mutations
})
