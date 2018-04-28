import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let app = [
  {
    "treeId": "300000",
    "text": "工作台",
    "parentId": null,
    "systemType": " APP"
  },
  {
    "treeId": "301100",
    "text": "业主查询",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301100",
    "text": "业主查询AAAA",
    "parentId": "301199",
    "systemType": " APP"
  },
  {
    "treeId": "301200",
    "text": "信息上报",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301300",
    "text": "上报记录",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301400",
    "text": "车辆盘点",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301500",
    "text": "车辆收费",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301600",
    "text": "授权审批",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301700",
    "text": "经营分析",
    "parentId": "300000",
    "systemType": " APP"
  },
  {
    "treeId": "301710",
    "text": "车场收费资金流统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301720",
    "text": "业主报修统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301730",
    "text": "业主投诉统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301740",
    "text": "卡务资金流统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301750",
    "text": "社区人流量统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301760",
    "text": "车场异常事件统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301770",
    "text": "卡片活跃度统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "301780",
    "text": "车场消费打折统计",
    "parentId": "301700",
    "systemType": " APP"
  },
  {
    "treeId": "310000",
    "text": "任务",
    "parentId": null,
    "systemType": " APP"
  },
  {
    "treeId": "311100",
    "text": "我的派工",
    "parentId": "310000",
    "systemType": " APP"
  }
]

let icop = [
  {
    "treeId": "100000",
    "text": "系统管理",
    "parentId": null,
    "systemType": "ICOP"
  },
  {
    "treeId": "101000",
    "text": "用户管理",
    "parentId": "100000",
    "systemType": "ICOP"
  },
  {
    "treeId": "101100",
    "text": "新增用户",
    "parentId": "101000",
    "systemType": "ICOP"
  }
]

console.log('a')

export default {
  
  queryTotalRolePopedomTree: config => {
    
    return {
      app:app, icop:icop,
    }
  }
}
