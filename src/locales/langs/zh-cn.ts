const local: App.I18n.Schema = {
  system: {
    title: '蔚蓝档案登录器',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    batchDeleteAll: '清空列表',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    confirmPublish: '确认发布吗？',
    publish: '发布',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    resetUserName: '重置账号',
    push: '推送',
    copy: '复制',
    save: '保存'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    about: '关于',
    manage: '系统管理',
    manage_user: '用户管理',
    'manage_user-detail': '用户详情',
    manage_role: '角色管理',
    manage_menu: '菜单管理',
    'user-center': '个人中心',
    monitor: '监控管理',
    monitor_scheduler: '调度任务',
    monitor_system: '系统监控',
    monitor_cache: '缓存监控',
    monitor_logs: '日志管理',
    monitor_logs_login: '登录日志',
    manage_dict: '字典管理',
    monitor_logs_scheduler: '调度日志',
    monitor_logs_error: '异常日志',
    monitor_logs_operation: '操作日志',
    monitor_logs_file: '文件日志',
    game: '游戏管理',
    game_community: '游戏社区管理',
    game_game: '游戏类型管理',
    game_mode: '游戏模式管理',
    game_server: '游戏服务器管理',
    game_map: '游戏地图管理',
    game_live: '游戏直播管理',
    server: '服务器查询',
    server_csgo: 'Counter-Strike 2',
    live: '直播推荐',
    tool: '工具',
    tool_bind: '按键助手',
    community: '社区导航',
    map: '地图列表',
    server_projectzombie: 'Project Zombie',
    server_7daystodie: '7 Days To Die',
    tool_maporder: '地图订阅',
    reservation: '服务需求',
    reservation_feedback: '意见反馈',
    server_minecraft: 'Minecraft',
    tool_mapdisplay: '地图展示',
    tool_skindisplay: '皮肤展示',
    game_model: '游戏模型管理',
    tool_obs: 'OBS 直播插件',
    obs: 'OBS',
    tool_soft: '登录器软件版',
    tool_qqgroup: '登录器QQ群',
    mapstrategy: '地图攻略',
    mapstrategy_edit: '地图攻略发布',
    mapstrategy_list: '地图攻略列表',
    mapstrategy_detail: '地图攻略详情',
    game_examine: '游戏审核列表'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入账号名',
        avatarPlaceholder: '请上传用户头像',
        userNickNamePlaceholder: '请输入昵称',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！',
        getCodePlaceholder: '获取验证码',
        registerSuccess: '注册成功'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        qq: 'QQ登录'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    about: {
      title: '关于',
      introduction: `登录器前端基于SoybeanAdmin框架,后端由本人自己开发的框架,开发这个项目的目的也是为了作为面试项目,和锻炼自己技术水平,能把一些新技术融入到项目中让大家体验体验.`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'Github 地址',
        previewLink: '预览地址'
      },
      prdDep: '生产依赖',
      devDep: '开发依赖'
    },
    home: {
      greeting: '早安，{userName}, 今天又是充满活力的一天!',
      webSiteDesc: '欢迎光临蔚蓝档案登录器！🌈',
      pieChart: '社区在线饼图',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: '夏天重构了蔚蓝档案登录器!',
        desc2: '优化自动挤服,挤服框关闭后将继续尝试挤服',
        desc3: '新增地图订阅功能',
        desc4: '新增意见反馈',
        desc5: '新增个人中心,可前往重置账号,设置默认社区偏好,模式偏好等',
        desc6: '新增3D地图展示,3D皮肤展示,优化社区偏好设置(可添加多社区,多模式)',
        desc7: '新增用户头像修改,可前往个人中心进行修改,优化地图订阅(会根据你的社区偏好,模式偏好进行通知)',
        desc8: '地图订阅新增暧服推送(可推送登录器所有在线用户),优化绑键助手,永久保存配置,保存后可导出cfg文件',
        desc9: '新增OBS 直播插件,可前往工具-OBS 直播插件进行配置',
        desc10: ''
      },
      onlineUser: '在线用户',
      sponsor: {
        title: '赞赏码',
        name: '名称',
        amount: '赞赏金额',
        time: '赞赏时间',
        desc: '赞助的费用将用于(网站维护,机器人维护)和请我吃KFC,O(∩_∩)O,感谢各位大佬的赞助。',
        sponsorRecord: '赞赏记录'
      }
    },
    manage: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      role: {
        title: '角色列表',
        roleName: '角色名称',
        roleCode: '角色编码',
        roleStatus: '角色状态',
        roleDesc: '角色描述',
        menuAuth: '菜单权限',
        buttonAuth: '按钮权限',
        form: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          roleStatus: '请选择角色状态',
          roleDesc: '请输入角色描述'
        },
        addRole: '新增角色',
        editRole: '编辑角色'
      },
      user: {
        title: '用户列表',
        userName: '用户名',
        userGender: '性别',
        nickName: '昵称',
        userPhone: '手机号',
        userEmail: '邮箱',
        userStatus: '用户状态',
        userRole: '用户角色',
        form: {
          userName: '请输入用户名',
          userGender: '请选择性别',
          nickName: '请输入昵称',
          userPhone: '请输入手机号',
          userEmail: '请输入邮箱',
          userStatus: '请选择用户状态',
          userRole: '请选择用户角色'
        },
        addUser: '新增用户',
        editUser: '编辑用户',
        gender: {
          male: '男',
          female: '女'
        }
      },
      menu: {
        home: '首页',
        title: '菜单列表',
        id: 'ID',
        parentId: '父级菜单ID',
        menuType: '菜单类型',
        menuName: '菜单名称',
        routeName: '路由名称',
        routePath: '路由路径',
        pathParam: '路径参数',
        layout: '布局',
        page: '页面组件',
        i18nKey: '国际化key',
        icon: '图标',
        localIcon: '本地图标',
        iconTypeTitle: '图标类型',
        order: '排序',
        constant: '常量路由',
        keepAlive: '缓存路由',
        href: '外链',
        hideInMenu: '隐藏菜单',
        activeMenu: '高亮的菜单',
        multiTab: '支持多页签',
        fixedIndexInTab: '固定在页签中的序号',
        query: '路由参数',
        button: '按钮',
        buttonCode: '按钮编码',
        buttonDesc: '按钮描述',
        menuStatus: '菜单状态',
        form: {
          home: '请选择首页',
          menuType: '请选择菜单类型',
          menuName: '请输入菜单名称',
          routeName: '请输入路由名称',
          routePath: '请输入路由路径',
          pathParam: '请输入路径参数',
          page: '请选择页面组件',
          layout: '请选择布局组件',
          i18nKey: '请输入国际化key',
          icon: '请输入图标',
          localIcon: '请选择本地图标',
          order: '请输入排序',
          keepAlive: '请选择是否缓存路由',
          href: '请输入外链',
          hideInMenu: '请选择是否隐藏菜单',
          activeMenu: '请选择高亮的菜单的路由名称',
          multiTab: '请选择是否支持多标签',
          fixedInTab: '请选择是否固定在页签中',
          fixedIndexInTab: '请输入固定在页签中的序号',
          queryKey: '请输入路由参数Key',
          queryValue: '请输入路由参数Value',
          button: '请选择是否按钮',
          buttonCode: '请输入按钮编码',
          buttonDesc: '请输入按钮描述',
          menuStatus: '请选择菜单状态'
        },
        addMenu: '新增菜单',
        editMenu: '编辑菜单',
        addChildMenu: '新增子菜单',
        type: {
          directory: '目录',
          menu: '菜单'
        },
        iconType: {
          iconify: 'iconify图标',
          local: '本地图标'
        }
      },
      dict: {
        title: '字典列表',
        name: '字典名称',
        code: '字典编码',
        type: '字典类型',
        description: '字典描述',
        sort: '排序',
        status: '字典状态',
        form: {
          name: '请输入字典名称',
          code: '请输入字典编码',
          type: '请选择字典类型',
          description: '请输入字典描述',
          sort: '请输入排序',
          status: '请选择字典状态'
        },
        addDict: '新增字典',
        editDict: '编辑字典',
        dictType: {
          system: '系统字典',
          business: '业务字典'
        },
        loadCacheSuccess: '缓存成功',
        selectTreeIsEmptyTip: '请选择字典查看子项目',
        systemFieldsCannotBeDeleted: '系统字段禁止操作删除'
      },
      dictItem: {
        title: '字典项列表',
        dictCode: '字典编码',
        value: '字典值',
        zhCN: '中文',
        enUS: '英文',
        color: '#颜色',
        sort: '排序',
        type: '类型',
        status: '状态',
        description: '描述',
        form: {
          value: '请输入字典值',
          zhCN: '请输入字典项中文',
          enUS: '请输入字典项英文',
          color: '请选择颜色',
          type: '请选择类型',
          sort: '请输入排序',
          status: '请选择字典项状态',
          description: '请输入字典描述'
        },
        addDictItem: '新增字典项',
        editDictItem: '编辑字典项'
      }
    },
    monitor: {
      percentage: '{value} %',
      scheduler: {
        title: '任务列表',
        jobName: '任务名称',
        jobGroup: '任务组别',
        triggerName: '触发器名称',
        triggerGroup: '触发器组别',
        jobData: '任务参数',
        triggerData: '触发器参数',
        addScheduler: '添加调度任务',
        editScheduler: '编辑调度任务',
        corn: '调度表达式',
        jobClassName: '调度任务全类名',
        status: '状态',
        form: {
          jobName: '请输入任务名称',
          jobGroup: '请输入任务组别',
          triggerName: '请输入触发器名称',
          triggerGroup: '请输入触发器组别',
          jobData: '请输入任务参数',
          triggerData: '请输入触发器参数',
          corn: '请输入调度表达式',
          jobClassName: '请输入调度任务全类名',
          status: '状态'
        }
      },
      system: {
        status: '系统状态',
        cpuUserUsage: 'CPU 用户使用率',
        cpuSystemUsage: 'CPU 系统使用率',
        systemMemoryUsage: '系统内存使用率',
        jvmMemoryUsage: 'JVM 内存使用率',
        operatingSystem: {
          title: '系统信息',
          name: '操作系统',
          manufacturer: '系统制造商',
          arch: '系统架构',
          systemBootTime: '系统启动时间',
          systemUptime: '系统运行时间'
        },
        centralProcessor: {
          title: '中央处理器',
          name: 'CPU 名称',
          physicalProcessorCount: '物理核心数',
          logicalProcessorCount: '逻辑核心数（包含超线程）',
          processorIdentifier: '处理器标识符',
          vendorFreq: 'CPU 频率',
          userPercent: '用户使用率',
          systemPercent: '系统使用率',
          idlePercent: '空闲率'
        },
        globalMemory: {
          title: '系统内存',
          total: '总内存',
          used: '已用内存',
          available: '可用内存',
          swapTotal: '交换区总内存',
          swapUsed: '已用交换区',
          swapFree: '剩余交换区',
          memoryUsedRate: '内存使用率',
          swapUsedRate: '交换区使用率'
        },
        jvm: {
          title: 'JVM 内存',
          vmName: '名称',
          uptime: '运行时间',
          vmVersion: '版本',
          vmVendor: '供应商',
          startTime: '启动时间',
          inputArguments: '输入参数',
          heapMemoryUsed: '堆内存已用',
          heapMemoryMax: '堆内存最大',
          memoryUsageRate: '使用率',
          nonHeapMemoryUsed: '非堆内存已用'
        },
        fileStore: {
          title: '文件存储',
          name: '名称',
          type: '类型',
          mount: '挂载点',
          totalSpace: '总空间',
          usableSpace: '可用空间',
          usedSpace: '已用空间',
          usedPercentage: '已用百分比'
        },
        process: {
          title: '系统前 6 进程',
          processID: '进程ID',
          name: '名称',
          cpuLoad: 'CPU 负载'
        }
      },
      cache: {
        redis: {
          title: 'Redis 缓存信息',
          version: '版本',
          uptime: '运行时间',
          connectedClients: '连接客户端数',
          usedMemory: '已用内存',
          maxMemory: '最大内存',
          memoryUsageRate: '内存使用率',
          memFragmentationRatio: '内存碎片率',
          totalCommandsProcessed: '命令处理总数',
          echartsTitle: '命令统计',
          echartsSubTitle: '图示每一个命令的执行占比'
        }
      },
      logs: {
        login: {
          userName: '用户名',
          userRealName: '真实姓名',
          ip: '登录 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          status: '登录状态',
          message: '登录信息',
          createTime: '登录时间',
          createUser: '登录用户',
          form: {
            userName: '请填写用户名',
            userRealName: '请填写真实姓名'
          },
          loginStatus: {
            fail: '登录失败',
            success: '登录成功'
          }
        },
        operation: {
          requestId: '请求 ID',
          ip: '操作 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          requestUri: '请求 URI',
          requestMethod: '请求方式',
          contentType: '请求类型',
          methodName: '操作方法',
          operation: '操作方法说明',
          methodParams: '操作参数',
          useTime: '耗时(ms)',
          createUser: '操作用户',
          createTime: '操作时间',
          form: {
            createUser: '请选择操作用户'
          }
        },
        error: {
          requestId: '请求 ID',
          ip: '操作 IP',
          ipAddr: 'IP 所属地',
          userAgent: 'User-Agent',
          requestUri: '请求 URI',
          requestMethod: '请求方式',
          contentType: '请求类型',
          methodName: '操作方法',
          operation: '操作方法说明',
          methodParams: '操作参数',
          useTime: '耗时(ms)',
          createUser: '操作用户',
          createTime: '异常时间',
          exceptionMessage: '异常信息',
          exceptionClass: '异常类名',
          line: '异常行号',
          stackTrace: '异常堆栈',
          form: {
            createUser: '请填写操作用户'
          }
        },
        scheduler: {
          jobName: '任务名称',
          jobGroup: '任务组名',
          useTime: '耗时(ms)',
          status: '执行状态',
          createTime: '执行时间',
          exceptionMessage: '异常信息',
          exceptionClass: '异常类名',
          line: '异常行号',
          stackTrace: '异常堆栈',
          executeStatus: {
            success: '执行成功',
            fail: '执行失败'
          },
          form: {
            jobName: '请选择任务名称'
          }
        },
        file: {
          userId: '用户ID',
          userName: '用户名称',
          fileUrl: '文件路径',
          fileSize: '文件大小',
          status: '操作状态',
          form: {
            userId: '请输入用户ID',
            userName: '请输入用户名称',
            fileUrl: '请输入文件路径',
            fileSize: '请输入文件大小',
            status: '请选择操作状态'
          }
        }
      }
    },
    tools: {
      common: {
        renderType: {
          input: '输入框',
          select: '下拉框',
          radio: '单选框'
        },
        searchType: {
          equal: '等于',
          noEqual: '不等于',
          like: '模糊',
          leftLike: '左模糊',
          rightLike: '右模糊',
          greaterThan: '大于',
          greaterThanOrEqual: '大于等于',
          lessThan: '小于',
          lessThanOrEqual: '小于等于',
          in: '包含',
          notIn: '不包含',
          between: '在区间内',
          notBetween: '不在区间内'
        }
      }
    },
    game: {
      community: {
        communityName: '社区名称',
        logo: '社区Logo',
        website: '社区网站',
        addCommunity: '添加社区',
        editCommunity: '编辑社区',
        bind: '按键命令列表',
        form: {
          communityName: '请输入社区名称',
          logo: '请上传社区Logo',
          website: '请输入社区网站',
          bind: '请输入按键命令'
        }
      },
      game: {
        gameName: '游戏名称',
        addGame: '添加游戏名称',
        editGame: '编辑游戏名称',
        form: {
          gameName: '请输入游戏名称'
        }
      },
      mode: {
        modeName: '模式名称',
        addMode: '添加模式名称',
        editMode: '编辑模式名称',
        form: {
          modeName: '请输入模式名称'
        }
      },
      server: {
        serverName: '服务器名称',
        communityId: '社区名称',
        modeId: '模式名称',
        gameId: '游戏名称',
        ip: 'Ip',
        port: '端口',
        version: '版本',
        addServer: '添加游戏服务器',
        editServer: '编辑游戏服务器',
        players: '玩家数',
        addr: '服务器地址',
        form: {
          serverName: '请输入服务器名称',
          communityId: '请选择社区名称',
          modeId: '请选择模式名称',
          gameId: '请选择游戏名称',
          ip: '请输入游戏服务器IP',
          port: '请输入游戏服务器端口'
        }
      },
      map: {
        mapName: '地图名称',
        mapLabel: '地图译名',
        mapUrl: '地图图片',
        mapModeUrl: '地图模型',
        modeId: '模式名称',
        type: '地图类型',
        tag: '地图标签',
        artifact: '神器',
        addMap: '添加地图',
        editMap: '编辑地图',
        mapCd: '地图CD',
        mapAchievement: '地图称号',
        form: {
          mapName: '请输入地图名称',
          mapLabel: '请输入地图标签',
          mapUrl: '请上传地图图片',
          mapModeUrl: '请上传地图模型',
          modeId: '请选择模式名称',
          type: '请选择地图类型',
          tag: '请选择地图标签',
          artifact: '请输入神器名称',
          desc: '请输入神器描述'
        }
      },
      live: {
        uid: 'uid',
        avatar: '头像',
        bgUrl: '背景图',
        addLive: '添加直播',
        editLive: '编辑直播',
        notLive: '未开播',
        enterLive: '进入直播间',
        joinLive: '主播入驻',
        form: {
          uid: '请输入uid',
          avatar: '请上传头像',
          bgUrl: '请上传背景图'
        }
      },
      model: {
        modelName: '模型名称',
        modelType: '模型类型',
        modelUrl: '模型图片',
        modelModeUrl: '模型',
        modelModeMaterial: '模型材质',
        addModel: '添加模型',
        editModel: '编辑模型',
        form: {
          modelName: '请输入模型名称',
          modelType: '请选择模型类型',
          modelUrl: '请上传模型图片',
          modelModeUrl: '请上传模型'
        }
      },
      mapStrategy: {
        title: '标题',
        mapId: '地图',
        mapLabel: '地图名称',
        videoUrl: '视频地址',
        status: '审核状态',
        createTime: '发布时间',
        userName: '发布人',
        form: {
          title: '请输入标题',
          mapId: '请选择地图',
          mapLabel: '请输入地图名称',
          videoUrl: '请上传视频链接',
          status: '请选择审核状态'
        }
      }
    },
    server: {
      csgo2: {
        title: 'Counter-Strike 2'
      }
    },
    tool: {
      bind: {
        key: '请选择按键',
        value: '请选择指令'
      },
      mapOrder: {
        add: '新增订阅',
        test: '测试通知',
        mapName: '地图名称',
        mapPush: '暧服推送',
        form: {
          mapName: '请输入地图名称'
        }
      },
      mapDisplay: {
        mapName: '请选择地图名称'
      },
      obs: {
        fontSize: '字体大小',
        fontColor: '字体颜色',
        fontShadow: '字体阴影',
        obsLink: 'OBS显示链接',
        fontAlign: '文字对齐',
        showMap: '是否显示地图图片',
        customText: '自定义文字',
        fontFamily: '字体',
        fontShadowWidth: '阴影宽度'
      }
    },
    feedback: {
      userName: '用户名',
      content: '反馈内容',
      image: '反馈图片',
      type: '反馈类型',
      status: '反馈状态',
      feedback: '回复内容',
      addFeedback: '新增反馈',
      editFeedback: '编辑反馈',
      form: {
        content: '请输入反馈内容',
        image: '请输入地图链接',
        type: '请选择反馈类型',
        status: '请选择反馈状态',
        feedback: '请输入回复内容'
      }
    },
    userCenter: {
      userInfo: {
        edit: '编辑用户信息',
        userName: '用户名',
        userAvatar: '头像',
        password: '密码',
        nickName: '用户昵称',
        phone: '手机号',
        email: '邮箱',
        gender: '性别',
        communityPreference: '社区偏好',
        modePreference: '模式偏好',
        personalInfo: '个人信息',
        changePassword: '修改密码',
        gameConfig: '游戏配置',
        basicInfo: '基本信息',
        oldPassword: '旧密码',
        newPassword: '新密码',
        confirmPassword: '确认密码',
        restartUserName: '重置用户信息',
        restartUserNameConfirm: '你只有一次机会,重置后用户名作为你的登录账号,请确认是否继续',
        form: {
          userName: '请输入用户名',
          userAvatar: '请上传头像',
          password: '请输入密码',
          communityPreferencePlaceholder: '请选择社区偏好',
          modePreferencePlaceholder: '请选择模式偏好',
          oldPasswordPlaceholder: '请输入旧密码',
          newPasswordPlaceholder: '请输入新密码',
          confirmPasswordPlaceholder: '请输入确认密码'
        }
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    avatar: {
      required: '请上传头像',
      invalid: '用户头像格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    },
    nickName: {
      required: '请输入昵称',
      invalid: '昵称格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
