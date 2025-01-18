/**
 * 获取AI运势回答
 * @param {string} name - 星座名称
 */
const getFortune = function (name) {
    console.log('API收到的星座名称:', name); // 调试日志

    if (!name) {
        console.error('星座名称为空');
        return Promise.reject(new Error('星座名称不能为空'));
    }

    const today = new Date();
    const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    // 构造请求数据
    const requestData = {
        messages: [{
            role: "user",
            content: `你是一位专业的占星师。请为${name}生成${dateStr}的运势预测，包含以下内容：
1. 今日运势概述
2. 爱情运势
3. 事业运势
4. 财运
5. 推荐食物（3个）
请分点输出，确保内容积极向上。`
        }]
    };

    console.log('发送的请求数据:', requestData); // 调试日志

    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://start-cages-gee-upsruefzqn.cn-hangzhou.fcapp.run/invoke',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: requestData,
            success(res) {
                console.log('API响应:', res); // 调试日志
                if (res.statusCode === 200 && res.data?.output?.choices?.[0]?.message?.content) {
                    const fortune = parseAIResponse(res.data.output.choices[0].message.content);
                    resolve(fortune);
                } else {
                    reject(new Error('API响应格式错误'));
                }
            },
            fail(err) {
                console.error('请求失败:', err);
                reject(err);
            }
        });
    });
};

/**
 * 解析AI回答，将不同类型的运势分开
 * @param {string} aiResponse - AI的回答文本
 */
function parseAIResponse(aiResponse) {
    // 初始化运势对象
    const fortune = {
        overall: '',
        love: '',
        career: '',
        wealth: '',
        foods: []
    };

    // 按行分割AI回答
    const lines = aiResponse.split('\n');
    let currentType = '';

    lines.forEach(line => {
        if (line.includes('运势概述')) {
            currentType = 'overall';
        } else if (line.includes('爱情运势')) {
            currentType = 'love';
        } else if (line.includes('事业运势')) {
            currentType = 'career';
        } else if (line.includes('财运')) {
            currentType = 'wealth';
        } else if (line.includes('推荐食物')) {
            currentType = 'foods';
        } else if (line.trim() && currentType) {
            // 根据不同类型存储内容
            if (currentType === 'foods') {
                // 提取食物名称
                const foods = line.match(/[^、，,]+/g);
                if (foods) {
                    fortune.foods = fortune.foods.concat(foods);
                }
            } else {
                fortune[currentType] += line.trim() + '\n';
            }
        }
    });

    return fortune;
}

module.exports = {
    getFortune: getFortune
};


