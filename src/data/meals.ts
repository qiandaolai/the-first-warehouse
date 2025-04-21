import { DietType, Meal, MealType } from '../types';

export const meals: Meal[] = [
  {
    id: '1',
    name: '蔬菜鸡胸沙拉碗',
    image: 'https://images.pexels.com/photos/1546896/pexels-photo-1546896.jpeg',
    calories: 320,
    protein: 35,
    carbs: 15,
    fat: 12,
    ingredients: [
      '120克鸡胸肉',
      '50克混合绿叶蔬菜',
      '30克胡萝卜丝',
      '30克黄瓜',
      '20克红椒',
      '10克橄榄油',
      '5克柠檬汁',
      '少量盐和黑胡椒'
    ],
    instructions: [
      '将鸡胸肉用盐和黑胡椒腌制10分钟',
      '煎炒鸡胸肉至熟透，约6-8分钟',
      '将鸡肉切丝，冷却',
      '将所有蔬菜洗净切好',
      '混合橄榄油和柠檬汁做成简易调味汁',
      '将所有材料放入碗中，淋上调味汁即可'
    ],
    dietType: ['lowCarb', 'glutenFree', 'dairyFree'],
    mealType: 'lunch',
    preparationTime: 15
  },
  {
    id: '2',
    name: '希腊酸奶水果碗',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    calories: 250,
    protein: 15,
    carbs: 30,
    fat: 5,
    ingredients: [
      '150克希腊酸奶（0%脂肪）',
      '50克蓝莓',
      '50克草莓',
      '10克杏仁片',
      '5克蜂蜜'
    ],
    instructions: [
      '将酸奶倒入碗中',
      '洗净并切好水果',
      '将水果摆在酸奶上',
      '撒上杏仁片',
      '淋上少量蜂蜜即可'
    ],
    dietType: ['vegetarian', 'lowCarb'],
    mealType: 'breakfast',
    preparationTime: 5
  },
  {
    id: '3',
    name: '三文鱼牛油果碗',
    image: 'https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg',
    calories: 380,
    protein: 25,
    carbs: 20,
    fat: 18,
    ingredients: [
      '100克烟熏三文鱼',
      '半个牛油果',
      '50克糙米',
      '30克菠菜',
      '10克芝麻',
      '5克酱油',
      '少量盐和黑胡椒'
    ],
    instructions: [
      '煮熟糙米，冷却',
      '将牛油果切片',
      '将所有材料按喜好摆放在碗中',
      '撒上芝麻和少量盐胡椒',
      '淋上酱油即可'
    ],
    dietType: ['glutenFree', 'dairyFree'],
    mealType: 'dinner',
    preparationTime: 20
  },
  {
    id: '4',
    name: '蛋白质能量球',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    calories: 180,
    protein: 10,
    carbs: 15,
    fat: 8,
    ingredients: [
      '60克燕麦',
      '30克蛋白粉',
      '20克杏仁酱',
      '10克蜂蜜',
      '5克可可粉',
      '少量肉桂粉'
    ],
    instructions: [
      '将所有干料混合在一起',
      '加入杏仁酱和蜂蜜搅拌均匀',
      '用手揉成小球状',
      '放入冰箱冷藏1小时即可食用',
      '可保存一周'
    ],
    dietType: ['vegetarian', 'dairyFree'],
    mealType: 'snack',
    preparationTime: 10
  },
  {
    id: '5',
    name: '豆腐蔬菜炒饭',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
    calories: 290,
    protein: 18,
    carbs: 40,
    fat: 6,
    ingredients: [
      '150克豆腐',
      '100克煮熟的糙米',
      '50克西兰花',
      '30克胡萝卜',
      '30克豌豆',
      '10克葱',
      '5克姜',
      '5克酱油',
      '少量盐和胡椒'
    ],
    instructions: [
      '将豆腐切成小方块',
      '将蔬菜切好备用',
      '热锅后加入少量油，炒香葱姜',
      '加入豆腐炒至微黄',
      '加入蔬菜快速翻炒',
      '加入米饭和调味料炒匀即可'
    ],
    dietType: ['vegan', 'vegetarian', 'dairyFree'],
    mealType: 'dinner',
    preparationTime: 15
  },
  {
    id: '6',
    name: '低碳水三明治',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    calories: 260,
    protein: 22,
    carbs: 10,
    fat: 15,
    ingredients: [
      '2片低碳水面包',
      '80克火鸡胸肉',
      '30克牛油果',
      '20克生菜',
      '10克番茄',
      '5克芥末',
      '少量盐和黑胡椒'
    ],
    instructions: [
      '将火鸡胸肉煎熟切片',
      '将面包轻微烤一下',
      '将牛油果捣成泥状',
      '在面包上先涂抹牛油果泥',
      '依次放上生菜、火鸡肉片和番茄',
      '涂上少量芥末，合上面包即可'
    ],
    dietType: ['lowCarb'],
    mealType: 'lunch',
    preparationTime: 10
  }
];