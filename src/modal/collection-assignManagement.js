export default ()=> {
  return {
    History: {
      currentList: [],
      nowPage: 1,
      listTotalNumber: 0
    },
    Apply: {
      caseInfo: {
        currentList: [],
        listTotalNumber: 0,
        nowPage: 1,
        currentSize: 10
      },
      collector: {
        currentList: [],
        listTotalNumber: 0,
        nowPage: 1,
        currentSize: 10
      },
      selectedCase: [],
      selectedCollector: [],
      assignType: {
        amountOrNum: '',
        aboutNow: true
      }
    },
    GetResult: {
      firstResData: {},
      visible: false,
      resultData: [],
      nowPageData: [],
      currentData: [],
      tabIndex: 0,
      transferSelected: [],
      transferTo: '',
      nowPage: 1
    }
  }
}
