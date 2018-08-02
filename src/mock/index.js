//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/api/list', (req, res) => {
    return {
        code: '200',
        msg: 'ok',
        data: Mock.mock({
            'list|20': [{
                'id|+1': 1,
				'name':Mock.Random.first()
            }]
        })
    }
})
