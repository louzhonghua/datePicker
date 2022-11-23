const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      },
      {
        value: 'wuxi',
        label: 'wuxi',
        children: [
          {
            value: 'wuxi-1',
            label: 'xuxi-1'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      },
      {
        value: 'beijing',
        label: 'beijing',
        children: [
          {
            value: 'beijing-1',
            label: 'beijing-1'
          }
        ]
      }
    ]
  }
]

export default options
