//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/api/list', (req, res) => {
    return {
        code: '200',
        msg: 'ok',
        data: Mock.mock({
            'list|20': [{
                "card_type": 9,
                "mblog": {
                    "created_at": "07-30",
                    "id":Mock.Random.natural(10, 1000000),
                    "idstr": "4267394501772245",
                    "mid": "4267394501772245",
                    "can_edit": false,
                    "text": "西维吉尼亚韦尔斯一名女警Kristen 在27日上午与一名高约180公分重约88公斤疑似吸毒的男性发生搏斗中被打得很惨，全身裝备几乎支离破碎，但该女警也不是省油的，不仅努力还击还放出K9（警犬），甚至还把对方其中一手上了铐，企图将他制服，然而该男性疑似毒品的效果，无论殴打、膝击、撕咬都无法完全控 ​​​...<a href=\"\/status\/4267394501772245\">全文<\/a>",
                    "textLength": 1078,
                    "source": "QBQ's Android",
                    "favorited": false,
                    "thumbnail_pic": "http://wx3.sinaimg.cn/thumbnail/af37aff2gy1ftt6cu0ci9j20sg0raq6o.jpg",
                    "bmiddle_pic": "http:\/\/wx3.sinaimg.cn\/bmiddle\/006mZCAVly1ftrke1c0ypj30qo0q848h.jpg",
                    "original_pic": "http:\/\/wx3.sinaimg.cn\/large\/006mZCAVly1ftrke1c0ypj30qo0q848h.jpg",
                    "is_paid": false,
                    "mblog_vip_type": 0,
                    "user": {
                        "id": Mock.Random.natural(10, 1000000),
                        "screen_name": Mock.Random.cname(),
                        "profile_image_url": "https://tva3.sinaimg.cn/crop.0.2.398.398.180/af37aff2gw1edubjhxzslj20b40bp0ts.jpg",
                        "profile_url": "https:\/\/m.weibo.cn\/u\/5836562753?uid=5836562753&luicode=10000011&lfid=102803_ctg1_1988_-_ctg1_1988",
                        "statuses_count": Mock.Random.natural(10, 10000),
                        "verified": true,
                        "verified_type": 0,
                        "verified_type_ext": 1,
                        "verified_reason": Mock.Random.paragraph(10, 20),
                        "close_blue_v": false,
                        "description": Mock.Random.paragraph(10, 20),
                        "gender": "m",
                        "mbtype": 12,
                        "urank": 33,
                        "mbrank": 5,
                        "follow_me": false,
                        "following": false,
                        "followers_count": 282878,
                        "follow_count": 532,
                        "cover_image_phone": "https:\/\/wx4.sinaimg.cn\/crop.0.0.640.640.640\/006mZCAVly1feoyekls6vj3140140kfn.jpg",
                        "avatar_hd": "https:\/\/ww3.sinaimg.cn\/orj480\/006mZCAVjw8f3gx7d87pgj30e80e8gm0.jpg",
                        "like": false,
                        "like_me": false,
                        "badge": {
                            "bind_taobao": 1,
                            "unread_pool": 1,
                            "unread_pool_ext": 1,
                            "dzwbqlx_2016": 1,
                            "follow_whitelist_video": 1,
                            "user_name_certificate": 1,
                            "wenda_v2": 1
                        }
                    },
                    "picStatus": "0:1,1:1,2:1,3:1",
                    "reposts_count": Mock.Random.natural(10, 1000), //转发数
                    "comments_count": Mock.Random.natural(10, 5000), //评论数
                    "attitudes_count": Mock.Random.natural(10, 10000), //点赞数
                    "pending_approval_count": 0,
                    "isLongText": true,
                    "hide_flag": 0,
                    "visible": {
                        "type": 0,
                        "list_id": 0
                    },
                    "mblogtype": 0,
                    "rid": "0_0_0_3071836974618254319_0_0",
                    "more_info_type": 0,
                    "content_auth": 0,
                    "weibo_position": 1,
                    "buttons": [{
                        "type": "follow",
                        "name": "关注",
                        "pic": "http:\/\/u1.sinaimg.cn\/upload\/2013\/07\/02\/timeline_card_small_button_icon_add.png",
                        "params": {
                            "uid": 5836562753
                        },
                        "actionlog": {
                            "act_code": "91",
                            "act_type": "1",
                            "uicode": "",
                            "oid": 5836562753,
                            "fid": "102803_ctg1_1988_-_ctg1_1988",
                            "cardid": "102803_ctg1_1988_-_ctg1_1988_-_mbloglist_4267394501772245",
                            "ext": "uid:5836562753|mid:4267394501772245|act:follow|time:1533220374|source:1988"
                        }
                    }],
                    "from_cateid": "1988",
                    "recommend_source": "",
                    "mblog_buttons": [{
                        "type": "mblog_buttons_forward",
                        "name": "转发",
                        "pic": "",
                        "actionlog": {
                            "act_code": "1202",
                            "act_type": "1",
                            "fid": "102803_ctg1_1988_-_ctg1_1988",
                            "lfid": "",
                            "oid": "4267394501772245",
                            "uicode": "",
                            "ext": "source:1988"
                        }
                    }, {
                        "type": "mblog_buttons_comment",
                        "name": "评论",
                        "pic": "",
                        "actionlog": {
                            "act_code": "130",
                            "act_type": "1",
                            "fid": "102803_ctg1_1988_-_ctg1_1988",
                            "lfid": "",
                            "oid": "4267394501772245",
                            "uicode": "",
                            "ext": "source:1988"
                        }
                    }, {
                        "type": "mblog_buttons_like",
                        "name": "赞",
                        "pic": "",
                        "actionlog": {
                            "act_code": "1207",
                            "act_type": "1",
                            "fid": "102803_ctg1_1988_-_ctg1_1988",
                            "lfid": "",
                            "oid": "4267394501772245",
                            "uicode": "",
                            "ext": "source:1988"
                        }
                    }],
                    "bid": "GsheO7r2B",
                    "pics": [{
                        "pid": "006mZCAVly1ftrke1c0ypj30qo0q848h",
                        "url": "https:\/\/wx3.sinaimg.cn\/orj360\/006mZCAVly1ftrke1c0ypj30qo0q848h.jpg",
                        "size": "orj360",
                        "geo": {
                            "width": 274,
                            "height": 270,
                            "croped": false
                        },
                        "large": {
                            "size": "large",
                            "url": "https:\/\/wx3.sinaimg.cn\/large\/006mZCAVly1ftrke1c0ypj30qo0q848h.jpg",
                            "geo": {
                                "width": "960",
                                "height": "944",
                                "croped": false
                            }
                        }
                    }, {
                        "pid": "006mZCAVly1ftrkem0e2aj30qo0qodqc",
                        "url": "https:\/\/wx2.sinaimg.cn\/orj360\/006mZCAVly1ftrkem0e2aj30qo0qodqc.jpg",
                        "size": "orj360",
                        "geo": {
                            "width": 360,
                            "height": 360,
                            "croped": false
                        },
                        "large": {
                            "size": "large",
                            "url": "https:\/\/wx2.sinaimg.cn\/large\/006mZCAVly1ftrkem0e2aj30qo0qodqc.jpg",
                            "geo": {
                                "width": "960",
                                "height": "960",
                                "croped": false
                            }
                        }
                    }, {
                        "pid": "006mZCAVly1ftrkll2rgzj30qo0qo7jf",
                        "url": "https:\/\/wx1.sinaimg.cn\/orj360\/006mZCAVly1ftrkll2rgzj30qo0qo7jf.jpg",
                        "size": "orj360",
                        "geo": {
                            "width": 360,
                            "height": 360,
                            "croped": false
                        },
                        "large": {
                            "size": "large",
                            "url": "https:\/\/wx1.sinaimg.cn\/large\/006mZCAVly1ftrkll2rgzj30qo0qo7jf.jpg",
                            "geo": {
                                "width": "960",
                                "height": "960",
                                "croped": false
                            }
                        }
                    }, {
                        "pid": "006mZCAVly1ftrkllz4e1j30qo0qegwi",
                        "url": "https:\/\/wx2.sinaimg.cn\/orj360\/006mZCAVly1ftrkllz4e1j30qo0qegwi.jpg",
                        "size": "orj360",
                        "geo": {
                            "width": 272,
                            "height": 270,
                            "croped": false
                        },
                        "large": {
                            "size": "large",
                            "url": "https:\/\/wx2.sinaimg.cn\/large\/006mZCAVly1ftrkllz4e1j30qo0qegwi.jpg",
                            "geo": {
                                "width": "960",
                                "height": "950",
                                "croped": false
                            }
                        }
                    }]
                }
            }]
        })
    }
})
