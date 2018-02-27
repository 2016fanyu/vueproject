import {caseChannelType, caseStatusType, overdueCountType, overdueDaysType, loanDataType} from '@/common/formRules.js'

export default ()=> {
  let obj  = {}
  obj = {
    fromProReceive: false,
    listTotalNumber: 0,
    pageNum: 1,
    currentList: null,
    caseDetailVisible: false,
    caseListVisible: false,
    renewalListVisible: false,
    currentDetail: null,
    dataToChild: null,
    caseListLenderId: '',
    overdueCountType,
    overdueDaysType,
    caseChannelType,
    caseStatusType,
    loanDataType,
    productListType: [],
    listConditions: {
      ids: [],
      renewalType: '',
      overdueDayType: '',
      startOverdueDay: '',
      endOverdueDay: '',
      timeRange: '',
      beginDate: '',
      endDate: '',
      idCard: '',
      phoneNumber: '',
      userName: '',
      renewalCount: '',
      overdueDayCount: '',
      prodId: ''
    },
    searchConditions: {
      beginDate: '',
      endDate: ''
    }
  }
  return obj
}

