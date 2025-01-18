"""
底部导航组件
"""
class BottomNavigation:
    def __init__(self):
        self.tabs = [
            {
                'id': 'fortune',
                'title': '星座运势',
                'icon': '/assets/icons/fortune.png',
                'is_active': True
            },
            {
                'id': 'matching',
                'title': '星座配对',
                'icon': '/assets/icons/matching.png',
                'is_active': False
            },
            {
                'id': 'profile',
                'title': '个人中心',
                'icon': '/assets/icons/profile.png',
                'is_active': False
            }
        ] 
        