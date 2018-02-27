import Bus from '@/eventBus'
import { collectCaseGet } from '@/api/api'
//混合部分
const collectionOptionMixin = {
  data() {
    return {
      collectionCaseInfo: ''
    }
  },
  methods: {
    //获取单个案件详情接口
    updateCaseInfo() {
      collectCaseGet(
        {
          id: JSON.parse(localStorage.getItem('currentCollectionCase')).id
        }
      ).then((res) => {
        localStorage.removeItem('currentCollectionCase');
        localStorage.setItem('currentCollectionCase', JSON.stringify(res.data))
        this.collectionCaseInfo = JSON.parse(localStorage.getItem('currentCollectionCase'));
      })
    }
  },
  created() {
    this.updateCaseInfo()
    Bus.$on('changeCurrentCollectionCase', ()=> {
      this.updateCaseInfo()
    });
  }
}

export {
  collectionOptionMixin
}
